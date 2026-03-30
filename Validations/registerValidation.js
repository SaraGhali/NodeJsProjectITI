import joi from "joi"

const registerValidation = joi.object({
    name: joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name is required"
    }),
    email: joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required"
    }),
    password: joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is required"
    }),
    phone: joi.string().required().messages({
        "any.required": "Phone is required",
        "string.empty": "Phone is required",
        "string.pattern.base": "Phone must be a valid phone number",
        "string.length": "Phone must be 11 digits"
    })
})

export default registerValidation