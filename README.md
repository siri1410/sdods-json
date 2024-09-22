
# Json Triage Editor

## Overview

JSON Triage Editor is a powerful and user-friendly web application designed to help you visualize, edit, and filter JSON data effortlessly. Built with React, it leverages the capabilities of JSONPath to provide advanced querying and manipulation of JSON structures.

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

Bonus Tip:

### 3. Deployment to Firebase

1. Initialize Firebase Hosting:
    ```bash
    npm init @apphosting
    ```

2. List Firebase projects:
    ```bash
    firebase projects:list
    ```

3. Create a new backend:
    ```bash
    firebase apphosting:backends:create --project sdods-json --location us-central1 json-editor
    ```

4. Install Firebase tools:
    ```bash
    npm install -g firebase-tools
    ```

5. Authorize Firebase GitHub app:
    - Visit the URL provided by the Firebase CLI to authorize the GitHub app.
    - Press Enter once you have authorized the GitHub App.

6. Link your GitHub repository:
    - Select your GitHub account and repository.
    - Specify your app's root directory and branch for continuous deployment.
    - Confirm the repository link.

7. Set up your backend:
    - Provide a name for your backend (e.g., `sdods-json-backend`).
    - Confirm the backend creation.

8. Deploy your app:
    - Confirm the deployment when prompted.
    - Track the rollout at the Firebase console.
  
    - firebase emulators:start // for local testing
    - firebase hosting:channel:deploy sdods-json-backend

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

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

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/your-username)

---

Thank you for using JSON Editor! Your support is greatly appreciated.
