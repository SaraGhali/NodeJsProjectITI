import joi from "joi"

const loginValidation = joi.object({
    email: joi.string().email().optional().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required"
    }),
    password: joi.string().required().messages({
        "any.required": "Password is required"
    }),
    phone: joi.string().optional().messages({
        "any.required": "Phone is required",
    })
}).or('email', 'phone').messages({
    'object.missing': 'You must provide either an email or a phone number.'
});

export default loginValidation