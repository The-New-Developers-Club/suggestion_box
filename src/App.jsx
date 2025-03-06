import { useState } from "react";
import "./App.css";
import SuggestionBox from "./components/suggestionBox";
import SuggestionList from "./components/suggestionList";

function App() {
  const [suggestions, setSuggestions] = useState([]);

  const addSuggestion = (newSuggestion) => {
    setSuggestions([...suggestions, newSuggestion]);
  };
  return (
    <div className="max-w-2xl min-h-screen rounded-lg mx-auto mt-10 p-6">
      <p className="text-3xl">Suggestion box</p>
      <SuggestionBox addSuggestion={addSuggestion} />
    </div>
  );
}

export default App;
