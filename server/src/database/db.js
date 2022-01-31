const mongoose = require('mongoose');

const Connection = async (URL) => {

    await mongoose.connect(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('database connected...');
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = Connection;