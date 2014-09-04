module.exports = function(app) {
	app.get('/', function(req, res){
	  console.log('req.session()',req.session());
	  res.sendfile('./server/index.html');
	});
}