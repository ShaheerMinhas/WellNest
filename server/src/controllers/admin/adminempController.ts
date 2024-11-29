// controller/admin/adminEmployeesController.js

import { Request, Response } from 'express';
import pool from '../../config/db'; // Assuming you have a configured database pool
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export const fetchAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Admin trying to fetch all employees");

    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Token is required' });
      return;
    }

    // Decode token to get the companyId
    const decodedToken: any = jwt.verify(token, SECRET_KEY || 'secret');
    const companyId = decodedToken.companyId;

    if (!companyId) {
      res.status(400).json({ error: 'Company ID is missing in token' });
      return;
    }

    // Query to fetch all employees for the specified companyId
    const query = 'SELECT id, name, email FROM users WHERE organization_id = ?';
    const [rows]: any = await pool.execute(query, [companyId]);

    // Return the employees in the correct structure
    res.status(200).json({ employees: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};
