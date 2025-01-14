import { JwtTokenService } from "src/infra/Service/JwtTokenService";
import ValidateTokenCase from "src/usecases/TokenCase/ValidateTokenCase";

const secretKey = "SAD";

const authJwt = async (req,res,next) => {
    const validateToken = new ValidateTokenCase(new JwtTokenService(secretKey));
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(403).json({Error: "Token not provided"});
    }

    try{
        const payload = await validateToken.execute(token);
        req.body.user = payload;
        next();
    }catch(error){
        res.status(401).json({
            "error": "TokenExpiredError",
            "message": "O token fornecido expirou. Faça login novamente."
          })
    }
    
}

module.exports = {authJwt};