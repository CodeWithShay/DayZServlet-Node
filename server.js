var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var ipfilter = require('ipfilter');
var moment = require('moment');
var app = express();

var pool = mysql.createPool({
    connectionLimit: 15,
    host: 'localhost',
    user: '',
    password: '',
    database: 'dayz'
});

// Init middleware
moment().format();

// Allowed IPs (server IP)
var ips = ['127.0.0.1'];
app.use(ipfilter(ips, {
    mode: 'allow'
}));
app.use(bodyParser());

exports.start = function () {
    app.listen(85);
    console.log('Server running on port 85');
};


app.post('/DayZServlet/lud0/find', function (req, res) {
    console.log('Find user: ' + req.query.uid + ' for server: ' + req.query.id);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
		
        connection.query('SELECT model,x,y,z,queue FROM player WHERE uid = ?', [req.query.uid], function (err, rows, fields) {
            if (err) throw err;
            connection.release();

            if (rows.length == 0) {
                console.log('User not found');
                res.send('');
                return;
            }
			
			
            rows[0].pos = [rows[0].x, rows[0].y, rows[0].z];
            delete rows[0].x;
            delete rows[0].y;
            delete rows[0].z;

            // Calculate queue
            var queueEnd = moment(rows[0].queue);
            rows[0].queue = -queueEnd.diff(moment(), 'seconds');

            res.send(JSON.stringify(rows[0]));
        });
		
    });
});

app.get('/DayZServlet/lud0/load', function (req, res) {
    console.log('Load user: ' + req.query.uid + ' for server: ' + req.query.id);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM player WHERE uid = ?', [req.query.uid], function (err, rows, fields) {
            if (err) throw err;
            connection.release();

            if (rows.length == 0) {
                console.log('User not found');
                res.send('');
                return;
            }
            // Edit result for sending
            rows[0].items = JSON.parse(rows[0].items);
            rows[0].state = JSON.parse(rows[0].state);
			

			if(rows[0].x == 0 && rows[0].y == 0 && rows[0].z == 0){
			//var arre = [[10444.4,6.00144,2219.09], [10444.4,6.00144,2219.09], [6483.88,6.1431,2444.76], [4548.01,2.07804,2416.19],[1832.46,5.76267,2103.36],[13392,6.24098,6152.86],[12833.2,5.9842,9602.17]];
			var arre = [[1615.0503, 0, 2161.2571], [1784.4131, 0, 2121.2129], [2111.0391, 0, 2239.2134], [2180.8953, 0, 2215.6128], [3596.1052, 0, 2332.1318], [3765.3386, 0, 2471.564], [4379.1689, 0, 2394.5205], [4632.7695, 0, 2237.2292], [5075.5073, 0, 2084.3015], [5233.1563, 0, 2047.4854], [5830.7114, 0, 2113.5664], [6341.4185, 0, 2257.999], [6435.8188, 0, 2296.7029], [7169.8115, 0, 2665.2786], [7982.9473, 0, 3136.6846], [8088.2124, 0, 3115.3271], [9759.3672, 0, 1908.3828], [9799.126, 0, 1917.8201], [10404.531, 0, 1906.592], [10535.379, 0, 2057.8811], [10867.256, 0, 2587.4341], [10894.93, 0, 2653.4233], [10717.182, 0, 2254.2893], [9085.9355, 0, 2028.8818], [11891.922, 0, 3425.5125], [12291.057, 0, 3498.9531], [12356.568, 0, 0, 3508.5251], [11818.939, 0, 3414.9197], [13400.615, 0, 5379.7676], [13400.615, 0, 5487.7495], [13508.701, 0, 6138.9214], [13539.656, 0, 6394.4609], [13511.994, 0, 6202.8057], [13227.322, 0, 7152.9736], [13257.695, 0, 7103.9063], [13321.453, 0, 6932.5742], [13017.633, 0, 8394.3809], [13052.732, 0, 8128.3193], [13179.645, 0, 10433.64], [13232.967, 0, 10122.303], [12988.715, 0, 9539.1943], [12900.482, 0, 9025.3691], [14269.994, 0, 12970.019], [14183.822, 0, 12792.111], [12961.49, 0, 9420.8633], [8494.6475, 0, 2641.7065], [7318.1079, 0, 2829.0298], [7287.4209, 0, 2304.897], [9369.8809, 0, 1939.3231], [11028.553, 0, 2811.2842], [11037.242, 0, 2912.6687]];
			rand_cood = Math.floor( Math.random() * 50 );
			rows[0].pos = [arre[rand_cood][0], arre[rand_cood][1], arre[rand_cood][2]];
			//rows[0].pos = [15602.407,266.41776,7466.0063];
			}else{	
			rows[0].pos = [rows[0].x, rows[0].y, rows[0].z];	
			}	
				
			//rows[0].pos = [rows[0].x, rows[0].y, rows[0].z];	
			rows[0].dir = [rows[0].dir_x, rows[0].dir_y, rows[0].dir_z];
            rows[0].up = [rows[0].up_0, rows[0].up_1, rows[0].up_2];
            delete rows[0].uid;
            delete rows[0].x;
            delete rows[0].y;
            delete rows[0].z;
            delete rows[0].dir_x;
            delete rows[0].dir_y;
            delete rows[0].dir_z;
            delete rows[0].up_0;
            delete rows[0].up_1;
            delete rows[0].up_2;
			
		
			
			//console.log('POS: ' + rows[0].pos);

            // Calculate queue
            var queueEnd = moment(rows[0].queue);
            rows[0].queue = -queueEnd.diff(moment(), 'seconds');

            //console.log('Sent character data: ' + JSON.stringify(rows[0]));
            res.send(JSON.stringify(rows[0]));
        });
    });
});

