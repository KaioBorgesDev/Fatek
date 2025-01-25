import AdressUser from "src/entities/AdressUser";
import User from "src/entities/User";
import { JwtTokenService } from "src/infra/Service/JwtTokenService";
import UserRepositoryImp from "src/infra/Service/UserRepositoryImp";
import LoginUseCase from "src/usecases/UserCases/LoginUseCase";
import RegisterAdressUser from "src/usecases/UserCases/RegisterAdressUser";
import RegisterUseCase from "src/usecases/UserCases/RegisterUseCase";

const secretKey = "SAD";

const loginController = async (req, res) => {
    const loginUseCase = new LoginUseCase(
        new UserRepositoryImp(),
        new JwtTokenService(secretKey)
    );

    try {
        const jwtoken = await loginUseCase.execute(
            req.body.email,
            req.body.passwordHash
        );
        res.status(200).json({ token: jwtoken });
    } catch (error) {
        if (error.message === "Credentials Invalid!")
            return res.status(401).json({ Erro: "E-mail ou senha inválidos" });
        res.status(400).json({ Erro: error.message });
    }
};

const registerController = async (req, res) => {
    const registerUseCase = new RegisterUseCase(new UserRepositoryImp());
    const { email, password } = req.body;

    try {
        const user = new User(email, password);

        await registerUseCase.execute(email, user.passwordHash);

        res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }
        res.status(400).json({
            Erro: "Erro ao registrar usuário: " + error.message,
        });
    }
};

const registerUserAdressController = async (req, res) => {
    const userRepository = new UserRepositoryImp();
    const registerAdressUser = new RegisterAdressUser(userRepository);

    
    const userId = req.body.id_user; // Extraído do token pelo middleware
    console.log(userId);
    const { cep, casa, bairro, endereco, cidade, estado } = req.body;

    try {
        // Cria a entidade de endereço
        const address = AdressUser.createAdress(cep, casa, bairro, endereco, cidade, estado);

        // Executa o caso de uso
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
