import React, { useState } from 'react';
function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div>
      <h2>Array State Variable</h2>
      <button className='btn btn-success my-3' onClick={addElement}>
        Add Element
      </button>
      <ul className='d-flex gap-3 flex-column'>
        {array.map((item, index) => (
          <li key={index}>
            {item}
            <button
              className='btn btn-danger ms-4'
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ArrayStateVariable;
