import express from 'express';
import { saveTestResults,checkAssessmentCompletion ,getTestResults ,fetchAssessments} from '../controllers/assessmentController';


const router = express.Router();


router.post('/savetest', saveTestResults);
router.post('/checktestcompletion', checkAssessmentCompletion);
router.post('/getScores',getTestResults);


router.get('/activities', fetchAssessments);


export default router;