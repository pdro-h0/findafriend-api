<p align="center">
Este projeto foi feito no desafio da Rocketseat. <br/>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Express
- Nodejs
- Typescript
- JWT
- Prisma
- Zod
- Bcryptjs
- Vitest

## 💻 Projeto

Find a Friend é um projeto mobile full-stack. Nele eu realizei o back-end de uma aplicação para adoção de cachorros. [Link do front-end](https://github.com/pdro-h0/findafriend-frontend)

---

## 🤔 Instruções

### Primeiros passos:

Primeiramente baixe o arquivo front-end no [GitHub](https://github.com/pdro-h0/findafriend-frontend), no seu terminal, execute o seguinte comando na pasta raiz:

`npm install`

Depois baixe o arquivo back-end no [GitHub](https://github.com/pdro-h0/findafriend-api), no seu terminal, execute o seguinte comando na pasta raiz:

`npm install`

E então rode o comando do [docker-compose](https://docs.docker.com/compose/):

`docker-compose up -d`

Logo em seguida rode:

- `npx prisma db push`
- `npx prisma db seed`

Por fim:

`npm run dev`

### Variáveis de Ambiente:

Para rodar o back-end, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

- `PORT=8080`
- `DATABASE_URL="postgresql://[POSTGRESQL_USERNAME]:[POSTGRESQL_PASSWORD]@localhost:5433/[POSTGRESQL_DATABASE]?schema=public"`
- `JWT_SECRET=""`

---

Feito com ♥ by Pedro Henrique
