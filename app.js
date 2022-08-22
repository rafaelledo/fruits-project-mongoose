const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/fruitsDB")

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema)

const fruit = new Fruit ({
    name: "Apple",
    rating: 10,
    review: "Pretty solid das a fruit."
})

fruit.save()

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema,
})

const Person = mongoose.model("Person", personSchema)

const pineapple = new Fruit ({
    name: "pineapple",
    score: 10,
    review: "Great fruit."
})

pineapple.save()

const person = new Person({
    name: "Ana",
    age: 12,
    favoriteFruit: pineapple
})

person.save()

const kiwi = new Fruit ({
    name: "Kiwi",
    score: 10,
    review: "The best fruit!"
})

const orange = new Fruit ({
    name: "Orange",
    score: 4,
    review: "Too sour for me"
})

const banana = new Fruit ({
    name: "Banana",
    score: 3,
    review: "Weird texture"
})

Fruit.insertMany([kiwi, orange, banana], (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Succesfully saved all the fruits to fruitsDB");
    }
})

Fruit.find((err, fruits) => {
    if (err) {
        console.log(err)
    } else {
        fruits.forEach((fruit) => {
            console.log(fruit.name)
        })
    }
    mongoose.connection.close()
})

Fruit.updateOne({_id: "Orange"}, {name: "Peach"}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Successfull updated the document.")
    }
})

Fruit.deleteOne({name: "Kiwi"}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Succesfully deleted the document.")
    }
})

Person.deleteMany({name: "Rafael"}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Succesfully deleted the documents.")
    }
})