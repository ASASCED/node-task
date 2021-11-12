var http = require("http");
const projects = require("./data-store");

const server = http.createServer(async (req, res) => {
  if (req.url.match(/\/projects\/([0-9]+)/) && req.method === "GET") {
    const idx = req.url.split("/")[2];
    console.log(idx);
    const found = projects.find(({ id }) => id === Number(idx));

    if (!found) {
      incorretRequest(res);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(found));
  } else {
    incorretRequest(res);
  }
});

function incorretRequest(res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
}

server.listen(8000, () => {
  console.log("server started on port: 8000");
});

module.exports = server;
