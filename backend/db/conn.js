const mongoose = require('mongoose');

const main = async () =>{
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.CONNECTION);

    } catch (error) {
        console.log(`Error${error}`);
    }  

    console.log("conectado ao banco de dados");
}

module.exports = main;