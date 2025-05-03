import express from 'express';
import { getOngoingAssessments,getAverageHealthMetric, createAssessment, getMoods,getFeedbacks,getAssessmentResultsCount,getPositiveMoodsCount,getNegativeMoodsCount } from '../../controllers/admin/adminassessmentController';


const router = express.Router();

router.get('/assessments', getOngoingAssessments); // Fetch ongoing assessments
router.post('/assessments', createAssessment);    // Create a new assessment
router.get('/moods',getMoods);
router.get("/assessment-results/count", getAssessmentResultsCount);
router.get("/positive",getPositiveMoodsCount);
router.get("/negative",getNegativeMoodsCount);
router.get("/totalhealth",getAverageHealthMetric);
router.post("/feedback-view",getFeedbacks);

export default router;
