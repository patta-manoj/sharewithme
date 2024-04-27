const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const normalFile = require('./routes/fileRoutes');
const securedFile = require('./routes/securedFileRoute');
const dashboardRouter = require('./routes/dashboardRoute');
const databaseConnected = require('./routes/databaseConnected');

app.use(express.json());
app.use(cors());

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI ;
const PORT = process.env.PORT || 8080;

mongoose.connect(MONGODB_URI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


app.use('/file' , normalFile) ;

app.use('/secured' , securedFile) ;

app.use('/dashboard' , dashboardRouter);

app.use('/connection_established' , databaseConnected);




app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`);
});
