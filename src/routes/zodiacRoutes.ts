import { Router } from "express"
import ZodiacController from "../controllers/ZodiacController"

const zodiacRoutes = Router()
const controller = new ZodiacController()

zodiacRoutes.get('/', controller.getAll)
zodiacRoutes.get('/:id', controller.getByid)
zodiacRoutes.post('/', controller.create)
zodiacRoutes.put('/:id', controller.update)
zodiacRoutes.delete('/:id', controller.delete)

export default zodiacRoutes