/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { register, getProfile } from '../controllers/user.controller';
import { authHandler } from '../middlewares/authHandler';

const router = Router();

router.route('/register').post(register);
router.route('/me/profile').get(authHandler, getProfile);

export { router };
