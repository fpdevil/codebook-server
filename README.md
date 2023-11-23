# Codebook Mock server
This server provides the backend for the portal `https://ecodebook.netlify.app`. Ideally, the portals will have a datasource via some backend database, but this being a demonstration portal can utilize the mock server built using the below:

- `json-server`
- `json-server-auth`

During development on the local machine, the instance is run as a standalone process as shown below:

```sh
json-server --watch data/db.json -m ./node_modules/json-server-auth -r data/routes.json --port 8000

  \{^_^}/ hi!

  Loading data/db.json
  Loading data/routes.json
  Loading ./node_modules/json-server-auth
  Done

  Resources
  http://localhost:8000/products
  http://localhost:8000/feautured_products
  http://localhost:8000/orders
  http://localhost:8000/users

  Other routes
  /products* -> /444/
  /feautured_products* -> /444/
  /users* -> /600/
  /orders* -> /660/

  Home
  http://localhost:8000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

The actual data served through a local `json` file store is `db.json` and the url rewrite rules are written in `routes.json`.
