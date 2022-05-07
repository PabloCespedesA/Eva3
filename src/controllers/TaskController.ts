import { Request, Response} from "express"
import { UserTokenPayload } from "../models/dto/UserDTO"
import {CreateTaskDTO, TaskDTO, UpdateTaskDTO} from "../models/dto/TaskDTO"
import TaskRepository from "../models/repositories/TaskRepository"
import { createTaskSchema, updateTaskSchema } from "../models/validators/taskSchemas"

export default class TaskController {
    public readonly getAll = async (req: Request, res: Response) => {
        const user=req.user as UserTokenPayload
        const repository = new TaskRepository(user.sub)
        const task: TaskDTO[] = await repository.findAll()
      res.json(task)
    }

    public readonly getByid = async (req: Request, res: Response) => {
        const { id } = req.params
        const user=req.user as UserTokenPayload
        const repository = new TaskRepository(user.sub)
        const task = await repository.findById(parseInt(id))

        if(!task) {
            res.status(404).json({ message: 'Task not found '})
            return
        }

        res.json({task})
    }

    public readonly create = async (req: Request, res: Response) => {
        const task = req.body as CreateTaskDTO

try{
    await createTaskSchema.validateAsync(task)
} catch (error){
res.status(400).json({message: error.message})
return
}

const user=req.user as UserTokenPayload
const repository = new TaskRepository(user.sub)

try{
   const newTask = await repository.create(task)

        res.json({newTask}) 
    } catch(error){
      if (error.code === 'P2002'){
          res.status(409).json({ message: 'Task already exist'})
          return
      }
      console.log(error)
      res.status(500).json({ message: 'Something went wrong'})
      }
    }
    public readonly update = async (req: Request, res: Response) => {
        const { id } = req.params
        const task = req.body as UpdateTaskDTO
        
        try{
            await updateTaskSchema.validateAsync(task)
        } catch (error){
        res.status(400).json({message: error.message})
        return
        }
        
        const user=req.user as UserTokenPayload
        const repository = new TaskRepository(user.sub)
        await repository.update(parseInt(id), task)
        res.sendStatus(204)
    }

    public readonly delete = async (req: Request, res: Response) => {
        const { id } = req.params

        const user=req.user as UserTokenPayload 
        const repository = new TaskRepository(user.sub)
        await repository.delete(parseInt(id)) 
        res.sendStatus(204)
    }
}
