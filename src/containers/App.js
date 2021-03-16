import { useEffect, useState } from "react";

import "./App.css";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [count, setCount] = useState(0);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
    console.log(robots, searchField);
  }, []);

  useEffect(() => {
    console.log(count);
    return () => {};
  }, [count]);

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return !robots.length ? (
    <h1 className="f1 tl">Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />;
        </ErrorBoundry>
      </Scroll>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      {count}
    </div>
  );
}

export default App;
