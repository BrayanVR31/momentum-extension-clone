import { Task } from "@shared/types";

// Enums
enum TaskActionTypes {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

// Types
type OptionalTask = Partial<Task>;

interface TaskState {
  tasks: Task[];
}

interface TaskAction {
  type: TaskActionTypes;
  payload: OptionalTask;
}

function taskReducer(state: TaskState, action: TaskAction) {
  switch (action.type) {
    case "CREATE":
      return {
        tasks: [{ ...action.payload, isCompleted: false }, ...state.tasks],
      };
    case "UPDATE":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task,
        ),
      };
    case "DELETE":
      return {
        tasks: state.tasks.filter((task) => task.id != action.payload.id),
      };
    default:
      return state;
  }
}

export default taskReducer;
export type { TaskState, TaskAction };
export { TaskActionTypes };
