# TypeScript-Mongo-Express-React-Node

based on
https://github.com/Fabianopb/create-mern-ts-app/tree/master/template

Typescript MERN stack
Features:
- frontend and backend in the same project
- [authentication/login with JWT](#login-and-auth)
- [mongoose](#mongoose)
- [CI with Travis](#travis-ci)
- [.env config](#env-config)
- [seed data](#seed-data)
- [prettier](#prettier)
- [tslint](#tslint)
- [server tests](#server-tests)
- [client tests](#client-tests)
- [Shared Types](#shared-types)
- [Public API](#public-api)
- [Material-UI](https://material-ui.com/getting-started/usage/)

## login and auth
![Login page](https://user-images.githubusercontent.com/514002/60385800-812c4200-9a85-11e9-9bee-7128ca6200c6.png)

## seed data
![Sample data](https://user-images.githubusercontent.com/514002/60385782-580bb180-9a85-11e9-8143-f4ffba04e5a6.png)

A typescript file contains some seed data in [backend/data/testData.ts](backend/data/testData.ts)
This will get reloaded at startup, and there's a button in the UI to force reload too


# Quick Start

## env config
Add a .env file in your `backend/.env` with app configuration and environemnt variables

See the [backend/.env.example](backend/.env.example).

this will be .gitignore'd so you can put passwords, dbname etc in here

change the variables for security


## running the app
in top level

    yarn start

client is now running on http://localhost:5555/

this will start client with webpack proxy, and server apps using [concurrently](https://www.npmjs.com/package/concurrently)

ctrl-C to stop

OR you can start client and server separately, using two separate console windows.

    cd frontend; yarn start
    cd backend; yarn start

## ports
the client web proxy needs to match the port set in the backend .env file
you can change the proxy target port in [frontend/package.json](frontend/package.json)

    "proxy": "http://localhost:60010"

and the port the webpack server is accessible from

    "start": "PORT=5555 react-scripts start"

and the server port in [backend/.env](backend/.env)

# Details

## mongoose
Using [Mongoose](https://mongoosejs.com) as the manager for MongoDB.
You need to create schemas for each model eg like
[backend/server/items/item.model.ts](backend/server/items/item.model.ts)
And also an interface to address that model in [types/index.d.ts](types/index.d.ts)

## tslint
I made some tslint changes to my style

    "semicolon": [true, "never"],
    "quotemark": [false, "double"]

if you want to change them back you can do this throughout the app:

    npx tslint -p tsconfig.json --fix

quotes are a pain, there's much example code out there using single-quotes, so I made it not to be an error, but prettier will change to double quotes before a commit.

## prettier
prettier is also in the app, as a pre-commit hook.
you can run this manually from toplevel. this will fix quotes, tabs, newlines etc.

    yarn pretty

be careful to change both `tslint.json` and `.pretterrc` to be use the same or the commit hook will change back all your single quotes :D. In fact maybe we don't need both but prettier is a bit better at handling some types of reformatting.

I recommend turning on 'format on save' in your editor too which I have in [vscode/settings](.vscode/settings.json)

https://github.com/prettier/prettier-vscode#format-on-save


## travis-CI
Is setup. If you move this repo, you'll have to change the settings and the URL in the below:

https://travis-ci.com/dcsan/ts-mern/builds

[![Build Status](https://travis-ci.com/dcsan/ts-mern.svg?token=9w3pxxaLLZ6HFREoEdLa&branch=master)](https://travis-ci.com/dcsan/ts-mern)


## client tests
Look at [frontend/src/App.test.tsx](frontend/src/App.test.tsx)

Tests are using enzyme selectors, eg to fake clicking a button with id `#fetchDataButton`

    wrapper.find("#fetchDataButton").simulate("click")


## server tests

    cd backend
    yarn test:watch

also `yarn coverage` to see your test coverage


## Public Api
If you want to expose a public API without autho or login, or working on some other client without web login like a mini-program, you can use a plain endpoint without auth. there's an example here
http://localhost:60010/api/meals/ext

![look-ma-no-auth](https://user-images.githubusercontent.com/514002/60386861-d589ee80-9a92-11e9-8d24-c003205d0ea9.png)

## Shared types
There are types in the top level of the app in types/index.ts
This means they can be shared between client and server.

This is actually a package and there are links in the client and server to use it so there is no need to import into any files. Neat!

    "@types/app-shared-types": "link:../types",


----

# Original authors notes

Thanks to [@Fabianopb](https://github.com/Fabianopb) for most of the hard work here!

[README](https://github.com/Fabianopb/create-mern-ts-app/tree/master/template)

This is a starter kit for a fullstack application configured to use [Express](http://expressjs.com/) and [MongoDB](https://www.mongodb.com/) in the backend, and [React](https://reactjs.org/) in the frontend, all written in [TypeScript](https://www.typescriptlang.org/). The backend is built with [webpack](https://webpack.js.org/) (configuration inspired from [here](https://github.com/anthillsolutions/api-skel)), and the frontend was bootstraped with [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript).

This starter kit includes test configuration and a couple test examples using [Jest](https://jestjs.io/), as well as minimum set up to run your tests in [Travis CI](https://travis-ci.com/) and to deploy to [Heroku](https://www.heroku.com/).

## Running it locally

Run your mongo instance locally, as for example:

```
$ sudo mongod --dbpath /data/test/ --port 27017
```

Notes: this is important to be done before installing the dependencies so the script to populate the database with sample data can connect to mongo.

Create a `.env` file with the authentication secret in the root of the backend folder (check `backend/.env.example`).

```
AUTH_SHARED_SECRET=my-auth-shared-secret-hash-here
```

Install dependencies:

```
$ yarn install
```

Launch the application:

```
$ yarn start
```

## Creating endpoints in your API

The backend is structured by routes. Initially we have `items` and `users`, and inside of each we have the respective `model`, `controller`, and `tests`.

Say you want to create an endpoint to manage your favorite restaurants. you can then create the following structure under the `backend/server/restaurants` folder:

```
backend/server/restaurants/
│── restaurant.model.ts
│── restaurants.controller.ts
└── restaurants.test.ts
```

The `model` is a [Mongoose](https://mongoosejs.com/) model, and it contains the schema for your object and its methods if necessary.

The `controller` consists of your endpoints, where you define what actions your user will be able to perform, like creating, reading, updating, and deleting entries. _Notice that if you use the `authorize` middleware preceding your endpoint's callback it will be a private route. In other words, the user will only be able to interact with that endpoint if he has a valid token (if he is authenticated)._

Example of a private endpoint. If you remove `authorize` this will be a public endpoint.

```ts
router.route("/").get(authorize, async (request, response) => {
  const items = await Item.find();
  return response.status(200).json(items);
});
```

## Testing the backend

For testing the backend we use a combination of `jest`, `supertest`, and `mongodb-memory-server`.

It's important to start an instance of `MongodbMemoryServer` (an in-memory version of Mongo run only during tests so you don't interact with your real database when testing) before the tests start. Also don't forget to clean up the in-memory database, disconnect, and close your mocked connections.

If you test for authenticated routes you need a valid token, which can be aquired for example in the `beforeAll` method.

You can see examples for all of that in `items.test.ts` and `users.test.ts`.

## React with TypeScript

Say goodbye to PropTypes, and welcome TypeScript!

A class component receiving props and containing local state can be written like this:

```ts
type MyComponentState = {
  isOpen: boolean;
  value: number;
};

type MyComponentProps = {
  name: string;
  callback: () => void;
};

class MyClassComponent extends React.Component<MyComponentProps, MyComponentState> {
  state = {
    isOpen: true,
    value: 0
  };

  public render() {
    return (
      // your JSX here...
    );
  }

  private myPrivateMethod = (data: string): void => {
    // do something in your private method...
  };
}
```

In the other hand, a functional (presentational) component can be written like this:

```ts
type MyComponentProps = {
  name: string;
  callback: () => void;
};

const MyFuncComponent: React.SFC<MyComponentProps> = ({ name, callback }) => (
  // your JSX here...
);
```

## Sharing types

Just as a footnote it's very desirable to share types between your API and your frontend so both can _talk in the same language_. This could be achieved, for example, by creating a local `@type` module in the root that could be directly linked to each project via [yarn's link](https://yarnpkg.com/lang/en/docs/cli/link/).

## License
MIT