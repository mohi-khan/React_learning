import { useContext, useState } from "react";
import { FilterStatusContext } from "./TodoContext";
import "./styles.css";
let nextId = 1;
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}
const initialItems: TodoItem[] = [];
const FilterStatusProvider = ({ children }: { children: React.ReactNode }) => {
const [filterStatus, setFilterStatus] = useState("all");

  return (
    <FilterStatusContext.Provider value={{ filterStatus, setFilterStatus }}>
      {children}
    </FilterStatusContext.Provider>
  );
};
export default function Layout() {
  return (
    <div className="App">
      <Header />
      <App />
    </div>
  );
}
export function App() {
  const [items, setItems] = useState(initialItems);
 
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
    <FilterStatusProvider>
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
    </FilterStatusProvider>
  );
}
function FilterButton() {
  const status = useContext(FilterStatusContext);
  return (
    <>
      <button
        className="opaque-button"
        onClick={() => status.setFilterStatus("all")}
      >
        All
      </button>
      <button
        className="opaque-button"
        onClick={() => status.setFilterStatus("active")}
      >
        Active
      </button>
      <button
        className="opaque-button"
        onClick={() => status.setFilterStatus("completed")}
      >
        Completed
      </button>
    </>
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
function TodoForm({ addItem, statusChangeAll }: any) {
  const [inputTitle, setInputTitle] = useState("");
  function changeTextarea(e: React.ChangeEvent<HTMLInputElement>) {
    setInputTitle(e.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
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
      <button>Add</button>
    </form>
  );
}
function TodoList({
  statusChange,
  deleteItems,
  items,
  saveEditingTitle,
}: any) {
  const { filterStatus } = useContext(FilterStatusContext);
  function getFilterList() {
    //Change the list according to filter
    if (filterStatus === "all") return items;
    else if (filterStatus === "completed")
      return items.filter((item: TodoItem) => item.completed);
    else if (filterStatus === "active")
      return items.filter((item: TodoItem) => !item.completed);
    else return items;
  }
  const pendingTasks = items.filter((item: TodoItem) => !item.completed).length;
  return (
    <>
      <div className="mydiv">
        <ul className="no-list-style">
          {getFilterList().map((item: TodoItem, index: number) => (
            <ListItem
              key={item.id}
              items={items}
              item={item}
              index={index}
              saveEditingTitle={saveEditingTitle}
              statusChange={statusChange}
              deleteItems={deleteItems}
            />
          ))}
        </ul>
      </div>
      <p>
        <b>{pendingTasks}</b> tasks pending
      </p>
    </>
  );
}
function ListItem({
  item,
  items,
  index,
  statusChange,
  saveEditingTitle,
  deleteItems,
}: any) {
  const [editId, setEditId] = useState<number | null>(null); //for storing Edit It
  const [editedTitle, setEditedTitle] = useState("");
  function onChangeItemTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setEditedTitle(e.target.value);
  }
  function enableEditing(id: number) {
    //change the editing id from null
    setEditId(id);
    setEditedTitle(getTitleById(id)); //get the title of the editing item
  }
  function getTitleById(id: number) {
    //get The title of an item with id
    const filteredItems = items.filter((item:TodoItem) => item.id === id);
    if (filteredItems.length > 0) {
      return filteredItems[0].title;
    } else {
      return "Item not found"; // Return a default message or handle the case when the item is not found
    }
  }
  return (
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
          onBlur={() => {saveEditingTitle(item.id,editedTitle);
            setEditId(null)}}
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
      <button onClick={() => deleteItems(item.id)} className="delete-button">
        &times;
      </button>
    </li>
  );
}
