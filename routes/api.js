
// Models
var Persona = require('../models/persona');

var api = {
  init: function(app) {
    //OBTENGO
    app.get('/api/persona', function(req, res) {

        Persona.find(function(err, persona) {


            if (err)
                res.send(err)

            res.json(persona);
        });
    });

    // CREO personas
    app.post('/api/persona', function(req, res) {


        Persona.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                edad: req.body.edad
            },
            function(err, persona) {
                if (err)
                    res.send(err);


                Persona.find(function(err, persona) {
                    if (err)
                        res.send(err)
                    res.json(persona);
                });
            });

    });

    // ELIMINO personas
    app.delete('/api/persona/:persona_id', function(req, res) {
        Persona.remove({
            _id: req.params.persona_id
        }, function(err, persona) {
            if (err)
                res.send(err);


            Persona.find(function(err, persona) {
                if (err)
                    res.send(err)
                res.json(persona);
            });
        });
    });
  }
};

module.exports = api;
