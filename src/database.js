import mongoose from 'mongoose';

export async function connect(){
    try{ 
        await mongoose.connect('mongodb://127.0.0.1/mongodbgraphql', {
            useNewUrlParser: true
        })
        console.log('>>> DB is connected')
    }
    catch(e){
        console.log("Something was wrong!")
        console.log(e)
    }
     
}


