import {defaultState} from './defaultState';
import {connectDB} from './connect-db';


async function initializeDB(){
    let db = await connectDB();
    for(collectionName in defaultState){
        let collection = db.collection(collectionName);
        await collection.insertMany(defaultState[collectionName])
    }
}

