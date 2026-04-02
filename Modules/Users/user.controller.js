
import { userModel } from "../../DataBase/Models/user.model.js";
import { handleError } from "../../Middleware/HandlError.js";


const getAllUsers =handleError( async (req, res) => {
    let users = await userModel.find()
    res.json({ message: "list Users", data: users })
})

const updateUser =handleError( async (req, res) => {
    if (req.params.id !== req.decoded._id) {
        return res.status(403).json({ message: "You are not authorized to update this user's data. You can only update your own data." });
    }

    // Security: Prevent users from making themselves admins or verified arbitrarily
    if (req.body.role) delete req.body.role;
    if (req.body.isVerified) delete req.body.isVerified;

    let updatedUser = await userModel.findByIdAndUpdate(req.decoded._id, req.body,
        { new: true })

    if (updatedUser == null) {
        return res.status(404).json({ message: "user not found" })
    }
    res.json({ message: "updated user", data: updatedUser })
})

const deleteUser =handleError(async (req, res) => {
    const id = req.params.id
    let deletedUser = await userModel.findByIdAndDelete(id)
    if (deletedUser == null) {
        return res.status(404).json({ message: "user not found" })
    }
    res.json({ message: "deleted User" })
})

export { getAllUsers, updateUser, deleteUser }
