const mongoose = require('mongoose');
const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://Famzy077:Lxoa3Gqpx1De5hez@foodflow.8e8bgrt.mongodb.net/?retryWrites=true&w=majority&appName=FoodFlow')
            console.log('Successfully connected to the dataBase')
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    
    }
}
module.exports = connect;