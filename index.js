import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const port = 8000;

// create an instance of express to serve our end points
const app = express();

app.use((req, res, next) => {
    console.log(`* ${req.method} -- ${req.path}.`);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', 86400);
    next();
    return;
});

// this is where we'll handle our various routes from and
// return an Express router
const router = jsonServer.router('./data/db.json');

// app.use('/', router);

// bind the router property db to the created app
app.db = router.db;

// Set default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults();

// rewrite certain routes
const rules = auth.rewriter({
    // Permission rules
    // "/featured_products*": "/444/featured_products$1",
    products: 444,
    featured_products:444,
    orders: 660,
    users: 600
});

app.use(rules);
app.use(auth);
app.use(middlewares);
app.use(router);

// finally, launch our server on port 8000
var server = app.listen(port, err => {
    if (err) {
        console.log(`JSON server error: ${err}`);
        return;
    }
    console.error(`JSON server listening on ${server.address().port}`);
});
