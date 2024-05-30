import { useState } from "react";
interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
  }
export function TaskItem({
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
  