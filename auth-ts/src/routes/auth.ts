import { Router } from 'express';
import {
  login,
  logoutSession,
  clearSessionList,
} from '../controllers/auth.controller';

const router = Router();

router.route('/login').post(login);
router.route('/logout').post(logoutSession);
router.route('/logoutall').post(clearSessionList);

export { router };
