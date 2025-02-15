import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

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

router.post('/confirm-account',
  body('token').notEmpty().withMessage('El token no puede ir vacio'),
  handleInputErrors,
  AuthController.confirmAccount
)

export default router