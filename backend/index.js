import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import activitiesRoute from './routes/activityRoutes.js';
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const mongoDB_URL = process.env.DB_CONNECTION_STRING;

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req,res) => {
  res.send({message: "hello MERN-stack"})
})

app.use("/activity", activitiesRoute);

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`)
    })
  })
  .catch((err) => {
    console.log(err);
  })