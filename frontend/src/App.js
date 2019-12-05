import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("http://localhost:5000/users")
          .then(response => response.json())
          .then(json => setUsers(json));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          {users.map((user, key) => {
            return (
              <li key={key}>
                {user.firstName} {user.lastName}
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
};

export default App;
