import { useDispatch } from 'react-redux';
import { setTodo, deleteTodo } from './todosReducer';

function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className='list-group-item d-flex align-items-center'>
      <p className='fs-4 m-0' style={{ width: '200px' }}>
        {todo.title}
      </p>
      <button
        className='btn btn-danger mx-1'
        onClick={() => dispatch(setTodo(todo))}
      >
        Edit
      </button>
      <button
        className='btn btn-primary mx-1'
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        Delete
      </button>
    </li>
  );
}
export default TodoItem;
