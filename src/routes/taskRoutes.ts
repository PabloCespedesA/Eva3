import { Router } from "express"
import TaskController from "../controllers/TaskController"

const taskRoutes = Router()
const controller = new TaskController()

taskRoutes.get('/', controller.getAll)
taskRoutes.get('/:id', controller.getByid)
taskRoutes.post('/', controller.create)
taskRoutes.put('/:id', controller.update)
taskRoutes.delete('/:id', controller.delete)

export default taskRoutes