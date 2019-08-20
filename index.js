const Express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
var cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const product = require('./data.route');

var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';

var ObjectID = require('mongodb').ObjectID; 
var port = process.env.PORT || 3000;
var app = Express();
app.use(cors());
app.use(BodyParser.json()); 
app.use(BodyParser.urlencoded({ extended: false }));
var port = process.env.PORT || 3000;
// const CONNECTION_URL = "mongodb+srv://vuNHT:PHIhung@123@cluster0-vwx6r.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "example-data";

let dev_db_url = "mongodb+srv://vuNHT:PHIhung@123@cluster0-vwx6r.mongodb.net/" + DATABASE_NAME + "?retryWrites=true&w=majority";
let mongoDB = dev_db_url;
const config = {
    autoIndex: false,
    useNewUrlParser: true,
  };
mongoose.connect(mongoDB, config, (err, client) => { 
    
    if (err) {
        console.log(err);
    } else {
    console.log("Connected to `" + DATABASE_NAME + "`!");
    }
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => {
    app.use('/', product);
});
// var database, collection, collection2;
// var data;
// var dataSave;

// MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         throw error;
//     }
//     database = client.db(DATABASE_NAME);
//     console.log("Connected to `" + DATABASE_NAME + "`!");
    // database.createCollection('data-2', function (err, res) {
    //     if (err) throw err;
    //     console.log('Tao thanh cong collection');
    // });
    // collection = database.collection("data-1");

    // collection2 = database.collection('data-2');

    // var data = {
    //     name: "name1",
    //     newDocument: 'new Document1',
    //     price: 5000
    // };
    // collection2.insertOne(data, function (err,res) {
    //     //neu xay ra loi
    //     if (err) throw err;
    //     //neu khong co loi
    //     console.log('Them thanh cong');
    // });
    // collection.updateOne
// });

// app.get('/testData2', (req, res) => {
//     collection2.find({}).toArray(function (err, response) {
//         if (err) {
//             return res.status(404).send({
//                 success: 'false',
//                 message: 'Lost Connect !!',
//             })
//         } else {
//             return res.status(200).send({
//                 success: 'true',
//                 message: 'Successfully !!',
//                 data: response
//             })
//         }
//     })
// })

// app.get('/testDataJoin', (req, res) => {
//     collection.aggregate([
//         {$lookup: {
//             from: 'data-2',
//             localField: 'name',
//             foreignField: 'name',
//             as: 'joinData'
//         }
//         }
//     ]).toArray((err, resJoin) => {
//         if (err) {
//             return res.status(404).send({
//                 success: 'false',
//                 message: 'Lost Connect !!',
//             })
//         } else {
//             return res.status(200).send({
//                 success: 'true',
//                 message: 'Successfully !!',
//                 data: resJoin
//             })
//         }
//     })
// })

// app.get('/testData', (req, res) => {
//     collection.find({}).toArray(function (err, response) {
//         if (err) {
//             return res.status(404).send({
//                 success: 'false',
//                 message: 'Lost Connect !!',
//             })
//         } else {
//             return res.status(200).send({
//                 success: 'true',
//                 message: 'Successfully !!',
//                 data: response
//             })
//         }
//     })
// })

// app.post('/testData', (req, res) => {
//     console.log(req.body);
//     if (!req.body) {
//         return res.status(404).send({
//             success: 'false',
//             message: 'Lost Connect !!'
//         });
//     } else {
//         collection.insertOne(req.body);
//         return res.status(201).send({
//             success: 'true',
//             message: 'Successfully !!',
//         })
//     }
// });

// app.put('/testData/:id', (req, res) => {
//     console.log(req.params.id);
//     console.log(req.body);
//     var query = { '_id': ObjectID(req.params.id)};

//     if (!req.body) {
//         return res.status(404).send({
//             success: 'false',
//             message: 'Lost Connect !!'
//         });
//     } else {
//         collection.updateOne(query, {$set: {name: req.body.name,
//                                             document: req.body.document}},
//                                             (err, update) => {
//             if (err) {
//                 res.status(404).send({
//                     success: 'false',
//                     message: err
//                 })
//             } else {
//              return res.status(200).send({
//                 success: 'true',
//                 message: 'Update Successfully !!'
//              });
//             }
//         });
//     }
// });

// app.delete('/testData/:id', (req, res) => {
//     console.log(req.params.id);
//     console.log(req.body);
//     var query = { '_id': ObjectID(req.params.id)};

//     if (!req.body) {
//         return res.status(404).send({
//             success: 'false',
//             message: 'Lost Connect !!'
//         });
//     } else {
//         collection.deleteOne(query, (err, resDelete) => {
//             if (err) {
//                 res.status(404).send({
//                     success: 'false',
//                     message: err
//                 })
//             } else {
//              return res.status(200).send({
//                 success: 'true',
//                 message: 'Delete Successfully !!'
//              });
//             }
//         });
//     }
// });

// const PORT = 8797

// app.use('/', (req, res) => {
//     res.json({"mess": "Hello!"})
// })

// app.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;