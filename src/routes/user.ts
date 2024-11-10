import { Router } from 'express';
import { validateUserRequest } from '../middlewares';
import { loginUser, registerUser } from '../controllers';
export const router = Router();


router.post('/register', validateUserRequest, registerUser);
router.post('/login', loginUser);