import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/db";

const SECRET_KEY = "your-secret-key"; // Replace with your actual secret key

export const changeUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    const userId = decoded.id;

    const { newUsername } = req.body;

    // Validate input
    if (typeof newUsername !== 'string' || newUsername.trim() === "") {
      res.status(400).json({ error: 'Invalid input: newUsername must be a non-empty string' });
      return;
    }

    // Update the username in the database
    const query = `
      UPDATE users
      SET name = ?
      WHERE id = ?
    `;
    const [result]: any = await pool.execute(query, [newUsername.trim(), userId]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found or no changes made' });
      return;
    }

    res.status(200).json({ message: 'Username updated successfully' });
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: 'Invalid or expired token' });
    } else {
      res.status(500).json({ error: 'Error updating username' });
    }
  }
};
