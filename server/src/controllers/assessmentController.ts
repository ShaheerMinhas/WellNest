import { Request, Response } from 'express';
import pool from '../config/db';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export const saveTestResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    const userId = decoded.id;

    const { testtype, totalscore } = req.body;

    // Validate inputs
    if (typeof testtype !== 'number' || typeof totalscore !== 'number') {
      res.status(400).json({ error: 'Invalid input: testtype and totalscore must be numbers' });
      return;
    }

    // Insert the test result into the database
    const query = `
      INSERT INTO test_results (employee_id, test_id, score)
      VALUES (?, ?, ?)
    `;
    const [result]: any = await pool.execute(query, [userId, testtype, totalscore]);

    res.status(201).json({ message: 'Test result saved successfully', resultId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving test results' });
  }
};
export const checkAssessmentCompletion = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
      }
  
      const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
      const employeeId = decoded.id; // Extract employee ID from the token
  
      const { testtype } = req.body; // Test type from the request body
  
      if (!testtype) {
        res.status(400).json({ error: 'Test type is required' });
        return;
      }
  
      console.log("Finding for", employeeId, "and testtype", testtype);
  
      // Query to check if the assessment is completed
      const query = `
        SELECT is_completed
        FROM test_results
        WHERE employee_id = ? AND test_id = ?
      `;
      
      const [rows]: any = await pool.execute(query, [employeeId, testtype]);
  
      if (rows.length === 0) {
          res.status(200).json({ completed: false, message: 'Assessment not found' });
          console.log("here");
          return;
      }
  
      const isCompleted = 1; // Check if the test is completed
  
      if (isCompleted) {
        res.status(200).json({ completed: true, message: 'Assessment already completed' });
      } else {
        res.status(200).json({ completed: false, message: 'Assessment not completed yet' });
      }
    } catch (error) {
      console.error('Error checking assessment completion:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
export const getTestResults = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    console.log("Fetching Results");
    // Decode the token to get the user ID
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    const userId = decoded.id;

    // Get the test types (e.g., depression, anxiety) from the query params or body
    const { testtypes } = req.query; // Array of test types to filter results (optional)

    // Build the query dynamically based on the provided test types
    let query = `SELECT test_id, score, created_at FROM test_results WHERE employee_id = ?`;
    const queryParams: any[] = [userId];

    if (testtypes) {
      // If test types are provided, filter by them
      const testTypesArray = Array.isArray(testtypes) ? testtypes : [testtypes]; // Handle multiple or single test types
      query += ` AND test_id IN (?)`;
      queryParams.push(testTypesArray.map((testType: string) => parseInt(testType)));
    }

    // Execute the query to fetch test results
    const [results]: any = await pool.execute(query, queryParams);

    if (results.length === 0) {
      res.status(404).json({ message: 'No test results found for the user' });
      return;
    }

    // Send the results back to the client
    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching test results' });
  }
};

export const resetUserAssessments = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log("Trying to Reset ");
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    console.log("Trying to Reset ");

    // Decode token to get user ID
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    const userId = decoded.id;

    // Reset the assessments by deleting them or setting `is_completed = 0`
    const query = `DELETE FROM test_results WHERE employee_id = ?`; // Use DELETE to fully remove, or use UPDATE to reset
    await pool.execute(query, [userId]);

    res.status(200).json({ message: 'User assessments have been reset successfully' });
  } catch (error) {
    console.error('Error resetting user assessments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const fetchAssessments = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    const organizationId = decoded.organization_id;

    if (!organizationId) {
      res.status(400).json({ error: 'Organization ID not found in token' });
    }

    const query = 'SELECT * FROM assessments WHERE organization_id = ?';
    const [rows]: any = await pool.execute(query, [organizationId]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'No assessments found for this organization' });
    }

    res.status(200).json({ assessments: rows });
  } catch (error) {
    console.error(error);
  }
};

export const setMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Decode token to get employee ID (assuming token contains employee_id)
    const decoded = jwt.verify(token, SECRET_KEY);
    const employeeId = decoded.id;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    // Start a database transaction
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Delete previous mood entry for the employee
      await connection.query("DELETE FROM moods WHERE employee_id = ?", [employeeId]);

      // Insert new mood
      await connection.query("INSERT INTO moods (employee_id, mood) VALUES (?, ?)", [employeeId, mood]);

      // Commit the transaction
      await connection.commit();
      res.status(201).json({ message: "Mood updated successfully" });
    } catch (dbError) {
      await connection.rollback();
      console.error("Database Error:", dbError);
      res.status(500).json({ message: "Database error" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error setting mood:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const fetchFellowEmployees = async (req: Request, res: Response): Promise<void> => {
  console.log("Fetching fellow employees");

  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Token is required" });
      return;
    }

    // Decode token to get organizationId
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      console.error("JWT verification failed:", error);
      res.status(403).json({ error: "Invalid token" });
      return;
    }

    const organizationId = decodedToken.organization_id;
    const userId = decodedToken.id; // Current user's ID

    if (!organizationId) {
      res.status(400).json({ error: "Organization ID is missing in token" });
      return;
    }

    console.log("Finding fellow employees of", userId, organizationId);

    // Query to fetch all employees of the same organization except the current user
    const query = `
      SELECT u.id, u.name, u.email, COALESCE(m.mood, '😐') AS mood
      FROM users u
      LEFT JOIN moods m ON u.id = m.employee_id
      WHERE u.organization_id = ?
      ORDER BY m.timestamp DESC
    `;
    const [rows]: any = await pool.execute(query, [organizationId]);

    if (!rows.length) {
      console.warn("No fellow employees found");
    }

    console.log("Fetched employees:", rows);
    res.status(200).json({ employees: rows });
  } catch (error) {
    console.error("Error fetching fellow employees:", error);
    res.status(500).json({ error: "Error fetching employees" });
  }
};


// Submit the total result
export const submitTotalResult = async (req: Request, res: Response): Promise<void> => {
  const { assessment_id, health_metric } = req.body;

  if (!assessment_id || health_metric === undefined) {
    res.status(400).json({
      success: false,
      message: "Assessment ID and health metric are required.",
    });
  }

  try {
    const [result]: any = await pool.execute(
      "INSERT INTO assessment_results (assessment_id, health_metric) VALUES (?, ?)",
      [assessment_id, health_metric]
    );

    res.status(201).json({
      success: true,
      message: "Result submitted successfully.",
      data: { id: result.insertId, assessment_id, health_metric },
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to submit result.",
    });
  }
};

// Submit feedback
export const submitFeedback = async (req, res) => {
  const { organization_id, feedback, rating } = req.body;

  // Validate rating
  if (!organization_id || !feedback || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid input data" });
  }

  try {
      await pool.execute("INSERT INTO feedback (organization_id, feedback, rating) VALUES (?, ?, ?)", 
          [organization_id, feedback, rating]);
      res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ message: "Failed to submit feedback" });
  }
};
