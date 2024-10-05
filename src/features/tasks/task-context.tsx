import { createContext, ReactNode, useReducer, Dispatch } from "react";
import taskReducer, { TaskState, TaskAction } from "./task-reducer";

// Types
interface Context {
  taskState: TaskState;
  taskAction: Dispatch<TaskAction>;
}

interface Props {
  children: ReactNode;
}

// Context
const TaskContext = createContext<Context>({
  taskState: { tasks: [] },
  taskAction: () => null,
});

// Provider
function TaskProvider({ children }: Props) {
  // State
  const [taskState, taskAction] = useReducer(taskReducer, { tasks: [] });
  return (
    <TaskContext.Provider value={{ taskState, taskAction }}>
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskProvider };
