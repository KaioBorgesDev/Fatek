import { JwtTokenService } from "../../infra/Service/JwtTokenService";
import ValidateTokenCase from "../../usecases/TokenCase/ValidateTokenCase";

const secretKey = "SAD";

const authJwt = async (req,res,next) => {
    const validateToken = new ValidateTokenCase(new JwtTokenService(secretKey));
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(403).json({Error: "Token not provided"});
    }

    try{
        const payload = await validateToken.execute(token);
        req.body.id_user = payload.id_user;
        next();
    }catch(error){
        res.status(401).json({
            "error": "TokenExpiredError",
            "message": "O token fornecido expirou. Faça login novamente."
          })
    }

}

module.exports = {authJwt};
