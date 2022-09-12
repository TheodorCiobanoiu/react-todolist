import './App.css';
import {useForm} from "react-hook-form";
import {useState} from "react";
import ToDo from "./components/ToDo";
const App = () => {

    const [toDoData, setData] = useState([]);
    const { register, handleSubmit } = useForm();

    const deleteToDo = (toDoDelete) => {
        setData(toDoData.filter((item) => (item!== toDoDelete)));
    }

    const onSubmit = (data, e) => {
        console.log(data, e);
        setData([...toDoData, data['to-do']]);
        console.log(toDoData);
    };

    const onError = (errors, e) => console.log(errors, e);

    return (
        <div className="App">

            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <label>
                    To do:
                    <input {...register("to-do")} style={{marginLeft: 10}}/>
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
