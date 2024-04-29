import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginAction = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        ...data
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.access_token);
        navigate("/tasks");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};