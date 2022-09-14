import React from 'react';

const ToDo = (props) => {
    return (
        <div className="toDoComponent">
            <div>{props.todo.todo}</div>
            <button onClick={() => {
                props.deleteToDo(props.todo)
            }}>delete
            </button>
        </div>
    );
}

export default ToDo;