import { Router } from 'express';
import { register, getMe, getAdmin } from '../controllers/user.controller';

const router = Router();

router.route('/register').post(register);
router.route('/getme').get(getMe);
router.route('/getadminprofile').get(getAdmin);
export { router };
