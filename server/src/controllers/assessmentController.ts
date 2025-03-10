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
    }

    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    const employeeId = decoded.id;

    const { testtype } = req.body;
    if (!testtype) {
      res.status(400).json({ error: 'Test type is required' });
    }

    console.log("Finding for", employeeId, "and testtype", testtype);

    const query = `
      SELECT is_completed
      FROM test_results
      WHERE employee_id = ? AND test_id = ?
    `;
    
    const [rows]: any = await pool.execute(query, [employeeId, testtype]);

    if (rows.length === 0) {
      res.status(200).json({ completed: false, message: 'Assessment not found' });
    }

    const isCompleted = rows[0].is_completed === 1;

    res.status(200).json({
      completed: isCompleted,
      message: isCompleted ? 'Assessment already completed' : 'Assessment not completed yet'
    });

  } catch (error) {
    console.error('Error checking assessment completion:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
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
    res.status(500).json({ error: 'Error fetching assessments' });
  }
};
