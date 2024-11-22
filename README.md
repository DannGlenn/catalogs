# Catalogs
  
## Installation and Setup

1. Clone the repository

2. Run 
```bash
npm install
``` 
on both client and server

3. Make sure ports 3000 and 5000 are clear

4. Run 
```bash
npm start
```  
on both client and server(`sudo npm start` if fails)

5. On your browser, naviagte to http://localhost:3000/catalogs

## Notes

It's highly recommended to download `SQLite3 Editor` extension to view /database.db (contraints, triggers and data structure)

Was written as a sample with support for 1 customer, additional customers support would exceed the scope of the task

Ideally, cron jobs would run on a dedicated service, but for the sake of the demonstration it's running on the api server

DB timezone is UTC

Note that all queries are sanitized before execution

Visual design was kept to a minimum since no UI design file was provided


## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE.txt)