import express from 'express'
import mongoose from 'mongoose';
import router from './router.js'



const PORT = process.env.PORT || 5000;
const app = express();
const DB_URL = 'mongodb+srv://user:user@cluster0.3wzbw9d.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json())
app.use('/api', router)


async function startApp(){
    try{
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('SERVER IS WORKING' + ' ' + PORT))
    }
    catch (e){
        console.log(e);
    }
}

startApp();