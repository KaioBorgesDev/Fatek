import { Request, Response } from "express";
import AdressUser from "../../entities/AdressUser";
import User from "../../entities/User";
import { JwtTokenService } from "../../infra/Service/JwtTokenService";
import UserRepositoryImp from "../../infra/Service/UserRepositoryImp";
import LoginUseCase from "../../usecases/UserCases/LoginUseCase";
import RegisterAdressUser from "../../usecases/UserCases/RegisterAdressUser";
import RegisterUseCase from "../../usecases/UserCases/RegisterUseCase";

const secretKey = process.env.JWT_SECRET_KEY || "SAD";

// Controller de login
const loginController = async (req: Request, res: Response) => {
    const loginUseCase = new LoginUseCase(
        new UserRepositoryImp(),
        new JwtTokenService(secretKey)
    );
    try {
        const jwtoken = await loginUseCase.execute(
            req.body.email,
            req.body.passwordHash
        );
        return res.status(200).json({ token: jwtoken });
    } catch (error) {
        if (error.message === "Credentials Invalid!")
            return res.status(401).json({ error: "E-mail ou senha inválidos" });
        return res.status(400).json({ error: error.message });
    }
};

// Controller de registro de usuário
const registerController = async (req: Request, res: Response) => {
    const registerUseCase = new RegisterUseCase(new UserRepositoryImp());
    const { email, password, name } = req.body;

    try {
        const user = User.create(email, password, name);

        await registerUseCase.execute(email, user.passwordHash, name);

        return res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Usuário com este e-mail já existe",
            });
        }
        if(error == "Password must be at least 6 characters long"){
            return res.status(409).json({
                message: "Usuário com este e-mail já existe",
            });
        }
        return res.status(400).json({
            error: "Erro ao registrar usuário: " + error.message,
        });
    }
};

// Controller de registro de endereço de usuário
const registerUserAdressController = async (req: Request, res: Response) => {
    const userRepository = new UserRepositoryImp();
    const registerAdressUser = new RegisterAdressUser(userRepository);

    const userId = req.body.id_user; // Extraído do token pelo middleware
    const { cep, casa, bairro, endereco, cidade, estado } = req.body;

    try {
        const address = AdressUser.createAdress(cep, casa, bairro, endereco, cidade, estado);

        await registerAdressUser.execute(userId, address);

        return res.status(200).json({ message: "Endereço registrado com sucesso!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginController,
    registerController,
    registerUserAdressController,
};
