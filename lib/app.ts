import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { mongoURI } from "./config/keys";
import { Routes } from "./routes/crmRoutes";


class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = mongoURI;
    

    constructor(){
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        //suport application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-url-encoded post data
        this.app.use(bodyParser.urlencoded({extended: false}));

    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;