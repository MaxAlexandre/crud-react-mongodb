const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exercicioSchema = new Schema({
    username:{type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
},{
    timestamps: true,
});

const Exercicio = mongoose.model('Exercicio', exercicioSchema);

module.exports = Exercicio;
