
//A file for seeing database.

const mongoose = require('mongoose');
const cities = require('./cities'); 
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => (array[Math.floor(Math.random() * array.length)]);

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fc66d01783248298c5a2bad',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta voluptatem eligendi illum nostrum facere beatae odio eum vitae explicabo! Maxime fuga similique nemo eius cum accusamus optio id quos impedit!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                     cities[random1000].longitude,
                     cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dg5w1ty7q/image/upload/v1607015609/YelpCamp/zqpxqis8xd3fixcph7oa.jpg',
                    filename: 'YelpCamp/zqpxqis8xd3fixcph7oa',
                },
            ]   
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});