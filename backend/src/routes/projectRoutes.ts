import { Router } from "express";
import { body,param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TasksController } from "../controllers/TasksController";
import { validateProject } from "../middleware/project";

const router = Router()

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

router.get('/',ProjectController.getAllProjects)

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
router.param('projectId', validateProject)

router.post('/:projectId/task',
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripcion es obligatorio'),
  handleInputErrors,
  TasksController.createTask
)

router.get('/:projectId/tasks',
  TasksController.getAllTasks
)

router.get('/:projectId/task/:id',
  param('id').isMongoId().withMessage('Id no valido'),
  handleInputErrors,
  TasksController.getTaskId
)

router.put('/:projectId/task/:id',
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripcion es obligatorio'),
  handleInputErrors,
  TasksController.updateTask
)

router.delete('/:projectId/task/:id',
  param('id').isMongoId().withMessage('Id no valido'),
  handleInputErrors,
  TasksController.deleteTask
)

//actualizar status
router.post('/:projectId/task/:taskId/status',
  param('taskId')
    .isMongoId().withMessage('El nombre de la tarea es obligatorio'),
  body('status')
    .notEmpty().withMessage('La estado es obligatorio'),
  handleInputErrors,
  TasksController.updateStatus
)

export default router