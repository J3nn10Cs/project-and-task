import { Router } from "express";
import { body,param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TasksController } from "../controllers/TasksController";
import { projectExists } from "../middleware/project.middleware";
import { taskBelongsProject, taskExists } from "../middleware/task.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { TeamController } from "../controllers/TeamController";

const router = Router()

//protegemos
router.use(authenticate)

router.post('/',
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('El nombre de la descripcion es obligatorio'),
  handleInputErrors,
  ProjectController.createProject
)

router.get('/',
  ProjectController.getAllProjects)

router.get('/:id',
  param('id').isMongoId().withMessage('Id no valido'),
  handleInputErrors,
  ProjectController.getProjectById)

router.put('/:id', 
  param('id').isMongoId().withMessage('Id no valido'),
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('El nombre de la descripcion es obligatorio'),
  handleInputErrors,
  ProjectController.updateProject)
  
  router.delete('/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    handleInputErrors,
  ProjectController.deleteProject)

// Para las tareas - next resource routing
router.param('projectId', projectExists)

// crear una tarea
router.post('/:projectId/task',
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripcion es obligatorio'),
  handleInputErrors,
  TasksController.createTask
)

//obtener las tareas de un proyecto
router.get('/:projectId/tasks',
  TasksController.getAllTasks
)

// para validar los id de las tareas - middleware
router.param('taskid', taskExists)
router.param('taskid', taskBelongsProject)


router.get('/:projectId/task/:taskid',
  param('taskid').isMongoId().withMessage('Id no valido'),
  handleInputErrors,
  TasksController.getTaskId
)

router.put('/:projectId/task/:taskid',
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripcion es obligatorio'),
  handleInputErrors,
  TasksController.updateTask
)

router.delete('/:projectId/task/:taskid',
  param('taskid').isMongoId().withMessage('Id no valido'),
  handleInputErrors,
  TasksController.deleteTask
)

//actualizar status
router.post('/:projectId/task/:taskid/status',
  param('taskid')
    .isMongoId().withMessage('El nombre de la tarea es obligatorio'),
  body('status')
    .notEmpty().withMessage('La estado es obligatorio'),
  handleInputErrors,
  TasksController.updateStatus
)

//Router para el team
router.post('/:projectId/team/find',
  body('email').isEmail().toLowerCase().withMessage('Email no valido'),
  handleInputErrors,
  TeamController.findMenberByEmail
)

//agregar miembro por id
router.post('/:projectId/team',
  body('id').isMongoId().withMessage('Id no valido'),
  handleInputErrors,
  TeamController.addMemberById
)

//eliminar colaborador por ID
router.delete('/:projectId/team',
  body('id').isMongoId().withMessage('Id no valido'),
  handleInputErrors,
  TeamController.deleteMenberById
)

//obtener todos los colaboradores
router.get('/:projectId/team',TeamController.getAllMenbers)
export default router