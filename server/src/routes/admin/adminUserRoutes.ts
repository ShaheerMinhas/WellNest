import express from 'express';
import { fetchTotalUsers } from '../../controllers/admin/adminUsersController';
import { fetchAllEmployees } from '../../controllers/admin/adminempController';

const router = express.Router();

// Route to fetch total users based on companyId
router.post('/totalUsers', fetchTotalUsers);
// Route to fetch all employees based on companyId
router.get('/allEmployees', fetchAllEmployees);

export default router;
