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
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is required",
        "string.pattern.base": "Password must be at least 8 characters long and contain uppercase, lowercase, and a number"
    }),
    phone: joi.string().pattern(/^01[0125][0-9]{8}$/).required().messages({
        "any.required": "Phone is required",
        "string.empty": "Phone is required",
        "string.pattern.base": "Phone must be a valid Egyptian phone number (e.g., 01012345678)"
    })
})

export default registerValidation