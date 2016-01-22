// server.js

    var express  = require('express');
    var app      = express();                               
    var mongoose = require('mongoose');                     
    var morgan = require('morgan');             
    var bodyParser = require('body-parser');    //  POST 
    var methodOverride = require('method-override'); //  DELETE PUT

    //CONECTO BASE
    mongoose.connect('mongodb://localhost/personal', function(err, res) {    
if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
else {
console.log('bien ahi!');}
});
    
    //CONFIGURACION
    app.use(express.static(__dirname + '/public'));             
    app.use(morgan('dev'));                                        
    app.use(bodyParser.urlencoded({'extended':'true'}));            
    app.use(bodyParser.json());                                     
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    app.use(methodOverride());

   // MODELO
    var Persona = mongoose.model('Persona', {
        nombre: String,
	    apellido: String,
	    edad: String
    });
    
   // RUTAS 
    
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
            nombre : req.body.nombre,apellido: req.body.apellido, edad: req.body.edad},
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
            _id : req.params.persona_id
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

 app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); 
    });


    app.listen(3000);
    console.log("App en el puerto 3000");