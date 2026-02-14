const express = require('express')
const prisma = require('./prismaClient')

const app = express()
app.use(express.json())

app.post('/user', async (req, res) => {
  try {
    const { name, email } = req.body

    // validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    res.status(201).json(user)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' })
    }

    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})