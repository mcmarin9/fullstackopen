const mongoose = require('mongoose');
const Person = require('./models/person');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');

    const person = new Person({
      name: 'John Doe',
      number: '123-456-7890',
    });

    return person.save();
  })
  .then(() => {
    console.log('person saved!');
    return Person.find({});
  })
  .then(result => {
    console.log('All persons:');
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });