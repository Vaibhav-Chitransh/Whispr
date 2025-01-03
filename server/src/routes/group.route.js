import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { createGroup } from '../controllers/group.controller.js';

const router = express.Router();

router.post('/', protectRoute, createGroup);

export default router;