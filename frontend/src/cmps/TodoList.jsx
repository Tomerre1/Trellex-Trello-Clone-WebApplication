import { TodoPreview } from './TodoPreview'
export function TodoList({ todos }) {

    console.log('todos',todos)

    return (
        <div className="todo-list">
            {todos.map(todo => {
                return <TodoPreview
                    key={todo.id}
                    todo={todo}
                />
            })}
        </div>
    )
}