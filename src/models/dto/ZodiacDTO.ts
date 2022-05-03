interface BaseZodiacDTO {
    id?: number
    name: string
    zodiac_sign: string
    nationality: string
    birth: Date
    technique: string
    photo: string | null
}

export interface ZodiacDTO extends BaseZodiacDTO {
 id: number
 userId: number | null
}

export interface CreateZodiacDTO extends BaseZodiacDTO {}

export interface UpdateZodiacDTO extends Partial<BaseZodiacDTO> {}
