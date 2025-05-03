// controller/admin/adminEmployeesController.js

import { Request, Response } from 'express';
import pool from '../../config/db'; // Assuming you have a configured database pool
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';
export const fetchAllEmployees = async (req: Request, res: Response): Promise<void> => {
  console.log("try1");
  try {
    console.log("Admin trying to fetch all employees");

    const { companyId } = req.body; // Extract companyId from request body

    if (!companyId) {
      res.status(400).json({ error: "Company ID is required in the request body" });
      return;
    }

    // Query to fetch employees for the specified companyId
    const query = "SELECT id, name, email FROM users WHERE organization_id = ?";
    const [rows]: any = await pool.execute(query, [companyId]);

    // Return the employees
    res.status(200).json({ employees: rows });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Error fetching employees" });
  }
};