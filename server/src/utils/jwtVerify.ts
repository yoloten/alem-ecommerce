import { secret } from "../keys/secret"
import * as jwt from "jsonwebtoken"

export const jwtVerify = (req: any, res: any, next: any) => {
    const bearerHeader = req.headers["authorization"]
    
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
    } else {
        res.sendStatus(403)
    }

    jwt.verify(req.token, secret.secretOrKey, (err: any, authData: any) => {
        if (err) {
            res.sendStatus(403)
            console.log(err)
        }
    })
    next()
}
