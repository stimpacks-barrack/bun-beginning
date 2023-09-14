export type Todo = {
  id: number, 
  text: string 
}

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList(props: TodoListProps ) {
  return (
    <ul>
      { props.todos.length ? props.todos.map(todo => <Todo todo={todo} key={todo.id}/>) : "No items added"}
    </ul> 
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
      <button className="delete"> DELETE </button>
    </li>
  )
}