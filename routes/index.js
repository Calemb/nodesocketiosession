var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //for me this is undefined,
    // but from time to time I can see some cookie (??)
    console.log("session: " + req.session);

    //render
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;
