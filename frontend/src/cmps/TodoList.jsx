import { TodoPreview } from './TodoPreview'
export function TodoList({ todos }) {

    console.log('todos',todos)
    console.log('im hereeeeeeeeeeeeeee')

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