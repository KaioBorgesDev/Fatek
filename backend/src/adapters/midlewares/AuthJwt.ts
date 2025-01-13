import { JwtTokenService } from "src/infra/Service/JwtTokenService";
import ValidateTokenCase from "src/usecases/TokenCase/ValidateTokenCase";

const secretKey = "SAD";

const authJwt = async (req,res,next) => {
    const validateToken = new ValidateTokenCase(new JwtTokenService(secretKey));

    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
       return res.status(403).json({Error: "Token not provided"});
    }
    
    const payload = await validateToken.execute(token);
    req.user = payload;
    next();
}

module.exports = {authJwt};