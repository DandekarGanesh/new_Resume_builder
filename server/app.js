import express from 'express';
const app = express();
import db from "./config/dbConnection.js";
import mainRoutes from "./mainRoute/mainRoute.js"
import morgan from "morgan"
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 8080;
db();


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use("/api/v1", mainRoutes);


app.all("*", (req, res) => {
  res.status(404)
     .json({message: "Page not found"})
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});