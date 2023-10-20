# Welcome to ArthriCare!

This is a web application to help arthritis patients manage their medication and health on mobile devices.

<img src="https://github.com/lg114/arthricare_front/assets/92200217/4c25d8f3-88d2-43c9-b65b-1cf6c795c2ca" width="500"/><br>

## About
The application aims to provide patients with a user-friendly platform that enables them to track their medications, access educational resources, and connect with other patients.<br>
Our team’s motivation for creating this app was to provide a convenient way for arthritis patients to better manage their medications and stay on top of their health.

## Language & Framework Used 
- Vue.js (https://vuejs.org/)
- Element Plus (https://element-plus.org/en-US/)
- Varlet (https://varlet.gitee.io/varlet-ui/?ref=madewithvuejs.com#/en-US/index)

## Build Status
The current version of ArthriCare works properly with functions like creating and taking medicine, collecting puzzles, sharing in the community, etc. More functions would be developed in the future.

## Features
- Medication tracking
- Educational resources access
- Community communication
- Puzzle collection

## Code Examples
<img src="https://github.com/lg114/arthricare_front/assets/92200217/d66576da-0a0d-4a6d-96e0-ba579d7f1e07" width="500"/>
<img src="https://github.com/lg114/arthricare_front/assets/92200217/f50074e1-262c-4099-b66e-933576fde486" width="500"/><br>

## Project setup
### Prepare your environment
1. Install Node.js if it's not already installed on your system. Visit the link provided on the installation page for your system(https://nodejs.org/en).<br>We using node.js v18.16.0 and npm v9.5.1
2. Clone this application into your computer as 'ArthriCare'.
3. In a terminal window or command prompt, cd into the folder where you cloned this application and run:
```
npm install
```
4. Install datepicker.
```
npm install @vuepic/vue-datepicker
```
### Compiles and hot-reloads for development
Run the following command in the directory where you cloned this application:<br>
When you run this command, it starts a development server, listening on the specified port, and compiles and refreshes your project code in real time.<br>
This allows you to make real-time modifications and previews during development.
```
npm run serve
```
### Compiles and minifies for production
Run the following command in the directory where you cloned this application:<br>
This command compiles, packages and optimizes the source code to generate static files for the production environment
```
npm run build
```

### Lints and fixes files
Run the following command in the directory where you cloned this application:<br>
A command to run a code style check
```
npm run lint
```

## Commit steps
Type the following commands step by step to push your code to the remote origin:<br>
**Please notice that it is very important to make sure everybody has a good developing experience, Testing everything works fine on your local network is necessary before pushing to the origin.**
```
git add .
```
```
git commit -m "your commit message"
```
```
git push origin main
```
## Deploy
```
npm run deploy
```
Now you should see the changes on the github website.

## Pull from Github
```
git pull origin main
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
