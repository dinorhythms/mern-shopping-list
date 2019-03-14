var express = require('express');
var router = express.Router();

// item model
const Item = require('../../models/items');

/* GET Root API. */
router.get('/', function(req, res, next) {

  Item.find()
    .sort({date:-1})
    .then(items => res.json(items))
    
});

/* POST Root API. */
router.post('/', function(req, res, next) {

    const newItem = new Item({
        name: req.body.name
    });
      
    newItem.save().then(item=>res.json(item));

}); 

/* DELETE Root API. */
router.delete('/:id', function(req, res, next) {

    Item.findById(req.params.id)
        .then(item=>item.remove().then(()=> res.json({success: true})))
        .catch(err=> res.status(404).json({ success: false }));

});



module.exports = router; 
