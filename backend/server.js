const express = require('express')
const app = express()
const connectDB= require('./config/connectdb')
const port = 5000
require("dotenv").config()
connectDB()
const cors = require("cors");
const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}
app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(cors(corsOptions))
app.use(express.json())

//routes

app.use("/api/beautyhack", require("./routes/hackRoutes"))
app.use("/api/product", require("./routes/productRoutes"))
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))



app.listen(port, (err) =>err?console.log(err): console.log(` app listening on port ${port}!`))