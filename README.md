# DayZServlet-SQL 

An obsolete implementation of the DayZ Legacy hive and servlet. 

Just plugin your SQL DB info. 

Use xampp if you want to make it easy https://www.apachefriends.org/

# Getting started 
- Install prerequisites - `.\install.bat` 
- Specify `user` and `password` for your database (default name is `dayz`)
- Ensure `http://localhost:80/DayZServlet` is specified in your `CfgServerHost` (this is in your `config.cpp` inside of `server_data.pbo`)
- `node index.js`

The servlet should catch all requests the game sends and parse the JSON data into the database.

This was originally intended for DayZ Legacy but we have since moved on to a Flask/MongoDB implementation which I like better. We have added endpoints for object saving but they will not work on vanilla copies of the game.

Character saving should work for all DayZ versions from 0.45 to 0.59. 

I will not provide any support for this repository.

