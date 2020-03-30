/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import {
  login,
  logoutSession,
  clearSessionList,
  validateAdmin,
} from '../controllers/auth.controller';
import { authHandler } from '../middleware/authHandler';

const router = Router();

router.route('/login').post(login);
router.route('/logout').post(authHandler, logoutSession);
router.route('/logoutall').post(authHandler, clearSessionList);
router.route('/isadmin').get(authHandler, validateAdmin);

export { router };
