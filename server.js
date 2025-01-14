import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const app = express();
app.use(express.json());

// User: murilo 
// Password: UdsCbHKXa4RtBRD7


// Criar Usuário
app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    }
  })
  res.status(201).json(req.body);
})


// Listar Usuários
app.get('/usuarios', async (req, res) => {
  let users = [];
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
      }
    })
  } else {
    users = await prisma.user.findMany()
  }
  res.status(200).json(users);
})

// Editar Usuário
app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    }
  })
  res.status(201).json(req.body);
})

// Deletar Usuário
app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    }
  })
  res.status(200).json({
    message: 'Usuário deletado com sucesso'
  })
})



app.listen(3000, () => {
  console.log(`App tá rodando da porta 3000`);
})


