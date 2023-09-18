import { renderToString } from "react-dom/server";
import { ServeOptions } from "bun";
import TodoList , { type Todo } from "./components/TodoList"
const server = Bun.serve({
  hostname: "localhost",
  port: Bun.env.PORT,
  fetch: handler,
  error(error) {
    console.log(error);
    return new Response("error 발생")
  }
}) as ServeOptions



let todos: Todo[] = [
  { id: 1, text: "딜리트 키를 눌러서 삭제할 수 있습니다."}
];

async function handler(request: Request) {
  const url = new URL(request.url);  

  if(url.pathname.startsWith('/assets')) {
    return serveAsset(request);
  }

  if(url.pathname === "" || url.pathname === "/") {
    return new Response(Bun.file('index.html'))
  }

  if(url.pathname === "/todos" && request.method === "POST") {
    const { todo } = await request.json();
    
    if(todo?.length) {
      todos.push({
        id: todo.length + 1,
        text: todo
      })
    }

    return new Response(
      renderToString(
        <TodoList todos={todos}/>
      )
    )
  }


  if(url.pathname.startsWith("/todos") && request.method === "DELETE") {
    const todoId = url.pathname.match(/\/todos\/(\d+)/)?.[1]
    todos = todos.filter( todo => todo.id.toString() !== todoId)
    return new Response(renderToString(<TodoList todos={todos}/>))
  }

  if(url.pathname === "/todos" && request.method ===  "GET") {
    return new Response(
      renderToString(<TodoList todos={todos}/>)
      )
  }

  return new Response("Not Found", {status: 404})
}

function serveAsset(request: Request) {
  const filePath = new URL(request.url).pathname;
  const file = Bun.file(`${import.meta.dir}${filePath}`)

  if(file) {
    return new Response(file);
  }

  return new Response("Not Found", {status: 404});
}

console.log(`Listening on http://${server.hostname}:${server.port}`)