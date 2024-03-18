const server = Bun.serve({
  async fetch(req) {
    let path = new URL(req.url).pathname;

    console.log(`GET ${path}`);

    if (path.startsWith("/ccapi")) {
      return fetch("http://192.168.1.60:8080" + path);
    }

    if (!path || path === "/") {
      path = "/index.html";
    }

    const file = Bun.file(`.${path}`);

    if (await file.exists()) {
      return new Response(file);
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);
