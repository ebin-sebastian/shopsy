const MongoClient = require('mongodb').MongoClient;

const state={
    db:null
}

module.exports.connect = function(done){

    const url= 'mongodb://localhost:27017'
    const dbname = 'shopping'

    MongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db = data.db(dbname)
        done()
    })

}


// module.exports.connect = async () => {
//     const url = 'mongodb://localhost:27017';
//     const dbname = 'shopping';
//     try {
//       const client = await MongoClient.connect(url);
//       const db = client.db(dbname);
//       return db; // Return the connected database object
//     } catch (err) {
//       console.error('connection error:', err);
//       throw err; // Re-throw the error to be handled by the app
//     }
//   };



module.exports.get=function(){
    return state.db
}