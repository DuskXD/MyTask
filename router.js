import Router from 'express';
import authController from './routerController.js';
import {check} from "express-validator";
import {auth} from "./middleware/middleware.js";

const router = new Router();
const controller = authController;


router.post('/signup', [
    check("user_login", 'User login is required').notEmpty(),
    check("user_password", 'The password length must be from 4 to 16 characters').isLength({min: 4, max: 16}),
    check("user_name", 'The name is required').notEmpty(),
    check("user_surname", 'The surname is required').notEmpty(),
], controller.registration)
router.post('/signin', controller.login)
router.get('/me', controller.GetUserInform)
router.get('/users', auth, controller.GetUser)
router.get('/users/:id', auth, controller.GetUserWithId)
export default router;