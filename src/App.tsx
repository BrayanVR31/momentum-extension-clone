import { TaskForm, TaskProvider, TaskList } from "@features/tasks";

function App() {
  return (
    <TaskProvider>
      <TaskList />
      <TaskForm />
    </TaskProvider>
  );
}

export default App;
