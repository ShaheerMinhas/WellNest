import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../config/db';

const SECRET_KEY = 'your_secret_key';

export const loginAdmin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  console.log("Admin Trying to sign In");
  try {
    const query = 'SELECT * FROM adminusers WHERE email = ?';
    const [rows]: any = await pool.execute(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = rows[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!(password==admin.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email, companyId: admin.companyId }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, companyId: admin.companyId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
};
