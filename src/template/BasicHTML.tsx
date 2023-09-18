export const HTML = ({children}: {children: JSX.Element}) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8"/ >
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>BUN X HTML TODO LIST</title>
                <script src="https://unpkg.com/htmx.org@1.9.5"></script>
                <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
                <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
                <link rel="stylesheet" href="https://unpkg.com/open-props"/>
                <link rel="stylesheet" href="assets/index.css"/>
            </head>
            <body
            >
                <header className="header">
                    <hgroup>
                        <h1>Bun X HTMX TODO LIST</h1>
                    </hgroup>
                </header>
                <main className="container">
                    <form
                        hx-boost="true"
                        action="/todos"
                        method="POST"
                        hx-target="#todos"
                        hx-ext="json-enc"
                        // @ts-expect-error
                        _="on submit target.reset()"
                    >
                        <label htmlFor="todo">New Todo</label>
                        <input id="todo" name="todo" type="text" placeholder="New todo"/>
                        <button type="submit">Create</button>
                    </form>
                    <section 
                        id="todos"
                        hx-get="/todos"
                        hx-trigger="load"
                    >
                        {children}
                    </section>
                </main>
            </body>
        </html>
    )
}