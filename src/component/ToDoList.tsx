import { useAtom } from "jotai";
import { TaskItem } from "./TaskItem";
import { filterStatusAtom } from "../ToDoAtom";

interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}

export function TodoList({
    statusChange,
    deleteItems,
    items,
    saveEditingTitle,
  }: any) {
    const [filterStatus] = useAtom(filterStatusAtom);
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
              <TaskItem
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
  