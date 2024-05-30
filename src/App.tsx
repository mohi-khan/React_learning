import { TodoList } from "./component/ToDoList";
import { TodoForm } from "./component/ToDoForm";
import { FilterButton } from "./component/FilterButton";
import { useAtom } from "jotai";
import { todoListAtom } from "./ToDoAtom";
import "./styles.css";
let nextId = 1;
/*interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}*/
//const initialItems: TodoItem[] = [];

export default function Layout() {
  return (
    <div className="App">
      <Header />
      <App />
    </div>
  );
}
export function App() {
  const [items, setItems] = useAtom(todoListAtom)
 
 // For storing Edited Title
  // const [filterStatus, setFilterStatus] = useState("all");

  function statusChange(id: number) {
    //To changed the packed item of the list i.e completed called from click on checkbox
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  }
  function statusChangeAll() {
    //To Select all the checkbox
    const updatedItems = items.map((item) => ({
      ...item,
      completed: !item.completed,
    }));

    setItems(updatedItems);
  }
  function addItem(inputTitle: string) {
    // To Add a new Item on list
    setItems([...items, { id: nextId++, title: inputTitle, completed: false }]);
  }
 
  function saveEditingTitle(id: number,editedTitle:string) {
    //save the editing idle
    const updateItems = items.map((item) =>
      item.id === id ? { ...item, title: editedTitle } : item
    );
    setItems(updateItems);
 //   setEditId(null);
  }

  

  function deleteItems(id: number) {
    //to delete a specific item from list
    const updateItems = items.filter((item) => item.id !== id);
    setItems(updateItems);
  }
  return (
  
      <div className="App">
        <div className="mydiv">
          <TodoForm addItem={addItem} statusChangeAll={statusChangeAll} />
        </div>
        <TodoList
          items={items}
          statusChange={statusChange}
          deleteItems={deleteItems}
          saveEditingTitle={saveEditingTitle}
        />
        <FilterButton />
      </div>
  
  );
}
function Header() {
  return (
    <>
      <h1>Hello Program</h1>
      <h2>TO DO List</h2>
    </>
  );
}
