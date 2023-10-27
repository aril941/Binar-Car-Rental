const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const { PORT = 3000 } = process.env;
const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

function getHtml(page) {
  const htmlFilePath = path.join(PUBLIC_DIRECTORY, `${page}.html`);
  return fs.readFileSync(htmlFilePath, "utf-8");
}

function getStaticFiles(staticFile) {
  const staticFilePath = path.join(PUBLIC_DIRECTORY, staticFile);
  return fs.readFileSync(staticFilePath);
}

function router() {
  const routes = {
    get: () => {},
    post: () => {},
  };

  const get = (path, callback) => {
    /**
     ** Rute yang ditentukan dalam path akan menjadi properti dalam objek routes.get, dan
     ** fungsi callback akan menjadi nilai dari properti tersebut.
     */
    routes.get[path] = callback;
  };

  const post = (path, callback) => {
    routes.post[path] = callback;
  };

  return {
    get,
    post,
    routes,
  };
}

const appRouter = router();

appRouter.get("/", (req, res) => {
  const pageContent = getHtml("index");
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(pageContent);
});

appRouter.get("/cars", (req, res) => {
  const pageContent = getHtml("cars");
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(pageContent);
});

appRouter.get("/search", (req, res) => {
  const pageContent = getHtml("search");
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(pageContent);
});

const server = () => {
  return (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    const isCss = pathname.includes("/css");
    const isJs = pathname.includes("/scripts");
    const isImages = pathname.includes("/images");

    /**
     ** Jika permintaan adalah metode HTTP GET ("GET") dan ada rute yang sesuai dalam
     ** appRouter, maka server akan menjalankan callback yang sesuai sesuai dengan rute
     ** tersebut. Jika path adalah "/", maka callback pertama dijalankan
     */

    if (req.method === "GET" && appRouter.routes.get[pathname]) {
      appRouter.routes.get[pathname](req, res);
    } else if (req.method === "GET" && (isCss || isJs)) {
      res.setHeader("Content-Type", (isCss && "text/css") || (isJs && "text/javascript"));
      res.writeHead(200);
      res.end(getStaticFiles(pathname));
    } else if (req.method === "GET" && isImages) {
      res.writeHead(200);
      res.end(getStaticFiles(pathname));
    } else {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(404);
      res.end(getHtml("404"));
    }
  };
};

http.createServer(server()).listen(PORT, "localhost", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
