import { ServeOptions } from "bun";
import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


Bun.serve({
  fetch(request: Request) {
    const url = new URL(request.url);
    throw new Error("bad request");
    // return new Response(url.href);
  },
  error(error) {
    console.log(error);
    return new Response("oops error occurred!!")
  },
}) as ServeOptions
