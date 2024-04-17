// DataContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

const baseUrl = "https://jsonplaceholder.typicode.com/users";

export const DataContextProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(baseUrl)
      .then((res) => {
        setState(res.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <DataContext.Provider value={{ state, loading }}>
      {children}
    </DataContext.Provider>
  );
};
