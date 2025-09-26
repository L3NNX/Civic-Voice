import express from 'express';
import {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentController.js';

const router = express.Router();

// GET /api/departments - Get all departments
router.get('/', getDepartments);

// GET /api/departments/:id - Get single department
router.get('/:id', getDepartment);

// POST /api/departments - Create new department
router.post('/create', createDepartment);

// PUT /api/departments/:id - Update department
router.put('/:id', updateDepartment);

// DELETE /api/departments/:id - Delete department
router.delete('/:id', deleteDepartment);

export default router;