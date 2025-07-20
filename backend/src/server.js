// server.js (ESM style)
import express from 'express';
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();
const app = express();
const PORT= process.env.PORT ;

//middleware
app.use(express.json()); // this middleware will parse JSON bodies: req.body

app.use(rateLimiter); //call our middleware

//  Custom middleware

// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`); //First give a message 
//     next(); // Then call the next middleware
// })


app.use("/api/notes", notesRoutes)

connectDB()  // Connect to the Database then start the Server
    .then(() => {
app.listen(PORT || 5001, () => {
    console.log("Server is running on PORT: 5001");
});
})


