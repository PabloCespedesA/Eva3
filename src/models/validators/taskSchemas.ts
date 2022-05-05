import Joi from 'joi'
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/TaskDTO'

export const createTaskSchema: Joi.ObjectSchema<CreateTaskDTO> = Joi.object().keys({
    title: Joi.string().required(),
    content : Joi.string().required(),
    birth: Joi.date().required(),
})

export const updateTaskSchema: Joi.ObjectSchema<UpdateTaskDTO> = Joi.object().keys({
    title: Joi.string(),
    content : Joi.string(),
    birth: Joi.date(),
})

