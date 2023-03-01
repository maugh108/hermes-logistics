import mongoose from 'mongoose';

export async function connect(){
    try{ 
        await mongoose.connect('mongodb://localhost/mongodbgraphql', {
            useNewUrlParser: true
        })
        console.log('>>> DB is connected')
    }
    catch(e){
        console.log("Something was wrong!")
        console.log(e)
    }
     
}


