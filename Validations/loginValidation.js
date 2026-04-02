import joi from "joi"

const loginValidation = joi.object({
    email: joi.string().email().optional().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required"
    }),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/).required().messages({
        "any.required": "Password is required",
        "string.pattern.base": "Password must be valid"
    }),
    phone: joi.string().pattern(/^01[0125][0-9]{8}$/).optional().messages({
        "string.pattern.base": "Phone must be a valid Egyptian phone number",
    })
}).or('email', 'phone').messages({
    'object.missing': 'You must provide either an email or a phone number.'
});

export default loginValidation