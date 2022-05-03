import { PrismaClient } from "@prisma/client";
import { CreateZodiacDTO, UpdateZodiacDTO, ZodiacDTO } from "../dto/ZodiacDTO";
const prisma = new PrismaClient()

export default class ZodiacRepository{
    private userId: number

    constructor (userId: number) {
    this.userId = userId        
    }

public readonly findAll = async (): Promise<ZodiacDTO[]> => {
const zodiacs = await prisma.zodiac.findMany({
where: {
    userId: this.userId
}    
})

return zodiacs
}

public readonly findById = async (id:number): Promise<ZodiacDTO | undefined> => {
    const zodiac = await prisma.zodiac.findFirst({
      where: {
       id,
       userId: this.userId
    }
  })

  if (!zodiac) return

  return zodiac
}

public readonly create = async (zodiac: CreateZodiacDTO): Promise<ZodiacDTO> => {
    const newZodiac = await prisma.zodiac.create({
        data: {
            ...zodiac,
            userId: this.userId,
            birth: new Date(zodiac.birth).toISOString()
        }
    })

return newZodiac
}

public readonly update = async (id: number, zodiac: UpdateZodiacDTO): Promise<void> => {
    await prisma.zodiac.updateMany({
        where:{
            id,
            userId: this.userId
        },
        data: {
        ...zodiac,
        birth: zodiac.birth ? new Date(zodiac.birth).toISOString() : undefined
    }
    })
}

public readonly delete = async (id: number) => {
    await prisma.zodiac.deleteMany({
        where:{
            id,
            userId: this.userId
        }
    })
}
}