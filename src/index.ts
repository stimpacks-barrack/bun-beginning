import { ServeOptions } from "bun";
import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


const server = Bun.serve({
  hostname: "localhost",
  port: process.env.PORT,
  fetch: handler,
  error(error) {
    return new Response("oops error occurred!!")
  },
}) as ServeOptions

function  serveAsset(request: Request) {
  const filePath = new URL(request.url).pathname;
  const file = Bun.file(`${import.meta.dir}${filePath}`)

  if(file) {
    return new Response(file)
  }
  return new Response("Not Found", { status: 404});
}

function handler(request: Request): Response {
  const url = new URL(request.url);

  if(url.pathname.startsWith('/assets')){
    return serveAsset(request)
  }
  
  if(url.pathname === '' || url.pathname === '/')  {
    return new Response (Bun.file('index.html'));
  }
  return new Response("Not Found", { status: 404});
}

console.log(`Listening on http://${server.hostname}:${server.port}`)