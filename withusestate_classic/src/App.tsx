import { useState } from "react";
import "./styles.css";
let nextId = 1;
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}
const initialItems: TodoItem[] = [];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [inputTitle, setInputTitle] = useState("");
  const [editId, setEditId] = useState<number|null>(null); //for storing Edit It
  const [editedTitle, setEditedTitle] = useState(""); // For storing Edited Title
  const [filterStatus, setFilterStatus] = useState("all");
  function changeTextarea(e:React.ChangeEvent<HTMLInputElement>) {
    setInputTitle(e.target.value);
  }
  function addItem() {
    // To Add a new Item on list
    setItems([...items, { id: nextId++, title: inputTitle, completed: false }]);
    setInputTitle("");
  }
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
  function countPendingTasks() {
    //To check Number of task yet to completed
    return items.filter((item) => !item.completed).length;
  }
  function deleteItems(id: number) {
    //to delete a specific item from list
    const updateItems = items.filter((item) => item.id !== id);
    setItems(updateItems);
  }
  function getFilterList() {
    //Change the list according to filter
    if (filterStatus === "all") return items;
    else if (filterStatus === "completed")
      return items.filter((item) => item.completed);
    else if (filterStatus === "active")
      return items.filter((item) => !item.completed);
    else return items;
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>TO DO List</h2>
      <div className="mydiv">
        <input type={"checkbox"} onClick={() => statusChangeAll()} />
        <input
          type='text'
          value={inputTitle}
          placeholder="Add Item"
          onChange={changeTextarea}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addItem();
            }
          }}
        />

        <button onClick={() => addItem()}>Add</button>
      </div>
      <div className="mydiv">
        <ul className="no-list-style">
          {getFilterList().map((item, index) => (
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
          ))}
        </ul>
      </div>
      <p>
        <b>{countPendingTasks()}</b> tasks pending
      </p>
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
