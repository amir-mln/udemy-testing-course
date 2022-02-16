import { useState } from "react";
import "./App.css";

export function separateWithSpace(string) {
  return string.replace(/\B[A-Z]\B/g, " $&");

  /*read more at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter*/
}

function App() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [color, setState] = useState("MediumVioletRed");
  const nextColor =
    color === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div className="App">
      <button
        disabled={isDisabled}
        style={{
          backgroundColor: isDisabled ? "gray" : color,
        }}
        onClick={() => setState(nextColor)}
      >
        Change to {separateWithSpace(nextColor)}
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
