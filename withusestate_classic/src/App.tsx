import { useState } from "react";
import "./styles.css";
let nextId = 1;
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}
const initialItems: TodoItem[] = [];
export default function Layout() {
  return (
    <div className="App">
      <Header />
      <App />
    </div>
  );
}
export  function App() {
  const [items, setItems] = useState(initialItems);
  const [editId, setEditId] = useState<number|null>(null); //for storing Edit It
  const [editedTitle, setEditedTitle] = useState(""); // For storing Edited Title
  const [filterStatus, setFilterStatus] = useState("all");
 
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
  function addItem(inputTitle:string) {
    // To Add a new Item on list
    setItems([...items, { id: nextId++, title: inputTitle, completed: false }]);
  }
  function enableEditing(id: number) {
    //change the editing id from null
    setEditId(id);
    setEditedTitle(getTitleById(id)); //get the title of the editing item
  }
  function getTitleById(id: number) {
    //get The title of an item with id
    const filteredItems = items.filter((item) => item.id === id);
    if (filteredItems.length > 0) {
      return filteredItems[0].title;
    } else {
      return "Item not found"; // Return a default message or handle the case when the item is not found
    }
  }
  function saveEditingTitle(id: number) {
    //save the editing idle
    const updateItems = items.map((item) =>
      item.id === id ? { ...item, title: editedTitle } : item
    );
    setItems(updateItems);
    setEditId(null);
  }

  function onChangeItemTitle(e:React.ChangeEvent<HTMLInputElement>) {
    setEditedTitle(e.target.value);
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
          filterStatus={filterStatus}
          editId={editId}
          statusChange={statusChange}
          editedTitle={editedTitle}
          onChangeItemTitle={onChangeItemTitle}
          saveEditingTitle={saveEditingTitle}
          enableEditing={enableEditing}
          deleteItems={deleteItems}
        />
      <button className="opaque-button" onClick={() => setFilterStatus("all")}>
        {" "}
        All{" "}
      </button>
      <button
        className="opaque-button"
        onClick={() => setFilterStatus("active")}
      >
        {" "}
        Active{" "}
      </button>
      <button
        className="opaque-button"
        onClick={() => setFilterStatus("completed")}
      >
        {" "}
        Completed{" "}
      </button>
    </div>
  );
}

function Header(){
 return <>
    <h1>Hello Program</h1>
      <h2>TO DO List</h2>
 </>
}
function TodoForm({addItem,statusChangeAll}:any){
  const [inputTitle, setInputTitle] = useState("");
  function changeTextarea(e:React.ChangeEvent<HTMLInputElement>) {
    setInputTitle(e.target.value);
  }
 
  return <form onSubmit={(e) => {
    e.preventDefault();
    addItem(inputTitle);
    setInputTitle("");
  }}
>
    <input type={"checkbox"} onClick={() => statusChangeAll()} />
        <input
          value={inputTitle}
          placeholder="Add Item"
          required
          onChange={changeTextarea}
          
        />

        <button >Add</button>
  </form>
}
function TodoList({
  editId,
  statusChange,
  editedTitle,
  onChangeItemTitle,
  saveEditingTitle,
  enableEditing,
  deleteItems,
  filterStatus,
  items,
}: any)
{
  function getFilterList() {
    //Change the list according to filter
    if (filterStatus === "all") return items;
    else if (filterStatus === "completed")
      return items.filter((item:TodoItem) => item.completed);
    else if (filterStatus === "active")
      return items.filter((item:TodoItem) => !item.completed);
    else return items;
  }
  const pendingTasks = items.filter((item:TodoItem) => !item.completed).length;
  return (
  <>
    <div className="mydiv">
        <ul className="no-list-style">
          {getFilterList().map((item:TodoItem, index:number) => (
            <ListItem  key={item.id}
            item={item}
            index={index}
            editId={editId}
            statusChange={statusChange}
            editedTitle={editedTitle}
            onChangeItemTitle={onChangeItemTitle}
            saveEditingTitle={saveEditingTitle}
            enableEditing={enableEditing}
            deleteItems={deleteItems}
          />
          ))}
        </ul>
      </div>
      <p>
        <b>{pendingTasks}</b> tasks pending
      </p>
  </>)
  
}
function ListItem({item,
  index,
  editId,
  statusChange,
  editedTitle,
  onChangeItemTitle,
  saveEditingTitle,
  enableEditing,
  deleteItems,
}: any){
  return(
    <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => statusChange(item.id)} // Fix the onChange handler
                id={`checkbox-${index}`}
              />
              {editId === item.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={onChangeItemTitle}
                  onBlur={() => saveEditingTitle(item.id)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      saveEditingTitle(item.id);
                    }
                  }} // Save on Enter key press
                  autoFocus
                />
              ) : (
                <label
                  htmlFor={`checkbox-${index}`}
                  className={item.completed ? "strikethrough" : ""}
                  onDoubleClick={() => enableEditing(item.id)}
                >
                  {item.title}
                </label>
              )}
              <button
                onClick={() => deleteItems(item.id)}
                className="delete-button"
              >
                &times;
              </button>
            </li>
  )
}