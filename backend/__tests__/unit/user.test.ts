import { describe, expect, test } from "@jest/globals";
import User from "../../src/entities/User";



/*
 Criação válida de usuário.

 Senha inválida (<6).

 Nome inválido (<3).

 Email inválido.

 Validação de senha correta.

 Validação de senha incorreta.
*/


describe("User Entity", () => {
  describe("create()", () => {
    test("deve criar um usuário válido quando dados corretos são fornecidos", () => {
      const user = User.create("teste@exemplo.com", "senha123", "João");

      expect(user).toBeInstanceOf(User);
      expect(user.email).toBe("teste@exemplo.com");
      expect(user.name).toBe("João");
      expect(user.id_user).toBeDefined();
      expect(user.passwordHash).not.toBe("senha123"); // deve estar hasheada
    });

    test("deve lançar erro se a senha tiver menos de 6 caracteres", () => {
      expect(() => {
        User.create("teste@exemplo.com", "123", "João");
      }).toThrow("Password must be at least 6 characters long");
    });

    test("deve lançar erro se o nome tiver menos de 3 caracteres", () => {
      expect(() => {
        User.create("teste@exemplo.com", "senha123", "Jo");
      }).toThrow("Name must be at least 3 characters long");
    });

    test("deve lançar erro se o email for inválido", () => {
      expect(() => {
        User.create("email-invalido", "senha123", "João");
      }).toThrow("Invalid email format");
    });
  });

  describe("validatePassword()", () => {
    test("deve retornar true se a senha for correta", () => {
      const senha = "senha123";
      const user = User.create("teste@exemplo.com", senha, "João");

      expect(user.validatePassword(senha)).toBe(true);
    });

    test("deve retornar false se a senha for incorreta", () => {
      const user = User.create("teste@exemplo.com", "senha123", "João");

      expect(user.validatePassword("senhaErrada")).toBe(false);
    });
  });
});
