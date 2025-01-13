import { JwtTokenService } from "src/infra/Service/JwtTokenService";
import ValidateTokenCase from "src/usecases/TokenCase/ValidateTokenCase";

const secretKey = "SAD";

const authJwt = (req,res,next) => {
    const validateToken = new ValidateTokenCase(new JwtTokenService(secretKey));

    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        res.status(403).json({Error: "Token not provided"});
    }
    const payload = validateToken.execute(token);
    req.id_user = payload;
    next();
}

module.exports = authJwt;