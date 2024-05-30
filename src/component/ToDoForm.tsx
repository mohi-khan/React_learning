import { useState } from "react";
export function TodoForm({ addItem, statusChangeAll }: any) {
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
  