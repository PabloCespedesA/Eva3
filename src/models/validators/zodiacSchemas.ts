import Joi from 'joi'
import { CreateZodiacDTO, UpdateZodiacDTO } from '../dto/ZodiacDTO'

export const createZodiacSchema: Joi.ObjectSchema<CreateZodiacDTO> = Joi.object().keys({
    name: Joi.string().required(),
    zodiac_sign: Joi.string().required(),
    nationality: Joi.string().required(),
    birth: Joi.date().required(),
    technique: Joi.string().required(),
    photo: Joi.string().uri()
})

export const updateZodiacSchema: Joi.ObjectSchema<UpdateZodiacDTO> = Joi.object().keys({
    name: Joi.string(),
    zodiac_sign: Joi.string(),
    nationality: Joi.string(),
    birth: Joi.date(),
    technique: Joi.string(),
    photo: Joi.string().uri()
})

