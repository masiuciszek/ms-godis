import { Router } from 'express';
import { register, getMe, getAdmin } from '../controllers/user.controller';
import { authHandler } from '../middleware/authHandler';
import { roleHandler } from '../middleware/roleHandler';

const router = Router();

router.route('/register').post(register);
router.route('/getme').get(authHandler, getMe);
router.route('/getadminprofile').get(authHandler, roleHandler, getAdmin);
export { router };
