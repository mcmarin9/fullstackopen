const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Note = mongoose.model('Note', noteSchema)

  /*
  const note = new Note({
    content: 'HTML is x',
    important: true,
  })

  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
})


/* PARA AÑADIR LOS USERS HASHEADOS */
/*
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:xe1szNYdifaCAAsX@cluster0.etxfu.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
  })

  const User = mongoose.model('User', userSchema)

  const addUsers = async () => {
    await User.deleteMany({})

    const users = [
      {
        username: 'root',
        name: 'Superuser',
        password: 'sekret'
      },
      {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      },
      {
        username: 'janedoe',
        name: 'Jane Doe',
        password: 'password123'
      }
    ]

    for (const user of users) {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(user.password, saltRounds)

      const userObject = new User({
        username: user.username,
        name: user.name,
        passwordHash
      })

      await userObject.save()
    }

    console.log('users added to the database')
    mongoose.connection.close()
  }

  addUsers()
}).catch(error => {
  console.error('error connecting to MongoDB:', error.message)
}) */