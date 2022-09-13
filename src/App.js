import './App.css';
import {useForm} from "react-hook-form";
import {useState} from "react";
import ToDo from "./components/ToDo";
const App = () => {

    const [toDoData, setData] = useState([]);
    const { register, handleSubmit } = useForm();

    const deleteToDo = (toDoDelete) => {
        setData(toDoData.filter((item) => (item !== toDoDelete)));
        //TODO: Make 'DELETE' request to back-end to delete ToDo
        fetch('http://localhost:8090/todo/delete/' + toDoDelete.id,{method: 'DELETE'}).then();
        syncWithServer();
    }

    const onSubmit = (data, e) => {
        console.log("DATA OBJECT")
        console.log(data, e);
        console.log(toDoData);
        //TODO: Make 'POST' request to back-end to save new ToDo
        fetch('http://localhost:8090/todo/save',{
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then();
        syncWithServer();
    };

    //TODO: Make 'GET' method to get all ToDo's from back-end
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
                return <li key={index}><ToDo todo={item.todo} deleteToDo={deleteToDo}/></li>
            })}
            </ul>
        </div>
    );
}

export default App;
