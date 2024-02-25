import { useDispatch, useSelector } from 'react-redux';
import { LabState } from '../../../store';
import { addTodo, setTodo, updateTodo } from './todosReducer';

function TodoForm() {
  const { todo } = useSelector((state: LabState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <li className='list-group-item d-flex align-items-center'>
      <input
        className='me-4'
        style={{ width: '150px' }}
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <button
        className='btn btn-warning mx-1'
        onClick={() => dispatch(updateTodo(todo))}
      >
        Update
      </button>
      <button
        className='btn btn-success mx-1'
        onClick={() => dispatch(addTodo(todo))}
      >
        Add
      </button>
    </li>
  );
}
export default TodoForm;
