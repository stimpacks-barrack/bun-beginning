// src/index.tsx
async function handler(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/assets")) {
    return serveAsset(request);
  }
  if (url.pathname === "" || url.pathname === "/") {
    return new Response(Bun.file("index.html"));
  }
  if (url.pathname === "/todos" && request.method === "POST") {
    const { todo } = await request.json();
    if (todo?.length) {
      todos.push({
        id: todo.length + 1,
        text: todo
      });
    }
    return new Response;
  }
  return new Response("Not Found", { status: 404 });
}
var serveAsset = function(request) {
  const filePath = new URL(request.url).pathname;
  const file = Bun.file(`${import.meta.dir}${filePath}`);
  if (file) {
    return new Response(file);
  }
  return new Response("Not Found", { status: 404 });
};
var server = Bun.serve({
  hostname: "localhost",
  port: Bun.env.PORT,
  fetch: handler,
  error(error) {
    console.log(error);
    return new Response("error \uBC1C\uC0DD");
  }
});
var todos = [];
