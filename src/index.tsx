import { ServeOptions } from "bun";
// import { Elysia } from "elysia";
import { renderToString } from "react-dom/server";
import TodoList from "./components/TodoList";

// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );


type Todo = { id: number, text: string }
let todos: Todo[] = [{id:0, text: "안녕하세요"}];

const server = Bun.serve({
  hostname: "localhost",
  port: process.env.PORT,
  fetch: handler,
  error() {
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

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if(url.pathname.startsWith('/assets')){
    return serveAsset(request)
  }

  if(url.pathname === "/todos" && request.method === "POST") {
    const { todo } = await request.json();
    
    if(!todo?.length) return new Response('Invalid input', { status: 400})

    todos.push({
      id: todos.length + 1,
      text: todo,
    })

    return new Response(renderToString(<TodoList todos={todos} key={todo.id}></TodoList>))
  }

  if(url.pathname.startsWith("/todos") && request.method === "DELETE") {
    const todoId = url.pathname.match(/\/todos\/(\d+)/)?.[1];
    todos = todos.filter( todo => todo.id.toString() !== todoId)
    return new Response(renderToString(<TodoList todos={todos}></TodoList>));
  }

  if(url.pathname === "/todos" && request.method === "GET") {
    return new Response(renderToString(<TodoList todos={todos}></TodoList>));
  }

  if(url.pathname === '' || url.pathname === '/')  {
    return new Response (Bun.file('index.html'));
  }
  return new Response("Not Found", { status: 404});
}

console.log(`Listening on http://${server.hostname}:${server.port}`)


