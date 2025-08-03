require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 || process.env.PORT;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bkijc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(cors())
app.use(express.json())

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        const database = client.db('mini-linkedin-db');
        const usersCollection = database.collection("users");
        const postCollection = database.collection("posts");

        // user related apis
        app.post("/api/users", async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: "user already exists", insertedId: null })
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
        app.get("/api/users/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            res.send(user);
        })

        // posts related apis
        app.post("/api/posts", async (req, res) => {
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result);
        })
        app.get("/api/posts", async (req, res) => {
            const result = await postCollection.find().sort({ _id: -1 }).toArray();
            res.send(result);
        })
        app.get("/api/posts/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const posts = await postCollection.find(query).sort({ _id: -1 }).toArray();
            res.send(posts);
        })
        app.patch("/api/posts/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $inc: { likesCount: 1 }
            };
            const result = await postCollection.updateOne(query, updateDoc);
            res.send(result);
        });


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Welcome to mini careerin  server')
})

app.listen(port, () => {
    console.log(`Careerin app listening on port ${port}`)
})
