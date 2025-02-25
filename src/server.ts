import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from "./config/database";

dotenv.config()


const app = express();
app.use(cors());
app.use(express.json());


// Connect to database AFTER loading environment variables
connectDb();


console.log('MONGO_URI:', process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});