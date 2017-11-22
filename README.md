# Node Starter Project
This project is for all who want a quick setup of a Node / React project.

    
## Structure

  This is the directory structure of the application.
  
```
  ├── app
  │     ├── assets
  │     └── components
  │          ├── Content
  │          ├── Footer
  │          ├── Header
  │          ├── Logo
  ├── config
  ├── server
  │   ├── init
  │   ├── middleware
  │   ├── modules
  │   ├── routes
  │   ├── services
  │   └── utilities
  └── test
  │    ├── app
  │    └── server
  │        ├── middleware
  │        └── services
  └── coverage
        └── lcov-report
  └── postman
```

## Installation

   `git clone git@github.com:sandman45/node-starter-project.git`
   
   `npm install`
    
## Run
    
   `npm start`
   navigate to localhost:3000 and you will see your app running
## Configuration

using 'https://docs.npmjs.com/cli/config' for configuration

You will add your different configurations in these files.  Add a stage.json or production.json if needed for your app.

'config/default.json'

'config/dev.json'
    
```json
{
  "cryptoKey": "1234567891011121",
  "host": "http://127.0.0.1",
  "port": 3000,
  "mysql": {
    "database": {
      "host": "66.147.240.97",
      "user": "lightsan_test",
      "password": "T7QJ;.Zdsw.I",
      "database": "lightsan_test_database",
      "port": 3306,
      "connectionLimit": 6
    }
  },
   "aws": {
      "s3" :{
        "accessKeyId": 12345,
        "secretAccessKey": 12345
      }
    },
  "roles": ["Admin"],
  "role_prefix": "Admin_",
  "jwt": {
    "algorithm": "HS256",
    "expiresIn": "2 days"
  }
}
```
## Environment Variables
    
Setting the NODE_ENV = dev will tell your app to use the dev.json config file.
    
    `NODE_ENV=dev`

## Testing

To test the application `npm test` or `npm run cover` for code coverage

coverage report will be in the `coverage/lcov-report/index.html`.  Just open it up with your favorite browser.
 
## Endpoints

See `postman/` for collections to use in postman.  Import the collections and test the endpoints!
