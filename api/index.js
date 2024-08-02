const express = require("express");
const app = express();
const path = require("path")
//const serverless = require("serverless-http")

app.get("/hi", (req, res) => res.send("Express on Vercel"));
// Serve static files from the dist directory
const clientBuildPath = path.join(process.cwd(), 'dist');
app.use(express.static(clientBuildPath));

// Serve static files from the 'public' directory
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Serve the index.html file for the /home route
app.get('/', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html')); 
});

app.listen(3000, () => console.log("Server ready on port 3000."));

// const handler = serverless(app);
// module.exports.handler = handler;