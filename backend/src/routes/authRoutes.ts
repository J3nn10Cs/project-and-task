import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

//crear cuenta
router.post('/create-account',
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('password').isLength({min : 8}).withMessage('El password es muy corto'),
  //comprobamos nuestro password con el de confirmacion
  body('password_confirmation').custom((value, {req}) => {
    if(value !== req.body.password){
      throw new Error('El password no es igual')
    }
    //para pasar al siguiente middleware
    return true
  }),
  body('email').isEmail().withMessage('El email no valido'),
  handleInputErrors,
  AuthController.createUser)

//confirmar cuenta
router.post('/confirm-account',
  body('token').notEmpty().withMessage('El token no puede ir vacio'),
  handleInputErrors,
  AuthController.confirmAccount
)

//login
router.post('/login',
  body('password').notEmpty().withMessage('El password es obligatorio'),
  body('email').isEmail().withMessage('El email no valido'),
  handleInputErrors,
  AuthController.login
)

//nuevo token
router.post('/request-new-code',
  body('email').isEmail().withMessage('El email no valido'),
  handleInputErrors,
  AuthController.requestNewCode
)

//recuperar contraseña
router.post('/forgot-password',
  body('email').isEmail().withMessage('El email no valido'),
  handleInputErrors,
  AuthController.forgotPassword
)

//validar token para cambio de contraseña
router.post('/validate-token',
  body('token').notEmpty().withMessage('El token no puede ir vacio'),
  handleInputErrors,
  AuthController.validateToken
)

// cambio de contraseña
router.post('/change-password/:token',
  param('token').isNumeric().withMessage('El token no puede ir vacio'),
  body('password').isLength({min : 8}).withMessage('El password es muy corto'),
  //comprobamos nuestro password con el de confirmacion
  body('password_confirmation').custom((value, {req}) => {
    if(value !== req.body.password){
      throw new Error('El password no es igual')
    }
    //para pasar al siguiente middleware
    return true
  }),
  handleInputErrors,
  AuthController.changePassword
)

export default router