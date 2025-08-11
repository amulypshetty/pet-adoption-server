const express = require('express');
const app = express();

app.use(express.json());

// Mock data
const pets = [
    { id: 1, name: "Bella", type: "Dog", image: "https://images.photowall.com/products/57215/golden-retriever-puppy.jpg?h=699&q=85" },
    { id: 2, name: "Milo", type: "Cat", image: "https://cdn.shopify.com/s/files/1/0435/0466/4732/files/how_long_do_siamese_cats_live_1_600x600.jpg?v=1653912141" }
];

const petDetails = {
    1: {
        id: 1,
        name: "Bella",
        type: "Dog",
        age: 2,
        breed: "Golden Retriever",
        fun_fact: "Golden Retrievers love swimming!",
        image: "https://images.photowall.com/products/57215/golden-retriever-puppy.jpg?h=699&q=85"
    },
    2: {
        id: 2,
        name: "Milo",
        type: "Cat",
        age: 3,
        breed: "Siamese",
        fun_fact: "Siamese cats are known for their vocal nature!",
        image: "https://cdn.shopify.com/s/files/1/0435/0466/4732/files/how_long_do_siamese_cats_live_1_600x600.jpg?v=1653912141"
    }
};

// API 1: GET /pets
app.get('/pets', (request, response) => {
    console.log("PETS API HIT");
    response.json(pets);
});

// API 2: GET /pets/:id
app.get('/pets/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const pet = petDetails[id];

    if (pet) {
        response.json(pet);
    } else {
        response.status(404).json({ message: "Pet not found" });
    }
});

// API 3: POST /adopt (Mock Auth)
app.post('/adopt', (request, response) => {
    const { pet_id, applicant_name, email, reason } = request.body;

    // Mock check: pet exists
    if (!pets.find(p => p.id === pet_id)) {
        return res.status(400).json({ message: "Invalid pet_id" });
    }

    // Mock adoption_id generation
    const adoption_id = Math.floor(Math.random() * 9000) + 1000;

    response.json({
        adoption_id: adoption_id,
        status: "pending_review",
        message: "Your adoption request has been received!"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
