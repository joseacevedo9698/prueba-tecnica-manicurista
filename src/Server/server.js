import express  from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as Router from "../Router/index.js";
export default class Server {
    app;
    port;
    constructor() {
        dotenv.config();
        this.app = express();
        this.app.use(bodyParser.json());
        this.port = process.env.PORT;

    }
    static init () {
        return new Server();
    }

    start(callback){
        this.app.listen(this.port,callback());
        this.ConfigHeaders()
        this.Routes();
    }

    Routes(){
        this.app.use('/typeahead', Router.typeaheadRouter);

        this.app.get('*', function(req, res){
            res.status(404).json({message: "Not Found!"});
        });
        this.app.post('*', function(req, res){
            res.status(404).json({message: "Not Found!"});
        });
    }

    ConfigHeaders(){
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }
}