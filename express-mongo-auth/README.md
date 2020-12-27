# Express-Mongo-Auth
A minimalistic backend with token based authentication, built using Express and MongoDB.<br/>

You need to put the Mongo Atlas Cluster's connection string in a .env file with the environment variable as `MONGO_URI`. Run the following script to do so.

```
touch .env
echo "MONGO_URI=\'<CONNECTION_STRING>\'" >> .env
```
You will also have to put a `SECRET_OR_KEY` for the password encrypter. Run the following script to do so.
```
echo "\nSECRET_OR_KEYS = \'<SECRET_STRING>\'" >> .env
```
This setting up of the `.env` file is only required for development purposes. If hosting then you can set the aforementioned variables as environemnt variables.

To run the server 
```
DEBUG=express-mongo-auth:* nodemon server.js
```
In production you can run the server as follows
```
node server.js
```
By default the server would run on port 5000. But if you want to run it on a different port set the environment variable `PORT` as the port number you want. To do this in the .env file run this
```
echo "PORT=<PORT NUMBER>" >> .env
```