app.get('/DayZServlet/objects/load_obj', function (req, res) {
    console.log('Load tent: ' + req.query.oid + ' for server: ' + req.query.id);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM object WHERE uid = ? AND servid = ?', [req.query.oid, req.query.id], function (err, rows, fields) {
            if (err) throw err;
            connection.release();

            if (rows.length == 0) {
                console.log('Tents not found');
                res.send('');
                return;
            }
            // Edit result for sending
            rows[0].items = JSON.parse(rows[0].items);
            rows[0].state = JSON.parse(rows[0].state);
            rows[0].pos = [rows[0].x, rows[0].y, rows[0].z];
            rows[0].dir = [rows[0].dir_x, rows[0].dir_y, rows[0].dir_z];
            rows[0].up = [rows[0].up_0, rows[0].up_1, rows[0].up_2];
            delete rows[0].uid;
            delete rows[0].x;
            delete rows[0].y;
            delete rows[0].z;
            delete rows[0].dir_x;
            delete rows[0].dir_y;
            delete rows[0].dir_z;
            delete rows[0].up_0;
            delete rows[0].up_1;
            delete rows[0].up_2;

            //console.log('Sent character data: ' + JSON.stringify(rows[0]));
            res.send(JSON.stringify(rows[0]));
        });
    });
});


app.post('/DayZServlet/lud0/create', function (req, res) {
    console.log('Create user: ' + req.query.uid + ' for server: ' + req.query.id);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('INSERT INTO player(time_created,uid,servid) VALUES(NOW(),?,?)', [req.query.uid,req.query.id], function (err, rows, fields) {
            if (err) throw err;
            connection.release();
        });
    });
    res.send('');
});

app.get('/DayZServlet/objects/count_obj', function (req, res) {
    console.log('Ccount tent: ' + req.query.id);
	
	var count_data = '{\"count\":['; 	
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT uid FROM object WHERE servid = ?', [req.query.id], function (err, rows, fields) {
            if (err) throw err;
            connection.release();
			for (i=0; i <= rows.length - 1; i++){
				
				count_data = count_data +'\"'+  rows[i].uid+'\"';
				if (i < rows.length - 1) {
					count_data = count_data + ',';
				}
			}			
			count_data = count_data + ']}';
			res.send(count_data);
		});
	});
});

app.post('/DayZServlet/lud0/save', function (req, res) {
    console.log('Save user: ' + req.query.uid);
	

    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query('UPDATE player SET model = ?, alive = ?, items = ?, state = ?, x = ?, y = ?, z = ?, dir_x = ?, dir_y = ?, dir_z = ?, up_0 = ?, up_1 = ?, up_2 = ?, servid = ? WHERE uid = ?', [req.body.model, req.body.alive, JSON.stringify(req.body.items), JSON.stringify(req.body.state), req.body.pos[0], req.body.pos[1], req.body.pos[2], req.body.dir[0], req.body.dir[1], req.body.dir[2], req.body.up[0], req.body.up[1], req.body.up[2], req.query.id, req.query.uid], function (err, rows, fields) {
            if (err) throw err;
            connection.release();
        });
		
    });
    res.send('');
});


