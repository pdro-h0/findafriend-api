import { hashSync } from "bcryptjs";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const pets = [
      {
        name: "Alfredo",
        about:
          "Sou um doguinho alegre e enérgico. Adoro brincar no parque, correr atrás de bolas e receber carinho. Um verdadeiro companheiro leal e amoroso",
        cityName: "city-1",
        environment: "wide",
        photo:
          "https://images.unsplash.com/photo-1711955894472-6c812316b792?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        requirement: [
          "Tempo diário dedicado para exercício e interação com o cão.",
          "Disponibilidade para compromissos de treinamento e cuidados contínuos.",
        ],
        age: "puppy",
        size: "small",
        energyLevel: "high",
        independencyLevel: "small",
      },
      {
        name: "Rodolfo",
        about:
          "Divertido e adorável, com orelhas grandes e expressão fofa. Seu jeito brincalhão e leal faz dele um excelente amigo para todas as idades, sempre disposto a alegrar o dia.",
        cityName: "city-1",
        environment: "regular",
        photo:
          "https://images.unsplash.com/photo-1716147625767-792859c49420?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        requirement: [
          "Disponibilidade para compromissos de treinamento e cuidados contínuos.",
        ],
        age: "adult",
        size: "small",
        energyLevel: "normal",
        independencyLevel: "small",
      },
      {
        name: "Juquinha",
        about:
          "Imponente e protetor. Inteligente e obediente, é excelente em tarefas de treinamento e adora longas caminhadas ao ar livre.",
        cityName: "city-1",
        environment: "small",
        photo:
          "https://images.unsplash.com/photo-1660963636201-26f248b133bb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        requirement: ["Espaço adequado para a raça e ambiente seguro."],
        age: "adult",
        size: "big",
        energyLevel: "high",
        independencyLevel: "small",
      },
      {
        name: "Jucelino",
        about:
          "Sempre curioso. Ele é sociável, adora se aventurar em passeios e é ótimo com crianças.",
        cityName: "city-1",
        environment: "small",
        photo:
          "https://images.unsplash.com/photo-1587518102280-8d5fdcb68d13?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        requirement: [
          "Compromisso com consultas veterinárias regulares e cuidados de saúde.",
        ],
        age: "old",
        size: "normal",
        energyLevel: "low",
        independencyLevel: "small",
      },
      {
        name: "Getúlio",
        about:
          "Carinhoso e amigável, com olhos expressivos e uma personalidade cativante. Ele adora farejar novos aromas e brincar com seus brinquedos, sempre buscando atenção e carinho.",
        cityName: "city-2",
        environment: "wide",
        photo:
          "https://images.unsplash.com/photo-1518378188025-22bd89516ee2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        requirement: [
          "Condições financeiras para suportar alimentação e despesas veterinárias.",
          "Compromisso com consultas veterinárias regulares e cuidados de saúde.",
          "Disponibilidade para compromissos de treinamento e cuidados contínuos.",
        ],
        age: "puppy",
        size: "normal",
        energyLevel: "high",
        independencyLevel: "small",
      },
    ];

    const orgs = [];

    const org = await prisma.org.create({
      data: {
        personInCharge: "Fulano da Silva",
        orgName: "animalandiaOrg",
        email: "email@email.com",
        cep: "11111-111",
        address: "Aquela Rua",
        phoneNumber: "0000000000",
        password: hashSync("12345", 6),
      },
    });

    for (const pet of pets) {
      await prisma.pet.create({
        data: {
          name: pet.name,
          about: pet.about,
          cityName: pet.cityName,
          environment: pet.environment,
          photo: pet.photo,
          requirement: pet.requirement,
          age: pet.age,
          size: pet.size,
          energyLevel: pet.energyLevel,
          independencyLevel: pet.independencyLevel,
          org: {
            connect: {
              id: org.id,
            },
          },
        },
      });
    }

    orgs.push(org);

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as Organizações:", error);
  }
}

seedDatabase();
