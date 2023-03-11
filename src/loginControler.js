import User from "./models/User";
import jwt from 'jsonwebtoken'
import config from './config/auth.config'
export const login = async (req,res) => {
    const user = await User.findOne({username: req.body.username})
    if(!user) return res.status(403).json({message: 'Unauthorized'})
    const matchPassword = await User.comparePassword(req.body.password, user.password)
    if(!matchPassword) return res.status(403).json({message: 'Incorrect Password'}) 
    const token = jwt.sign({id: user._id}, config.SECRET,{
        expiresIn: 86400 //24hrs
    })
    return res.json({token})
}

export const defaultUser = async(req, res) => {
    const user = await User.findOne({username: 'admin'})
    if(!user){
        const superUser = new User()
        superUser.firstName = 'admin'
        superUser.lastName = 'admin'
        superUser.username = 'admin'
        superUser.password = await User.encryptPassword('admin')
        superUser.age = 999
        await superUser.save()
    }
    
    return res.json("admin created")
}

export const checkToken = async (req, res) => {
    return res.json(true)
}
