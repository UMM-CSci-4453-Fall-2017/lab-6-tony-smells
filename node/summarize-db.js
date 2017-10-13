credentials = require('./credentials.json');
var mysql = require("mysql");

credentials.host = "ids";
var connection = mysql.createConnection(credentials);

connection.connect(function(err){
	if(err){
		console.log("Problems with MySQL: " + err);

	}else {
		console.log("Conneced to Database.");
	}
});

connection.query('SHOW DATABASES', function(err, rows, fields){
	if(err){
		console.log('Error looking up databases');
		return;
	}

	console.log('SHOW TABLES FROM ' + rows[0].Database);

	connection.query('SHOW TABLES FROM ' + rows[0].Database, function(errDB, rowsDB, fieldsDB){
		if(errDB){
			console.log("this is the error: " + errDB);
			return;
		}

		for(i = 0; i < rowsDB.length; i++){
			var query = "Tables_in_" + rows[0].Database;
			var tableName = rowsDB[i][query];
			console.log(tableName + ": ")
			connection.query('DESCRIBE ' + rows[0].Database+ "." + tableName, function(errTable, rowsTable, fieldsTable){
				if(errTable){
					console.log("ayyy lmao");
					return;
				}

				console.log(JSON.stringify(rowsTable) + "\n");

			});
		}
		connection.end();
	});
});

console.log("this is dumb");
