import express from 'express';
import { loginAdmin } from '../../controllers/admin/adminauthController';

const router = express.Router();

router.post('/auth', loginAdmin);

export default router;