app.post('/DayZServlet/objects/save_obj', function (req, res) {
    pool.getConnection(function (err, connection) {

        if (err) throw err;
	    connection.query('SELECT * FROM object WHERE uid = ? AND servid = ?', [req.query.oid,req.query.id], function (err, rows, fields) {
			
			if (err) throw err;
			connection.release();
			if ( rows.length > 0) {
				pool.getConnection(function (err, connectiona) {
				if (err) throw err;
				console.log('Save tent: ' + req.query.oid + ' for server: ' + req.query.id);
				connectiona.query('UPDATE object SET model = ?, items = ?, state = ?, x = ?, y = ?, z = ?, dir_x = ?, dir_y = ?, dir_z = ?, up_0 = ?, up_1 = ?, up_2 = ? WHERE uid = ? AND servid = ?', [req.body.model,JSON.stringify(req.body.items), JSON.stringify(req.body.state), req.body.pos[0], req.body.pos[1], req.body.pos[2], req.body.dir[0], req.body.dir[1], req.body.dir[2], req.body.up[0], req.body.up[1], req.body.up[2], req.query.oid ,req.query.id], function (err, rowsa, fields) {
					if (err) throw err;
					connectiona.release();
				});
				});
			} else {

				pool.getConnection(function (err, connectionb) {
				console.log('Insert tent: ' + req.query.oid + ' for server: ' + req.query.id);	
				connectionb.query('INSERT INTO object(time_created, model, items, state, x, y, z, dir_x, dir_y, dir_z, up_0, up_1, up_2, uid, servid) VALUES (NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [req.body.model, JSON.stringify(req.body.items), JSON.stringify(req.body.state), req.body.pos[0], req.body.pos[1], req.body.pos[2], req.body.dir[0], req.body.dir[1], req.body.dir[2], req.body.up[0], req.body.up[1], req.body.up[2], req.query.oid, req.query.id], function (err, rowsa, fields) {
				if (err) throw err;
				connectionb.release();
				});
				});
			}			
		});	
    res.send('');
	});
	
});


app.post('/DayZServlet/lud0/queue', function (req, res) {
    console.log('Queue user: ' + req.query.uid + ' (' + req.body.queue + 's)');

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT queue FROM player WHERE uid = ?', [req.query.uid], function (err, rows, fields) {
            if (err) throw err;

            var query;
            var queueEnd = moment(rows[0].queue);
            if (queueEnd.diff(moment(), 'seconds') > 0) {
                // Add to existing queue
                query = 'UPDATE player SET queue = DATE_ADD(queue,INTERVAL ' + mysql.escape(JSON.stringify(req.body.queue)) + ' SECOND), servid=? WHERE uid = ?';
	//			query = 'UPDATE player SET queue = DATE_ADD(CURRENT_TIMESTAMP,INTERVAL ' + mysql.escape(JSON.stringify(req.body.queue)) + ' SECOND), servid=? WHERE uid = ?';
            } else {
                // Create new queue from now
                query = 'UPDATE player SET queue = DATE_ADD(CURRENT_TIMESTAMP,INTERVAL ' + mysql.escape(JSON.stringify(req.body.queue)) + ' SECOND), servid=? WHERE uid = ?';
            }
            connection.query(query, [req.query.id, req.query.uid], function (err, rows, fields) {
                if (err) throw err;
                connection.release();
            });
        });
    });
    res.send('');
});

app.post('/DayZServlet/lud0/kill', function (req, res) {

    console.log('Kill user: ' + req.query.uid.match(/\d+$/)[0] + ' for server: ' + req.query.id);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('DELETE FROM player WHERE uid = ?', [req.query.uid.match(/\d+$/)[0]], function (err, rows, fields) {
            if (err) throw err;
            connection.release();
        });
    });
    res.send('');
});

app.post('/DayZServlet/objects/destroy_obj', function (req, res) {
    console.log('Destroy tent: ' + req.query.uid + ' for server: ' + req.query.id);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('DELETE FROM object WHERE uid = ? AND servid = ?', [req.query.uid, req.query.id], function (err, rows, fields) {
            if (err) throw err;
            connection.release();
        });
    });
    res.send('');
});


app.post(/.*/, function (req, res) {
    console.log('Got unhandled POST: ' + req.url);
    res.send('404 not found');
});

app.get(/.*/, function (req, res) {
    console.log('Got unhandled GET: ' + req.url);
    res.send('404 not found');
});