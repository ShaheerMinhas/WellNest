import { Request, Response } from 'express';
import pool from '../../config/db'; // Assuming you have a configured database pool
import jwt from 'jsonwebtoken'; // JWT package to verify and decode the token
const SECRET_KEY = 'your_secret_key';
export const fetchTotalUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Admin Trying to fetch user count");
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Token is required' });
      return;
    }

    // Decode token to get the companyId (Assumes token contains companyId)
    const decodedToken: any = jwt.verify(token, SECRET_KEY || 'secret'); // Secret key for JWT verification
    const companyId = decodedToken.companyId; // Get companyId from the token payload

    if (!companyId) {
      res.status(400).json({ error: 'Company ID is missing in token' });
      return;
    }

    // Query to fetch the total number of users for the specified companyId
    const query = 'SELECT COUNT(*) AS totalUsers FROM users WHERE organization_id = ?';
    const [rows]: any = await pool.execute(query, [companyId]);

    const totalUsers = rows[0].totalUsers;
    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching total users' });
  }
};
