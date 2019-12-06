import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";

const App = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState({
    username: "",
    password: ""
  });
  const [exists, setExists] = useState(null);
  const [expanded, setExpanded] = useState(false);

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

  const handleInput = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const login = async () => {
    try {
      const loginResponse = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: input.username,
          password: input.password
        })
      });
      const content = await loginResponse.json();
      content ? setExists(true) : setExists(false);
    } catch (error) {
      console.log(error);
      setExists(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="form-wrap">
          <div className="form">
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={input.username}
                onChange={handleInput}
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleInput}
              />
            </div>
            {exists ? <div className="exists">This user exists!</div> : null}
            <button onClick={login}>Log In</button>
          </div>
        </div>
        <div
          className="expand"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          Expand To See Users
        </div>
        <ul style={expanded ? { height: "150px" } : { height: "0px" }}>
          {users.map((user, key) => {
            return (
              <li key={key}>
                {user.firstName} {user.lastName} | {user.username}:
                {user.password}
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
};

export default App;
