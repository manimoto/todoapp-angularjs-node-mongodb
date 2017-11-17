var Ninja = require('../models/ninja');

// Posts API
module.exports = function (apiRouter) {

	apiRouter.get('/ninjas', function (req, res) {
		console.log("Welcome to ninja get");
		Ninja.find({}, function (err, ninjas) {
			if (err) res.send(err);
			res.status(200).json(ninjas);
		});
	});

	apiRouter.post('/ninjas', function (req, res) {
		var ninja = new Ninja();
		ninja.name = req.body.name;
		ninja.belt = req.body.belt;
		ninja.rate = req.body.rate;
		ninja.available = req.body.available;
		ninja.thumb = req.body.thumb
		ninja.save(function (err, ninja) {
			if (err) res.send(err);
			res.status(200).json(ninja);
		});
	});


	apiRouter.put('/ninjas/:id', function (req, res) {
		Ninja.findById(req.params.id, function (err, ninja) {
			if (err) res.send(err);
			ninja.name = req.body.name;
			ninja.rate = req.body.rate;
			ninja.belt = req.body.belt;
			ninja.available = req.body.available;
			ninja.thumb = req.body.thumb;
			ninja.save(function (err, ninja) {
				if (err) res.send(err);
				res.status(200).send(ninja);
			})
		});

	});

	apiRouter.get('/ninjas/:id', function (req, res) {
		Ninja.findById(req.params.id, function (err, ninja) {
			if (err) res.send(err);
			res.status(200).send(ninja);
		});
	});

	apiRouter.delete('/ninjas/:id', function (req, res) {
		Ninja.findById(req.params.id, function (err, ninja) {
			if (err) res.send(err);
			if (ninja) {
				Ninja.remove({ _id: req.params.id }, function (err, ninja) {
					if (err) res.send(err);
					res.status(200).send({ message: 'Ninja Successfully Deleted!' })
				})
			}
			else {
				res.status(200).send({ message: 'Ninja Doesn\'t Exist!' })
			}
		});
	});

	apiRouter.delete('/allninjasdeleted', function (req, res) {
		Ninja.find({}, function (err, ninja) {
			if (err) res.send(err);
			if (ninja) {
				Ninja.remove({}, function (err, ninja) {
					if (err) res.send(err);
					res.status(200).send({ message: 'All Ninjas Successfully Deleted!' })
				})
			}
			else {
				res.status(200).send({ message: 'Ninjas Doesn\'t Exist!' })
			}
		});
	});

	apiRouter.post('/addNinjas', function (req, res) {
		this.defaultNinjas = req.body.data;
		var operationsCompleted = 0;
		function operation() {
			++operationsCompleted;
			if (operationsCompleted == this.defaultNinjas.length) after_forloop(); 
		}
		for (let defaultninja of this.defaultNinjas) {
			var ninja = new Ninja();
			ninja.name = defaultninja.name;
			ninja.rate = defaultninja.rate;
			ninja.belt = defaultninja.belt;
			ninja.available = defaultninja.available;
			ninja.thumb = defaultninja.thumb;
			ninja.save(function (err, ninja) {
				if (err) console.log(err);
				operation();
			});
		}
		function after_forloop(){
			res.status(200).send({ message: 'All Ninjas Successfully Added!' })
		}
		

	});

}