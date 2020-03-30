/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import {
  login,
  logout,
  companyProfile,
  getAdminProfile,
} from '../controllers/auth.controller';
import { authHandler, authorizeByRole } from '../middlewares/authHandler';
import { roleHandler } from '../middlewares/roleHandler';

const router = Router();

router.route('/login').post(login);
router.route('/logout').post(authHandler, logout);
router
  .route('/company/profile')
  .get(authHandler, authorizeByRole('admin'), companyProfile);

// TODO: FOR testing
router.get('/admin', authHandler, roleHandler, getAdminProfile);
export { router };
