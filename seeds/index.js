const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '603849c543a7f3548146e6b3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga praesentium tenetur excepturi id animi a ad omnis! Saepe suscipit, ut, ratione consequuntur delectus ipsa aliquam porro corrupti cumque, quia sed.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddwmrmzrv/image/upload/v1614801240/Yelpcamp/fln6qw71pcdbdeiqlmpo.jpg',
                    filename: 'Yelpcamp/fln6qw71pcdbdeiqlmpo'
                },
                {
                    url: 'https://res.cloudinary.com/ddwmrmzrv/image/upload/v1614801240/Yelpcamp/glau4h2mgrh74dwnom2n.jpg',
                    filename: 'Yelpcamp/glau4h2mgrh74dwnom2n'
                },
                {
                    url: 'https://res.cloudinary.com/ddwmrmzrv/image/upload/v1614801240/Yelpcamp/omyhgppx12xjxjpcbmsx.jpg',
                    filename: 'Yelpcamp/omyhgppx12xjxjpcbmsx'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})