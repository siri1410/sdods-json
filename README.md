# JSON Editor

## Overview

JSON Editor is a powerful and user-friendly web application designed to help you visualize, edit, and filter JSON data effortlessly. Built with React, it leverages the capabilities of JSONPath to provide advanced querying and manipulation of JSON structures.

## Features

- **JSON Visualization**: Easily view and navigate through JSON data.
- **JSON Editing**: Modify JSON data directly within the application.
- **JSONPath Filtering**: Use JSONPath expressions to filter and query JSON data.
- **Suggested JSONPaths**: Automatically generate and select suggested JSONPath expressions.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/siri1410/json-editor.git
    cd json-editor
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Usage

1. **Load JSON Data**: Paste your JSON data into the provided textarea.
2. **Edit JSON Data**: Modify the JSON data directly in the textarea.
3. **Filter JSON Data**: Enter a JSONPath expression in the input field and click "Filter" to see the filtered results.
4. **Select Suggested JSONPath**: Use the dropdown to select from suggested JSONPath expressions.

### Example JSONPath Expressions

- `$..name` - Selects all names
- `$..amount` - Selects all amounts
- `$..transactions[?(@.length > 0)]` - Selects all transactions with size greater than 0
- `$..transactions[?(@.date > "2023-01-01")]` - Selects all transactions with a date after 2023-01-01
- `$[?(@.amount > 150)]` - Selects all items where the amount is greater than 150

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Deployment to Firebase:
npm init @apphosting
firebase projects:list
firebase apphosting:backends:create --project sdods-json --location us-central1
json-editor % npm install -g firebase-tools

changed 633 packages in 34s

70 packages are looking for funding
  run `npm fund` for details
npm notice
npm notice New minor version of npm available! 10.7.0 -> 10.8.3
npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.8.3
npm notice To update run: npm install -g npm@10.8.3
npm notice
(base)  firebase apphosting:backends:create --project sdods-json --location us-central1
i  === Import a GitHub repository
i  To create a new GitHub connection, Secret Manager Admin role (roles/secretmanager.admin) is required on the Developer Connect Service Agent.
? Grant the required role to the Developer Connect Service Agent? Yes
i  apphosting: generating the service identity for developerconnect.googleapis.com...
✔  Successfully granted the required role to the Developer Connect Service Agent!

i  Please authorize the Firebase GitHub app by visiting this url:
i       http://localhost:9005
? Press Enter once you have authorized the GitHub App. 
✔  Connected with GitHub successfully

? Which GitHub account do you want to use? siri1410
? Which GitHub repo do you want to deploy? Missing a repo? Select this option to configure your GitHub connection settings
i  Manage the Firebase App Hosting GitHub app to enable access to GitHub repositories
i  https://github.com/settings/installations/53447928
? Press Enter once you have installed or configured the Firebase App Hosting GitHub app to access your GitHub repo. 
? Which GitHub repo do you want to deploy? Missing a repo? Select this option to configure your GitHub connection settings
i  Manage the Firebase App Hosting GitHub app to enable access to GitHub repositories
i  https://github.com/settings/installations/53447928
? Press Enter once you have installed or configured the Firebase App Hosting GitHub app to access your GitHub repo. 
? Which GitHub repo do you want to deploy? siri1410/sdods-json
? Specify your app's root directory relative to your repository /
? Pick a branch for continuous deployment main
✔  Repo linked successfully!

i  === Set up your backend
? Provide a name for your backend [1-30 characters] sdods-json-backend
✔  Name set to sdods-json-backend

✔  Created a new Firebase web app named "sdods-json-backend"
✔ Successfully created backend!
        projects/sdods-json/locations/us-central1/backends/sdods-json-backend

? Do you want to deploy now? Yes
i  You may also track this rollout at:
        https://console.firebase.google.com/project/sdods-json/apphosting
⠼ Starting a new rollout; this may take a few minutes. It's safe to exit now.


### Additional Resources

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Troubleshooting](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Support

If you find this project useful, consider buying me a coffee:

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)]([https://www.buymeacoffee.com/your-username](https://buymeacoffee.com/sireeshyard
))

---

Thank you for using JSON Editor! Your support is greatly appreciated.
