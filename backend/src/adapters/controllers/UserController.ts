import { JwtTokenService } from "src/infra/Service/JwtTokenService";
import UserRepositoryImp from "src/infra/Service/UserRepositoryImp"
import LoginUseCase from "src/usecases/UserCases/LoginUseCase"

const LoginController = async (req,res) =>{
    const loginUseCase = new LoginUseCase(new UserRepositoryImp(), new JwtTokenService('SAD'));

    try {
        const jwtoken = await loginUseCase.execute(req.body.email, req.body.password);

        res.status(200).json({token: jwtoken})
    } catch (error) {
        res.status(401).json({Erro: "Erro ao fazer o login " + error});
    }
    
}


module.exports = LoginController