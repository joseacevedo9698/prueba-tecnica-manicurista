import express  from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import {typeaheadRouter} from '../Router';
export default class Server {
    public app: express.Application;
    public port: any;
    constructor() {
        dotenv.config();
        this.app = express();
        this.app.use(bodyParser.json());
        this.port = process.env.PORT;

    }
    static init () {
        return new Server();
    }

    start(callback: Function){
        this.app.listen(this.port,callback());
        this.ConfigHeaders()
        this.Routes();
    }

    Routes(){
        this.app.use('/typeahead', typeaheadRouter);

        this.app.get('*', function(req, res){
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