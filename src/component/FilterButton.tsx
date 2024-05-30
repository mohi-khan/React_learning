import { useAtom } from "jotai";
import { filterStatusAtom } from "../ToDoAtom";

export function FilterButton() {
  const [, setFilterStatus] = useAtom(filterStatusAtom);
    return (
      <>
        <button
          className="opaque-button"
          onClick={() => setFilterStatus("all")}
        >
          All
        </button>
        <button
          className="opaque-button"
          onClick={() => setFilterStatus("active")}
        >
          Active
        </button>
        <button
          className="opaque-button"
          onClick={() => setFilterStatus("completed")}
        >
          Completed
        </button>
      </>
    );
  }