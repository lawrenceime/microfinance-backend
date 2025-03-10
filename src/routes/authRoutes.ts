import {Router} from 'express';
import {signUp , login , forgotPassword} from '../controllers/authControllers';
import {body} from 'express-validator'; 

const router = Router();

router.post('/signup' , [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
], signUp); 

router.post('/login' ,[
body('email').isEmail()
] , login);  

router.post('/forgot-password' ,[
    body('email').isEmail()
] , forgotPassword); 

export default router;