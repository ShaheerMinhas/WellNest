import db from '../../config/db';
import { Request, Response } from 'express';

// Fetch ongoing assessments
export const getOngoingAssessments = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Fetching ongoing assessments");
    const [rows] = await db.query('SELECT * FROM assessments WHERE start_date IS NOT NULL AND due_date IS NOT NULL');
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch assessments.' });
  }
};

// Create a new assessment
export const createAssessment = async (req: Request, res: Response): Promise<any> => {
  const { name, organization_id, start_date, due_date } = req.body;

  if (!name || !organization_id) {
    return res.status(400).json({ success: false, message: 'Name and organization_id are required.' });
  }

  try {
    const [result]: any = await db.execute(
      'INSERT INTO assessments (title, organization_id, start_date, due_date) VALUES (?, ?, ?, ?)',
      [name, organization_id, start_date || null, due_date || null]
    );

    res.status(201).json({
      success: true,
      message: 'Assessment created successfully.',
      data: { id: result.insertId, name, organization_id, start_date, due_date },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create assessment.' });
  }
};
export const getMoods = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT mood FROM moods");

    res.status(200).json({ moods: rows });
  } catch (error) {
    console.error("Error fetching moods:", error);
    res.status(500).json({ message: "Failed to fetch moods" });
  }
};


export const getAssessmentResultsCount = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT COUNT(*) AS count FROM assessment_results");

    res.status(200).json({ count: (rows as any)[0].count });
  } catch (error) {
    console.error("Error fetching assessment results count:", error);
    res.status(500).json({ message: "Failed to fetch assessment results count" });
  }
};

export const getPositiveMoodsCount = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS positiveCount FROM assessment_results WHERE health_metric > 70"
    );
    res.json({ positiveCount: rows[0].positiveCount });
  } catch (error) {
    console.error("Error fetching positive moods:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNegativeMoodsCount = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS negativeCount FROM assessment_results WHERE health_metric <= 70"
    );
    res.json({ negativeCount: rows[0].negativeCount });
  } catch (error) {
    console.error("Error fetching negative moods:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getFeedbacks = async (req: Request, res: Response): Promise<any> => {
  try {
    const { companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ error: "Company ID is required" });
    }
    console.log("Fetchin Feedbacks for Company",companyId);
    const [rows] = await db.query(
      "SELECT id, organization_id, feedback, rating FROM feedback WHERE organization_id = ?",
      [companyId]
    );
    console.log(rows)
    res.json({ feedbacks: rows });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAverageHealthMetric = async (req: Request, res: Response): Promise<void> => {
  try {
    // Query to calculate the average of the health_metric column
    const [rows]: any = await db.query(
      "SELECT AVG(health_metric) AS averageHealth FROM assessment_results"
    );

    // Extract the calculated average
    const averageHealth = rows[0]?.averageHealth ?? 0; // Default to 0 if no data exists

    res.status(200).json({ averageHealth });
  } catch (error) {
    console.error("Error fetching average health metric:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};