# CONFIGURATOR

Centralize and Management configurations of all your applications.

![logo](./logo/logo.png)

# Requirements

- Node.js > 8.*
- Mysql database. You could use [docker](https://gist.github.com/jrichardsz/73142c5c7eb7136d80b165e75d3a1e22)
- Create a database and execute this ddl to create the required tables: [./database/ddl.sql](./database/ddl.sql)

# Getting Started

## Environment variables:

```
export PORT=8080
export CONFIGURATOR_DATABASE_HOST=localhost
export CONFIGURATOR_DATABASE_USER=root
export CONFIGURATOR_DATABASE_PASSWORD=secret
export CONFIGURATOR_DATABASE_PORT=3306
export CONFIGURATOR_DATABASE_NAME=configurator
export API_KEY=changeme
```

## Developer Mode

```
npm install
npm run dev
```

## Production Mode

```
npm install
npm run start
```

# Usage

Open your browser pointing at:

- http://localhost:2708

> Note: Admin password will be showed in the server log.

If no errors, you will see:

![home](./logo/home.png)

# Users

By default two user are created:

- admin with admin role
- guest with reader role

Password are printed in the first log. Take care to delete them of the log!!. If you are using docker, [this](https://stackoverflow.com/a/42510314/3957754) works.

Admin can make anything. Guest user only can enter to few options and can't view secrets values.


# Get variables

If you have created an app called **helicarrier-api** with at least one variable, this is how can we get its variables:

```
curl localhost:2708/api/v1/variables?application=helicarrier-api -H "apiKey:changeme"
```

response will be

```
export ERP_HOST="12.124.1.6"
export firebase_key="65468748"
```

These variables must be launched in the remote server in which **helicarrier-api** will run. 

This is how [heroku](https://devcenter.heroku.com/articles/config-vars) works.

# Docker

Follow this [guide](https://github.com/software-architect-tools/configurator/wiki/Launch-with-Docker)

# Roadmap

- [ ] add http endpoint to get variables in json format
- [ ] add changelog column for each app or variable
- [ ] add easy import/export feature
- [ ] add dependency injection
- [ ] unit tests/selenium tests
- [ ] java and nodejs libraries to be used in application as **configurator client**
- [ ] solve/implement [issues](https://github.com/software-architect-tools/configurator/issues)


# Made with

- Node.js
- Mysql
- Web template engine for fast development: https://www.npmjs.com/package/pug
- Bootstrap template: https://adminlte.io/
- Handlebars Engine : https://handlebarsjs.com/builtin_helpers.html
- Initial template : https://github.com/jayetan/Nodejs-Admin-Dashboard.git


# Contributors

Thanks goes to these wonderful people :

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">Richard Leon</a></label>
      <br />
    </td>    
  </tbody>
</table>
