Bun.serve({
  fetch(req,server) {
    if(server.upgrade(req)) {
      return new Response();
    }
    return new Response("Upgrade failed", { status: 500})
  },
  websocket: {
    open() {
      console.log("A new client connected");
    },
    close() {
      
    },
    message(ws, message) {
      console.log(message);
      ws.sendText("Hellof rom Bun WS")
    }
  }
})