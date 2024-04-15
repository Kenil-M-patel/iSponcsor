const mongoose = require('mongoose');

// module.exports = ()=>{
//     const connectionPrams = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
//     try {
//         mongoose.connect(process.env.DB , connectionPrams).then((result) => {
//             console.log("MongoDB connected");
//         }).catch((err) => {
//             console.log(err);
//         });
//     } catch (error) {
//         console.log('some error , not connect to DB');
    
//     }
// }

async function connctiontoMongo(url) {
    try {
        await mongoose.connect(url).then((result) => {
            console.log("MongoDB connected");
        })
    }
    catch (err) {
        console.log(err);
    }    
}

module.exports = {
    connctiontoMongo,
}