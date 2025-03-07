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
      <p className="text-4xl border-b border-white pb-3">Suggestion box</p>
      <p className="text-xl pt-2">Submit your suggestions for future club meetings here!</p>
      <SuggestionBox addSuggestion={addSuggestion} />
    </div>
  );
}

export default App;
