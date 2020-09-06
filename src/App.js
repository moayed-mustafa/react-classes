import React from "react";
import JokeList from "./JokeList";
import JokeListClass from "./JokeListClass";

function App() {
  return (
    <div className="App">
      {/* <JokeList /> */}
      <JokeListClass numOfJokes= {10} />
    </div>
  );
}

export default App;
