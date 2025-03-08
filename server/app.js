import express from 'express';
const app = express();
import db from "./config/dbConnection.js";
import mainRoutes from "./mainRoute/mainRoute.js"
db();



app.use("/api/v1", mainRoutes);


app.all("*", (req, res) => {
  res.status(404)
     .json({message: "Page not found"})
})

app.listen(8000, () => {
  console.log('Server is running on port 3000');
});