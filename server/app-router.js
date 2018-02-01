
class AppRouter {
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
            app.db.getModel('user').find({}).then(
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

module.exports = AppRouter;