var express = require('express');
var router = express.Router();

var Cat = require('../models/catModel.js');

//get all lizard names
router.get('/', function(req, res, next){

  Cat.find({}, function(err, cats) {
    var msg = "Cat names are: ";
    cats.forEach(function(cat){
      msg = msg + cat.name + ",";
    })

    cats.sort(function(a, b) {
      return a.age - b.age;
    });
    
    res.render("home", {allcats: cats});
  })

});

router.get('/new', function(req, res, next) {
  var catnames = ['Anne', 'Sam', 'Tenzin', 'Jeff', 'Emily', 'Jennifer'];
  var catname = catnames[Math.floor(Math.random()*catnames.length)];

  var catage = Math.floor((Math.random() * 10) + 1);

  var catcolors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  var catcolor = catcolors[Math.floor(Math.random()*catcolors.length)];

  var newcat = new Cat({name: catname, age: catage, color: catcolor});
  newcat.save(function(err) {
    if(err) console.log('Could not save');
  })
  res.render("new", newcat);

});

router.get('/bycolor/:color', function(req, res, next) {
  var sortcolor = req.params.color;
  Cat.find({}, function(err, cats) {

    var cats_color = [];
    cats.forEach(function(cat) {
      if (cat.color == sortcolor) cats_color.push(cat);
    });

    cats_color.sort(function(a, b) {
      return a.age - b.age;
    });

    res.render("bycolor", {allcats: cats_color});

  });

});

// router.get('/best/:color', function(req, res, next) {
//   var sortcolor = req.params.color;

//   Cat.find({name: 'Sam', color: sortcolor}, function(err, cats) {
//     cats.sort(function(a, b) {
//       return a.age - b.age;
//     });

//     res.render("best", {allcats: cats});

//   });



// });

router.get('/best', function(req, res, next) { // :)

  Cat.find({$or: [{name:'Sam'}, {age: {$gt:9}}]}, function(err, cats) {
      cats.sort(function(a, b) {
        return a.age - b.age;
    });

    res.render("best", {allcats: cats});

  });

});

router.get('/delete/old', function(req, res, next) {
  /*
  You mentioned that you didn't get remove() to work -- how were you trying to use it?
  It looks like the remove() method has been in flux over the past couple Mongoose versions -- 
  in the past you needed to do a find query first, and just recently they've added support for
  Model.remove({key: value}, callback)... and I'm not sure if they deprecated the old way when
  they did that. Maybe it was a Mongoose versioning issue?

  I'm looking at this StackOverflow thread...
    http://stackoverflow.com/questions/5809788/how-do-i-remove-documents-using-node-js-mongoose/10266789#10266789
  ...some interesting discussion of various ways to remove documents.

  If you're removing exactly one item (which you are) this is how I'd do it, though.
  */

  Cat.findOneAndRemove().sort('-age').exec(function(err, oldest) {
    if (err) console.log('Error deleting cat');
    res.render('delete', oldest);
  });
});

module.exports = router;
