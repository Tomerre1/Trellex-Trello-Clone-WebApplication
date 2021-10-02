import { TodoPreview } from './TodoPreview'
// export function TodoList({ todos, onSaveTodo, onRemoveTodo, addActivity }) {
export function TodoList({ todos, onSaveTodo, onRemoveTodo }) {
    return (
        <div className="todo-list">
            {todos.map(todo => {
                return <TodoPreview
                    key={todo.id}
                    todo={todo}
                    onSaveTodo={onSaveTodo}
                    onRemoveTodo={onRemoveTodo}
                    // addActivity={addActivity}
                />
            })}
        </div>
    )
}