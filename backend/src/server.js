// server.js (ESM style)
import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';


import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve(); // Get the current directory name


// CORS configuration FOR DEVELOPMENT
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: 'http://localhost:5173', // your frontend Vite server
  }));
}

//middleware
app.use(express.json()); // this middleware will parse JSON bodies: req.body


app.use(rateLimiter); //call our middleware

//Allows cross-origin requests 


//  simple Custom middleware

// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`); //First give a message 
//     next(); // Then call the next middleware
// })


app.use("/api/notes", notesRoutes)

// On production, serve the static files from the frontend build directory

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "dist"))); // Serve static files from the frontend build directory

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html")); // Serve the index
  })
}
// End


connectDB()  // Connect to the Database then start the Server
    .then(() => {
app.listen(PORT || 5001, () => {
    console.log("Server is running on PORT: 5001");
});
})


