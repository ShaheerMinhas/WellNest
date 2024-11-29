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
