import Users from './Models.js';
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import secret from './config.js'
const generateAccessToken = (id, user_name, user_surname) => {
    const payload = {
        id,
        user_name,
        user_surname
    }
    return jwt.sign(payload, secret.secret, {expiresIn: '1h'})
}


class authController {
    async registration(req, res) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при регистрации", errors})
            }
            const {user_login, user_password, user_name, user_surname} = req.body
            const candidate = await Users.findOne({user_login})
            if(candidate) {
                return res.status(400).json({message:'User already exists'})
            }
            const HashPassword = bcrypt.hashSync(user_password, 7)
            const user = new Users({user_login, user_password:HashPassword, user_name, user_surname})
            await user.save()
            return res.json({message:'Registration success'})
        }catch (e) {
            console.log(e)
            res.status(400).json({message:'Registration error'})
        }
    }
    async login(req, res) {
        try{
            const {user_login, user_password} = req.body
            const candidate = await Users.findOne({user_login})
            if(!candidate) {
                return res.status(400).json({message:'User not found'})
            }
            const isMatch = bcrypt.compareSync(user_password, candidate.user_password)
            if(!isMatch) {
                return res.status(400).json({message:'Wrong password'})
            }
            const token = generateAccessToken(candidate._id)

            return res.json({token})
        }catch (e) {
            console.log(e)
            res.status(400).json({message:'Login error'})
        }
    }
    async GetUser(req, res) {
        try{
            const users = await Users.find()
            res.json(users)
        }catch (e) {
            console.log(e)
        }
    }
    async GetUserWithId(req, res) {
        try{
            const user = await Users.findById(req)
            res.json(user)
        }catch (e) {
            console.log(e)
        }
    }
    async GetUserInform(req, res) {
        try{

        }catch (e) {
            console.log(e)
        }
    }
}

export default new authController();