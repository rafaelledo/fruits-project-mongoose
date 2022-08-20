const MongoClient  = require("mongodb").MongoClient
const assert = require("assert")

const uri = 'mongodb://localhost:27017'

const client = new MongoClient(uri)

const dbName = "fruitsDB"

client.connect(function () {
    console.log("Connected to server")

    const db = client.db(dbName)
    
    // insertDocuments(db, function () {
    //     client.close()
    // })

    findDocuments(db, function () {
        client.close()
    })
})

const insertDocuments = function (db, callback) {
    const collection = db.collection("fruits")

    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great fruit"
        },
        {
            name: "Orange",
            score: 6,
            review: "Kinda sour"
        },
        {
            name: "Banana",
            score: 9,
            review: "Great stuff!"
        }
    ],
        function(err, result) {
            assert.equal(err, null)
            assert.equal(3, result.insertedCount)
            console.log("Inserted 3 documents into the collection")
            callback(result)
        }
    )
}

const findDocuments = function (db, callback) {
    const collection = db.collection("fruits")

    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null)
        console.log("Found the following records")
        console.log(fruits)
        callback(fruits)
    })
}