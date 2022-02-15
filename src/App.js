import { useState } from "react";
import "./App.css";

function App() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [color, setState] = useState("red");
  const nextColor = color === "red" ? "blue" : "red";

  return (
    <div className="App">
      <button
        disabled={isDisabled}
        style={{ backgroundColor: color }}
        onClick={() => setState(nextColor)}
      >
        Change to {nextColor}
      </button>
      <input
        id="disable-checkbox"
        type="checkbox"
        defaultChecked={false}
        onClick={({ target: { checked } }) => setIsDisabled(checked)}
      />
      <label htmlFor="disable-checkbox">Disable checkbox</label>
    </div>
  );
}

export default App;
