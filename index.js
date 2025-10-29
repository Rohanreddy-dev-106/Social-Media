import express from "express";
import cookieParser from "cookie-parser";
import CORS from "cors";
import fs from "fs";
import swaggerUI from "swagger-ui-express";
import Userrouts from "./src/fetures/users/routes/user.routes.js"
import Postrouts from "./src/fetures/posts/routes/post.routs.js"
import Likes from "./src/fetures/Likes/routes/like.routs.js"
import Followers from "./src/fetures/followers/routes/follower.routs.js"

let server = express();
server.use(express.json())
server.use(cookieParser())
server.use(express.static("public"));
const data = JSON.parse(fs.readFileSync("./swagger.json", 'utf8'));
const corsoptions = {
  origin: "http://127.0.0.1:3000", 
    credentials: true,               
}
server.use(CORS(corsoptions))



server.use("/api-doc-socialmedia",swaggerUI.serve,swaggerUI.setup(data))
server.use("/api/users", Userrouts)
server.use("/api/posts", Postrouts)
server.use("/api/posts", Likes)
server.use("/api/follow",Followers)
// server.use("/api/card")

server.use((req, res, next) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 Not Found</title>
      <!-- Bootstrap CSS CDN -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
      <div class="alert alert-danger" role="alert">
        Page not found (404) so please check our API docs /api-doc-socialmedia
      </div>
    </body>
    </html>
  `);
});

export { server }