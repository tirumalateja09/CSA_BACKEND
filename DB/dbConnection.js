const mongoose = require('mongoose');



const makeDbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URI);
        console.log(`DB Connected Successfully,...${connect.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = makeDbConnection