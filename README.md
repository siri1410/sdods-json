# Next.js on Firebase App Hosting

This is an example [Next.js](https://nextjs.org/) project to demonstrate SSG,
SSR, and ISR on [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy to Firebase App Hosting

### 1. Get your project set up on GitHub

[Create a new GitHub repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) and push the newly-initialized sample code to it:

<pre>
git remote add origin https://github.com/<b>$YOUR_NEW_REPOSITORY</b>.git
git branch -M main
git push -u origin main
</pre>

### 2. Set up Firebase App Hosting

Continue to [Get started with Firebase App Hosting](https://firebase.google.com/docs/app-hosting/get-started#step-1:).



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

Do you want to deploy now? Yes i You may also track this rollout at: https://console.firebase.google.com/project/sdods-json/apphosting ⠼ Starting a new rollout; this may take a few minutes. It's safe to exit now.

