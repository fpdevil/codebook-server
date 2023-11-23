import jsonServer from "json-server";
import auth from "json-server-auth";

// set port numver
const port = 8000;

// create a server instance to serve our end points
const server = jsonServer.create();

// this is where we'll handle our various routes from and
// return an Express router
const router = jsonServer.router("./data/db.json");

// server.use('/', router);

server.use((req, res, next) => {
    console.log(`${req.method} ${req.path} -- HTTP ${req.httpVersion} ${req.ip}`);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', 86400);
    next();
    return;
});

// /!\ Bind the router db to the server
server.db = router.db;

// Set default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults();

// Permisssions Rewriter - custom rewriter for protected routes
const rules = auth.rewriter({
    // Permission rules
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600
});

// You must serverly the auth middleware before the router
server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);
server.listen(port, (err) => {
    if (err) {
        console.log(`JSON server error: ${err}`);
        return;
    }
    console.log(`json-server is running on port ${port}`);
});
