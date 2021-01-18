# `@foodcarboncalculator/backend`

## Start up backend server

1) Ensure you have nodemon installed

    `npm install -g nodemon` or `yarn global add nodemon`

1) On the root directory, the following command will start the Node server with nodemon.

    `yarn workspace @foodcarboncalculator/backend start`

## Base URL

All requests are to be made to this base URL

`http://localhost:3000/api/v1`

## Test that application is started

- `/test`

    Method: `GET`
    
    Expected response: `200 test: Test Successful`

- `/dishes/test`

    Method: `GET`
    
    Expected response: `200 test: Dishes test Successful`
    
- `/diary/test`

    Method: `GET`
    
    Expected response: `200 test: Diary test Successful`
