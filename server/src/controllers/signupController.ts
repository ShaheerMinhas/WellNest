import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import pool from '../config/db';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Register a new user
export const registerUser = async (req: Request, res: Response) : Promise<any> => {
    const { email, password, organization } = req.body;
    if (!email || !password || !organization) {
        console.log(email,password,organization)
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("HERE");
        const query = 'INSERT INTO users (email, password, organization_id) VALUES (?, ?, ?)';
        await pool.execute(query, [email, hashedPassword, organization]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
    }
};                                                                                                                    
// Login an existing user
export const loginUser = async (req: Request, res: Response) : Promise<any> => {
    const { email, password } = req.body;

    try { 
        
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows]: any = await pool.execute(query, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in' });
    }
};
