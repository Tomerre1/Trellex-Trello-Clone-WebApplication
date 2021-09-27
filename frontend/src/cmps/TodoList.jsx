import { TodoPreview } from './TodoPreview'
export function TodoList({ todos, onSaveTodo, onRemoveTodo }) {

    console.log('todos',todos)

    return (
        <div className="todo-list">
            {todos.map(todo => {
                return <TodoPreview
                    key={todo.id}
                    todo={todo}
                    onSaveTodo={onSaveTodo}
                    onRemoveTodo={onRemoveTodo}
                />
            })}
        </div>
    )
}