import jwt from "jsonwebtoken";
import secret from "../config.js"
import req from "express/lib/request.js";
import res from "express/lib/response.js";



export function auth(req, res, next){
    if(req.method === "OPTIONS"){
        next();
    }
}

try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
           res.status(403).json({message: "Пользователь не авторизован"})
        }
        req.user = jwt.verify(token, secret.secret);
        next();
}
catch(e){
    console.log(e)
    res.status(403).json({message: "Пользователь не авторизован"})
}