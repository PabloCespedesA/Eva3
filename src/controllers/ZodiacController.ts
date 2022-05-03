import { Request, Response} from "express"
import { UserTokenPayload } from "../models/dto/UserDTO"
import {CreateZodiacDTO, ZodiacDTO, UpdateZodiacDTO} from "../models/dto/ZodiacDTO"
import ZodiacRepository from "../models/repositories/ZodiacRepository"
import { createZodiacSchema, updateZodiacSchema } from "../models/validators/zodiacSchemas"

export default class ZodiacController {
    public readonly getAll = async (req: Request, res: Response) => {
        const user=req.user as UserTokenPayload
        const repository = new ZodiacRepository(user.sub)
        const zodiac: ZodiacDTO[] = await repository.findAll()
      res.json(zodiac)
    }

    public readonly getByid = async (req: Request, res: Response) => {
        const { id } = req.params
        const user=req.user as UserTokenPayload
        const repository = new ZodiacRepository(user.sub)
        const zodiac = await repository.findById(parseInt(id))

        if(!zodiac) {
            res.status(404).json({ message: 'Caballero no encontrado'})
            return
        }

        res.json({zodiac})
    }

    public readonly create = async (req: Request, res: Response) => {
        const zodiac = req.body as CreateZodiacDTO

try{
    await createZodiacSchema.validateAsync(zodiac)
} catch (error){
res.status(400).json({message: error.message})
return
}

const user=req.user as UserTokenPayload
const repository = new ZodiacRepository(user.sub)

try{
   const newZodiac = await repository.create(zodiac)

        res.json({newZodiac}) 
    } catch(error){
      if (error.code === 'P2002'){
          res.status(409).json({ message: 'zodiac knight already exist'})
          return
      }
      console.log(error)
      res.status(500).json({ message: 'Something went wrong'})
      }
    }
    public readonly update = async (req: Request, res: Response) => {
        const { id } = req.params
        const zodiac = req.body as UpdateZodiacDTO
        
        try{
            await updateZodiacSchema.validateAsync(zodiac)
        } catch (error){
        res.status(400).json({message: error.message})
        return
        }
        
        const user=req.user as UserTokenPayload
        const repository = new ZodiacRepository(user.sub)
        await repository.update(parseInt(id), zodiac)
        res.sendStatus(204)
    }

    public readonly delete = async (req: Request, res: Response) => {
        const { id } = req.params

        const user=req.user as UserTokenPayload 
        const repository = new ZodiacRepository(user.sub)
        await repository.delete(parseInt(id)) 
        res.sendStatus(204)
    }
}
