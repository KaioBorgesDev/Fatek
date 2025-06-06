import { describe, test, expect } from "@jest/globals";
import AdressUser from "../../src/entities/AdressUser"; 

describe("AdressUser Entity", () => {
  test("createAdress() deve criar endereço válido", () => {
    const endereco = AdressUser.createAdress(
      "12345-678",
      "123",
      "Centro",
      "Rua das Flores",
      "São Paulo",
      "SP"
    );

    expect(endereco).toBeInstanceOf(AdressUser);
    expect(endereco.cep).toBe("12345-678");
    expect(endereco.casa).toBe("123");
    expect(endereco.bairro).toBe("Centro");
    expect(endereco.endereco).toBe("Rua das Flores");
    expect(endereco.cidade).toBe("São Paulo");
    expect(endereco.estado).toBe("SP");
  });

  test("deve lançar erro se o CEP tiver mais de 9 dígitos", () => {
    expect(() =>
      AdressUser.createAdress(
        "1234567890",
        "123",
        "Bairro",
        "Rua",
        "Cidade",
        "Estado"
      )
    ).toThrow("CEP não pode ter mais de 9 dígitos.");
  });

  test("deve lançar erro se casa não for numérica", () => {
    expect(() =>
      AdressUser.createAdress(
        "12345-678",
        "ABC",
        "Bairro",
        "Rua",
        "Cidade",
        "Estado"
      )
    ).toThrow("Casa deve conter apenas números.");
  });

  test("deve lançar erro se endereço for só número", () => {
    expect(() =>
      AdressUser.createAdress(
        "12345-678",
        "123",
        "Bairro",
        "12345",
        "Cidade",
        "Estado"
      )
    ).toThrow("Endereço não pode conter apenas números.");
  });
});
