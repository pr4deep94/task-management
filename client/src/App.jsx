import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./widgets/Login"
import Tasks from "./widgets/TaskList";
import Task from "./widgets/AddTask";
import AuthProvider from "./hooks/useAuthProvider";
import PrivateRoute from "./router/route";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/add" element={<Task />} />
                <Route path="/tasks/:taskId" element={<Task />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;