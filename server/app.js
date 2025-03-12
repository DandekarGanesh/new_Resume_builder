import express from 'express';
const app = express();
import db from "./config/dbConnection.js";
import mainRoutes from "./mainRoute/mainRoute.js"
import morgan from "morgan"
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 8080;
db();

// const corsOptions = {
//   origin: [process.env.FRONTEND_URL], // Allow these domains
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
//   credentials: true, // Allow cookies
// };

// app.use(cors(corsOptions));

const allowedOrigins = process.env.FRONTEND_URL;

app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers"
    ],
    exposedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers"
    ],
    preflightContinue: false ,
    optionsSuccessStatus: 204
  }));


  // Handle preflight requests for all routes
  app.options('*', cors()); // Automatically handles preflight requests


app.use(cookieParser());
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