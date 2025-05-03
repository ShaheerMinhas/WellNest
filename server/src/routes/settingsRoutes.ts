import express from 'express';
import { changeUsername } from '../controllers/settingsController';


const router = express.Router();

router.post('/change-username',changeUsername);

export default router;