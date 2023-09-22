const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://raunak:1234@cluster0.jn3ymar.mongodb.net/?retryWrites=true&w=majority');

// acquire the connection 
const db = mongoose.connection;

// Error 
db.once('error', console.error.bind(console,"Error in connecting to Database"));

// up and running then print the message
db.once('open', ()=> {
    console.log("Database connected successfully");
})

module.exports = db;