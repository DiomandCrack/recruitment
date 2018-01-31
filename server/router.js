const Database = require('./database');
const database = new Database();
database.connect();
class Router {
    constructor(app) {
        this.app = app;
        this.setUpRouter();
    }
    setUpRouter() {
        const app = this.app
            /* 
            @method:GET
            @endpoint:/
            */
        app.get('/', (req, res) => {
            res.send('Hello world');
        });

        /*
        @method:POST
        @endpoint:/data
        */
        app.get('/data', (req, res, next) => {
            database.findUser({}).then(
                (users) => {
                    res.json(users)
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            );

        });
    }
}