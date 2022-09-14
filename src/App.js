import './App.css';
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import ToDo from "./components/ToDo";

const App = () => {

    const [toDoData, setData] = useState([]);
    const {register, handleSubmit} = useForm();

    useEffect(() => {
        syncWithServer();
    }, []);

    const deleteToDo = (toDoDelete) => {
        fetch('http://localhost:8090/todo/delete/' + toDoDelete.id, {method: 'DELETE'}).then(() => syncWithServer());
    }

    const onSubmit = (data, e) => {
        fetch('http://localhost:8090/todo/save',{
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => syncWithServer());
    };

    const syncWithServer = () =>{
        fetch('http://localhost:8090/todo/get')
            .then(response => response.json())
            .then(result => {
                setData(result);
            });

    };

    const onError = (errors, e) => console.log(errors, e);

    return (
        <div className="App">

            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <label>
                    To do:
                    <input {...register("todo")} style={{marginLeft: 10}}/>
                </label>
                <input type="submit" value="Submit"  style={{marginLeft: 10}}/>
            </form>
            <ul>
                {toDoData.map((item, index) => {
                    return <li key={index}><ToDo todo={item} deleteToDo={deleteToDo}/></li>
            })}
            </ul>
        </div>
    );
}

export default App;
