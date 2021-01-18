# Better.sg Food Carbon Calculator App

// todo: enter project description
### Setup

1) Install [yarn](https://classic.yarnpkg.com/en/docs/install) globally (if applicable)
2) Install [lerna](https://github.com/lerna/lerna) globally
`npm i --g lerna`
3) Clone repository.
4) Install dependencies (uses [lerna bootstrap](https://github.com/lerna/lerna/tree/main/commands/bootstrap) )
`yarn bootstrap`
---
### Run app (development mode)

#### Front-end React page
1) On the root directory, the following command will run CRA's start script.

    `yarn workspace @foodcarboncalculator/frontend start`

#### Back-end Node server
1) Ensure you have nodemon installed

    `npm install -g nodemon` or `yarn global add nodemon`

1) On the root directory, the following command will start the Node server with nodemon.

    `yarn workspace @foodcarboncalculator/backend start`
---
### Lint app

1) Check lint errors/warnings on `.js` and `.jsx` files.

    `yarn workspace @foodcarboncalculator/frontend lint:js`

1) Check lint errors/warnings on `.css` files.

    `yarn workspace @foodcarboncalculator/frontend lint:css`

1) Runs both `lint:js` and `lint:css`.

    `yarn workspace @foodcarboncalculator/frontend lint`

1) Fix possible lint errors.

    `yarn workspace @foodcarboncalculator/frontend lint:fix`

### Run unit tests (development mode)

`yarn workspace @foodcarboncalculator/frontend test`

-----

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# foodcarboncalculator
