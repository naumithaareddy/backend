import express from "express";
const app = express()
import cors from "cors"

app.listen(8080,()=>{
    console.log("Server started at port 8080")
});

const usr = encodeURIComponent("naumithaa_reddy");
const pwd = encodeURIComponent("Naumithaa@2003");

import{ MongoClient,ObjectId} from "mongodb";
//const uri = "mongodb://127.0.0.1:27017"
const uri= "mongodb+srv://${usr}:${pwd}@cluster0.jkeas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri)
const db = client.db("ecomm")

app.use(express.json())
app.use(cors())

app.get("/",async (req,res)=>{
    const items = await db.collection("products").find().toArray()
    res.status(200).json(items);
});

app.post("/", async (req, res) => {
    const { name, price,url, desc } = req.body;
    const data = {
      name: name,
      price: price,
      url:url,
      desc:desc
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
  app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
    });