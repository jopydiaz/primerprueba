/**
 * 
 * Class to Connect MongoDB with Mongoose
 *
 */
var mongoose = require('mongoose');

//CONECTO BASE
mongoose.connect('mongodb://localhost/personal', function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('bien ahi!');
    }
});
