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


Deployment to Firebase: npm init @apphosting firebase projects:list firebase apphosting:backends:create --project sdods-json --location us-central1 json-editor % npm install -g firebase-tools

changed 633 packages in 34s

70 packages are looking for funding run npm fund for details npm notice npm notice New minor version of npm available! 10.7.0 -> 10.8.3 npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.8.3 npm notice To update run: npm install -g npm@10.8.3 npm notice (base) firebase apphosting:backends:create --project sdods-json --location us-central1 i === Import a GitHub repository i To create a new GitHub connection, Secret Manager Admin role (roles/secretmanager.admin) is required on the Developer Connect Service Agent. ? Grant the required role to the Developer Connect Service Agent? Yes i apphosting: generating the service identity for developerconnect.googleapis.com... ✔ Successfully granted the required role to the Developer Connect Service Agent!

i Please authorize the Firebase GitHub app by visiting this url: i http://localhost:9005 ? Press Enter once you have authorized the GitHub App. ✔ Connected with GitHub successfully

? Which GitHub account do you want to use? siri1410 ? Which GitHub repo do you want to deploy? Missing a repo? Select this option to configure your GitHub connection settings i Manage the Firebase App Hosting GitHub app to enable access to GitHub repositories i https://github.com/settings/installations/53447928 ? Press Enter once you have installed or configured the Firebase App Hosting GitHub app to access your GitHub repo. ? Which GitHub repo do you want to deploy? Missing a repo? Select this option to configure your GitHub connection settings i Manage the Firebase App Hosting GitHub app to enable access to GitHub repositories i https://github.com/settings/installations/53447928 ? Press Enter once you have installed or configured the Firebase App Hosting GitHub app to access your GitHub repo. ? Which GitHub repo do you want to deploy? siri1410/sdods-json ? Specify your app's root directory relative to your repository / ? Pick a branch for continuous deployment main ✔ Repo linked successfully!

i === Set up your backend ? Provide a name for your backend [1-30 characters] sdods-json-backend ✔ Name set to sdods-json-backend

✔ Created a new Firebase web app named "sdods-json-backend" ✔ Successfully created backend! projects/sdods-json/locations/us-central1/backends/sdods-json-backend

? Do you want to deploy now? Yes i You may also track this rollout at: https://console.firebase.google.com/project/sdods-json/apphosting ⠼ Starting a new rollout; this may take a few minutes. It's safe to exit now.

