# Catalogs
  
## Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/DannGlenn/catalogs.git
``` 

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
on /client

and:

```bash
sudo npm start
```  

on /server (to ensure nodemon watchers not exceeded and read write permissions are given to database.db)

5. On your browser, navigate to http://localhost:3000/catalogs

## Notes

It's highly recommended to download `SQLite3 Editor` extension to view /database.db (contraints, triggers and data structure)

Was written as a sample with support for 1 customer, additional customers support would exceed the scope of the task

Visual prompts for server errors also would exceed the scope of the task, for the sake of the demo console errors are triggered

Ideally, cron jobs would run on a dedicated service, but for the sake of the demo it's running on the api server, cron expression is set to run at mid-night

DB timezone is UTC

Note that all queries are sanitized before execution to void injections

Visual design was kept to a minimum since no UI design file was provided


## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE.txt)