import express from 'express';
import { getOngoingAssessments, createAssessment } from '../../controllers/admin/adminassessmentController';

const router = express.Router();

router.get('/assessments', getOngoingAssessments); // Fetch ongoing assessments
router.post('/assessments', createAssessment);    // Create a new assessment

export default router;
