export type Todo = {
    id: number, 
    text: string 
}

interface TodoListProps {
    todos: Todo[];
}

export default function TodoList({todos}: TodoListProps) {
    return (
        <ul>{todos.length ? todos.map(todo => <Todo todo={todo} key={todo.id}/>) : "투두가 존재하지 않습니다."}</ul>
    )
}

function Todo({todo}: {todo: Todo}) {
    return (
        <li className="todo">
            <input 
            id={`todo_check_${todo.id}`}
            className="checkbox" 
            name={`todo_check_${todo.id}`} 
            type="checkbox"
            />
            <label htmlFor={`todo_check_${todo.id}`} className="todo_check">
                {todo.text}
            </label>
            <button 
            hx-delete={`/todos/${todo.id}`} 
            className="delete"
            hx-target="#todos"
            >
                DELETE 
            </button>
        </li>
    )
}