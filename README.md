# Expense Management Web App
A basic full-stack application built using JavaScript

## Prerequisites
- [Node](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Tools
- [git](https://git-scm.com/)
- [vscode](https://code.visualstudio.com/)

## Install node_modules
```
yarn
```
- run this within `archa-exam` directory 

## Run
```
yarn start
```
- run this at `archa-exam` directory 
- client will run at port `3000` 
- server will run at port `3200`

## Test
```
yarn workspace client test
yarn workspace client test:ui
```
- client-side only

## Dependencies

### Monorepo
- [concurrently](https://www.npmjs.com/package/concurrently)

### Client
- [React](https://react.dev/reference/react) 
- [MUI](https://v6.mui.com/material-ui/getting-started/) - component library
- [Vite](https://vite.dev/guide/) - build tool
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - data/state management
- [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Axios](https://axios-http.com/docs/intro) - for HTTP requests
- [Notistack](https://notistack.com/) - for toasts/snackbar
- [Vitest](https://vitest.dev/guide/) - testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Server
- [Express](https://expressjs.com/) - node framework
- [Joi](https://www.npmjs.com/package/joi) - validation
