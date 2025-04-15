import express from 'express';
import { saveTestResults,checkAssessmentCompletion ,getTestResults ,fetchAssessments, resetUserAssessments, setMood, fetchFellowEmployees, submitTotalResult,submitFeedback} from '../controllers/assessmentController';


const router = express.Router();


router.post('/savetest', saveTestResults);
router.post('/checktestcompletion', checkAssessmentCompletion);
router.post('/getScores',getTestResults);
router.post('/setMood',setMood)
router.post('/resettests',resetUserAssessments);
router.get('/activities', fetchAssessments);
router.post('/totalResult',submitTotalResult);
router.post('/send-feedback',submitFeedback);
router.get('/fetchfellows', fetchFellowEmployees);


export default router;