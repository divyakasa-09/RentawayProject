import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from './routes/index.js';
import bodyParser from 'body-parser';

// Set up the application to use express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'));
route(app);

// Connect to the mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/rentaway');

export default app;