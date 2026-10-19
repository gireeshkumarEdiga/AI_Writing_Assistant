const dotenv = require("dotenv");
dotenv.config({path : "./.env"});

const dbconfig = require("./Config/dbConfig");

const server = require("./app");

const PORT = Number(process.env.PORT_NUMBER) || 8000;

server.listen(PORT,() => {
    console.log("Server is Running on PORT "+PORT);
});