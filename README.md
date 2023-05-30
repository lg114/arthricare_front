# Arthricare Web Application

## Summary
ArthriCare is an interactive web application to help arthritis patients manage their medication and health.<br>
Here is the front-end team repository.<br>
Coding languages: HTML & JAVASCRIPT & VUE

## Dependencies
### Main Dependencies
1. Element Plus v2.3.5 https://element-plus.org/en-US/ (UI component library)
2. axios v1.4.0 https://axios-http.com/ (HTTP request library)
3. Vue-router v4.2.2 https://github.com/vuejs/router#readme (Official Route Manager)
### Development dependencies
1. @babel/core v7.22.1 https://babel.dev/docs/babel-core 
2. @babel/eslint-parser v7.21.8 https://babel.dev/
3. eslint v7.32.0 https://eslint.org/
4. eslint-plugin-vue v8.7.1 https://eslint.vuejs.org/
5. @vue/cli-plugin-babel v5.0.0
6. @vue/cli-plugin-eslint v~5.0.0
7. @vue/cli-service v5.0.0
8. unplugin-auto-import v0.16.3
9. unplugin-vue-components v0.24.1

## Website
https://lg114.github.io/arthricare/

## Project setup
### Prepare your environment
1. Install Node.js if it's not already installed on your system. Visit the link provided on the installation page for your system(https://nodejs.org/en).<br>We using node.js v18.16.0 and npm v9.5.1
2. Clone this application into your computer as 'ArthriCare'.
3. In a terminal window or command prompt, cd into the folder where you cloned this application and run:
```
npm install
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

###
## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).