var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/add', function(req, res) {
    res.send('发表文章');
});

module.exports = router;








