const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open',() => {
    console.log("Conectado com sucesso!");
});

const exerRouter = require('./routes/exercicio');
const usersRouter = require('./routes/usuarios');

app.use('/exercicio', exerRouter);
app.use('/usuarios',usersRouter);

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});
