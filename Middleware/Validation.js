export const validation = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body)
        if(result.error){
            return res.status(422).json({message: result.error.details[0].message})
        }
        next()
    }
}