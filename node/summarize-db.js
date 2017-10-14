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
	var dbCounter = 0;
	if(err){
		console.log('Error looking up databases');
		return;
	}

	for(b = 0; b < rows.length; b++){
		dbCounter++;
		findDatabase(rows[b].Database, dbCounter == rows.length);
	}



});

function findTableFields(database, tableName, dbCounter, tableCounter){
	connection.query('DESCRIBE ' + database + '.' + tableName, function(errTable, rowTable, fieldsTable){
				if(errTable){
					console.log("This is the error " + errTable);
					return;
				}



				console.log("---|"+database + "\n" + "......|" + database + "." + tableName + ">");
				for(j = 0; j < rowTable.length;  j++){
					console.log("\tFieldName: `"+ rowTable[j].Field + "` \t" + "(" + rowTable[j].Type + ")");
				}
				if (dbCounter && tableCounter) {
					connection.end();
				}
	});
}

function findTables(database,tableList,dbCounter){
	var tableCounter = 0;
	for(i = 0; i < tableList.length; i++){
		tableCounter++;
		var query = "Tables_in_" + database;
		var table1 = tableList[i][query];

		findTableFields(database, table1, dbCounter, tableCounter == tableList.length);
	}
}

function findDatabase(name, dbCounter){
	connection.query('SHOW TABLES FROM ' + name, function(errDB, rowsDB, fieldsDB){
		if(errDB){
			console.log("this is the error: " + errDB);
			return;
		}

		findTables(name, rowsDB, dbCounter);
	});
}
