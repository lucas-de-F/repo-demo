import * as Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string()
        .email(),

    password: Joi.string()
        .min(6)
        .pattern(/[A-Z]+/)
        .pattern(/[a-z]+/)
        .pattern(/[0-9]+/)
        .pattern(/[ -\/:-@\[-\`{-~]/)

})
