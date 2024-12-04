const express = require("express");
const connectToDatabase = require("./config/connect");
const cookieParser = require("cookie-parser"); 
const cors = require("cors");
require("dotenv").config(); 
const mainRoute=require("./routes/mainRoute")

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:300","http://localhost:5173"],  // The origin of your frontend
  credentials: true,               // Allow cookies to be sent
  methods: "GET,POST,PUT,DELETE",  // Allow specific HTTP methods
};

app.use(cors(corsOptions)); 
app.use(cookieParser())
app.use(express.json())
app.use("/",mainRoute)
// Connect to the database and then start the server
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
