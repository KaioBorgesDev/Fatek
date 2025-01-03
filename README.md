<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fatek - Blog Oficial da Comunidade Fatec</title>
    <style>
        /* Reset básico */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            color: #333;
        }

        header {
            background-color: #007BFF;
            color: white;
            padding: 2rem;
            text-align: center;
        }

        header h1 {
            margin-bottom: 0.5rem;
            font-size: 2.5rem;
        }

        header p {
            font-size: 1.2rem;
        }

        section {
            padding: 2rem;
            margin: 1rem 0;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        section h2 {
            font-size: 2rem;
            color: #007BFF;
            margin-bottom: 1rem;
        }

        ul {
            list-style: none;
            padding-left: 20px;
        }

        ul li {
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }

        ul li strong {
            color: #333;
        }

        ol {
            padding-left: 20px;
        }

        ol li {
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }

        code {
            background-color: #f8f8f8;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-size: 1.1rem;
        }

        footer {
            background-color: #007BFF;
            color: white;
            text-align: center;
            padding: 1rem;
            margin-top: 2rem;
        }

        footer p {
            font-size: 1rem;
        }
    </style>
</head>
<body>

    <header>
        <h1>Fatek - Blog Oficial da Comunidade Fatec</h1>
        <p>Bem-vindo ao Fatek, o blog dedicado à comunidade da Fatec! Aqui, você encontrará conteúdos voltados para o universo acadêmico, tecnológico e inovador da nossa faculdade. Se você é aluno, professor ou apenas um entusiasta da tecnologia, este blog é o seu lugar!</p>
    </header>

    <section class="tecnologias">
        <h2>Tecnologias Utilizadas</h2>
        <p>Este blog é um projeto desenvolvido utilizando algumas das tecnologias mais modernas do mercado. Confira abaixo as principais ferramentas que usamos:</p>
        <ul>
            <li><strong>Node.js:</strong> Ambiente de execução JavaScript no lado do servidor.</li>
            <li><strong>Express.js:</strong> Framework minimalista para Node.js, usado para construir APIs rápidas e eficientes.</li>
            <li><strong>React Native:</strong> Framework para desenvolvimento de aplicativos móveis multiplataforma (Android e iOS).</li>
            <li><strong>MongoDB:</strong> Banco de dados NoSQL, altamente escalável e flexível.</li>
            <li><strong>Azure:</strong> Plataforma de nuvem da Microsoft, usada para deploy, hospedagem e escalabilidade do projeto.</li>
            <li><strong>Clean Architecture:</strong> Arquitetura de software focada na separação de responsabilidades e manutenção fácil, visando criar um código mais organizado e testável.</li>
        </ul>
    </section>

    <section class="estrutura">
        <h2>Estrutura do Projeto</h2>
        <p>Este projeto segue o conceito de <strong>Clean Architecture</strong>, onde separamos a aplicação em camadas distintas para manter o código organizado e facilitar a manutenção. As camadas principais são:</p>
        <ul>
            <li><strong>API (Backend):</strong> Desenvolvido com Node.js e Express.js.</li>
            <li><strong>Frontend Web:</strong> Construído com React (ou React Native para a versão mobile).</li>
            <li><strong>Banco de Dados:</strong> MongoDB será usado para armazenar as informações do blog.</li>
            <li><strong>Deploy:</strong> Utilizamos a plataforma Azure para o deploy do backend e frontend.</li>
        </ul>
    </section>

    <section class="como-rodar">
        <h2>Como Rodar o Projeto Localmente</h2>
        <h3>Requisitos</h3>
        <ul>
            <li>Docker e Docker Compose instalados no seu sistema.</li>
            <li>Node.js (v14 ou superior).</li>
            <li>MongoDB (em container Docker ou serviço de MongoDB online como MongoDB Atlas).</li>
        </ul>
        <h3>Passos para rodar o projeto com Docker Compose</h3>
        <ol>
            <li><strong>Instale as dependências:</strong> <code>npm install</code></li>
            <li><strong>Suba os containers do Docker:</strong> <code>docker-compose up -d</code></li>
        </ol>
    </section>

    <section class="contribuicoes">
        <h2>Contribuições</h2>
        <p>Este projeto é open-source! Se você deseja contribuir, fique à vontade para enviar pull requests ou abrir issues. Acreditamos na colaboração para tornar o Fatek ainda melhor.</p>
    </section>

    <footer>
        <p>&copy; 2025 Fatek - Todos os direitos reservados</p>
    </footer>

</body>
</html>
