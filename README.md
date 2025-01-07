# Fatek - Blog Oficial da Comunidade Fatec

Bem-vindo ao Fatek, o blog dedicado à comunidade da Fatec! Aqui, você encontrará conteúdos voltados para o universo acadêmico, tecnológico e inovador da nossa faculdade. Se você é aluno, professor ou apenas um entusiasta da tecnologia, este blog é o seu lugar!

## Tecnologias Utilizadas

Este blog é um projeto desenvolvido utilizando algumas das tecnologias mais modernas do mercado. Confira abaixo as principais ferramentas que usamos:

## Arquitetura do app atualmente.
   ![Imagem da tecnologia do app atualmente](img/tecnologias.PNG)

- **Node.js com Typescript**: Ambiente de execução JavaScript no lado do servidor.
- **Express.js**: Framework minimalista para Node.js, usado para construir APIs rápidas e eficientes.
- **React JS**: Framework para desenvolvimento de aplicativos web
- **MongoDB**: Banco de dados NoSQL, altamente escalável e flexível.
- **Azure**: Plataforma de nuvem da Microsoft, usada para deploy, hospedagem e escalabilidade do projeto.
- **Clean Architecture**: Arquitetura de software focada na separação de responsabilidades e manutenção fácil, visando criar um código mais organizado e testável.


## Fluxo na camada mais externa.
 
  ![Imagem do fluxo do aplicativo atualmente](img/fluxo_app.png)


## Estrutura do Backend (Fluxo entre as Camadas)

   ![Imagem da Arquitetura do app atualmente](img/arquitetura_backend.PNG)


1. **Navegador (Usuário)**:  
   O usuário interage com a aplicação através do navegador ou aplicativo móvel. As ações realizadas (como cliques e preenchimento de formulários) geram solicitações enviadas para a camada de infraestrutura.

2. **Infraestrutura (Infra)**:  
   A infraestrutura recebe as solicitações enviadas pelo navegador. Aqui, frameworks e drivers (como o Express.js) processam essas solicitações e as encaminham para os adaptadores, traduzindo-as para um formato compreensível pelas regras de negócio.

3. **Adaptadores (Interface)**:  
   Os adaptadores conectam a camada de infraestrutura com os casos de uso. Eles interpretam as entradas recebidas, validam os dados e chamam os casos de uso corretos para atender à solicitação.

4. **Casos de Uso (Use Cases)**:  
   A camada central e mais importante da aplicação, onde estão definidas as regras de negócio. Os casos de uso processam a solicitação, acessam o banco de dados ou executam outras lógicas necessárias, sempre seguindo as regras definidas.

5. **Entrega das Respostas**:  
   Após o processamento, o fluxo segue no sentido inverso:
   - Os casos de uso retornam os dados aos adaptadores.
   - Os adaptadores traduzem os dados em um formato apropriado.
   - A infraestrutura os envia ao navegador, que exibe os resultados para o usuário.

## Como Rodar o Projeto Localmente

### Requisitos

- Docker e Docker Compose instalados no seu sistema.
- Node.js (v14 ou superior).
- MongoDB (em container Docker ou serviço de MongoDB online como MongoDB Atlas).

### Passos para rodar o projeto com Docker Compose

1. **Instale as dependências:**

   `npm install`

2. **Suba os containers do Docker:**

   `docker-compose up -d`

## Contribuições

Este projeto é open-source! Se você deseja contribuir, fique à vontade para enviar pull requests ou abrir issues. Acreditamos na colaboração para tornar o Fatek ainda melhor.
