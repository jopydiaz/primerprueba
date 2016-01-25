var mongoose = require('mongoose');

// MODELO
var Persona = mongoose.model('Persona', {
    nombre: String,
    apellido: String,
    edad: String
});

module.exports = Persona;
