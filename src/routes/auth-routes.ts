// File: src/routes/auth.routes.ts
import { Router } from 'express';
import { register, login, getProfile, updateCredentials } from '../controllers/auth-controllers';
import { authenticateToken } from '../middleware/auth-middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/update-credentials', authenticateToken, updateCredentials);

export default router;