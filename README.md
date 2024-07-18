## Snippet
- For this part of the course, the focus it shifted towards the **backend**.  \
- We will implement a simple REST API in **Node.js** by using the **Express** library. \
- The application's data will be stored in a **MongoDB** database. \
- We will deploy our application to the internet through **Render**.
  
**Link:** https://fullstackopen-zwjr.onrender.com

## Notes
### Add npm run scripts to `package.json` file
```
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:ui": "@powershell Remove-Item -Recurse -Force dist && cd ../frontend && npm run build && @powershell Copy-Item dist -Recurse ../backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push",
    "lint": "eslint ."
  }
```
