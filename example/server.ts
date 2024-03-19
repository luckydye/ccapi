import { resolve } from "node:path";
import logger from "@luckydye/log";

const log = logger();

type RequestHandler = (req: Request) => Promise<Response | undefined>;

const ccapiCache = new Map<
  string,
  {
    type: string;
    data: Blob;
  }
>();

async function ccapi(req: Request) {
  const url = new URL(req.url);
  if (url.pathname.startsWith("/ccapi")) {
    const cacheKey = `${url.pathname}${url.search}`;

    if (!ccapiCache.has(cacheKey)) {
      log.info("Cach miss", "key", cacheKey);

      const res = await fetch(
        `http://192.168.1.60:8080${url.pathname}${url.search}`,
      );

      if (!res.ok) {
        log.error(
          "CCAPI Error",
          "status",
          res.status,
          "statusText",
          res.statusText,
        );
        return new Response("CCAPI Error", { status: 500 });
      }

      const type =
        res.headers.get("Content-Type") || "application/octet-stream";
      const blob = await res.blob();

      ccapiCache.set(cacheKey, {
        type,
        data: blob,
      });
    }

    const data = ccapiCache.get(cacheKey);
    if (data)
      return new Response(data.data, {
        status: 200,
        headers: {
          "Content-Type": data.type,
        },
      });
  }
}

async function files(req: Request) {
  const url = new URL(req.url);

  const filePath =
    url.pathname === "/"
      ? "./example/index.html"
      : resolve(`./${url.pathname}`);

  const file = Bun.file(filePath);

  if (await file.exists()) {
    return new Response(file);
  }
}

function start(hostname: string, handlers: RequestHandler[]) {
  return Bun.serve({
    hostname,
    async fetch(req) {
      const url = new URL(req.url);

      log.info("GET", "path", url.pathname);

      for (const handler of handlers) {
        const response = await handler(req);
        if (response) return response;
      }

      return new Response("Not found", { status: 404 });
    },
  });
}

const server = start("127.0.0.1", [ccapi, files]);
log.info("Server listening", "url", server.url);
