import { useState } from "react";
import "./App.css";

function App() {
  const [color, setState] = useState("red");
  const nextColor = color === "red" ? "blue" : "red";

  return (
    <div className="App">
      <button
        style={{ backgroundColor: color }}
        onClick={() => setState(nextColor)}
      >
        Change to {nextColor}
      </button>
    </div>
  );
}

export default App;
