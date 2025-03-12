import { useState, useEffect } from "react";

function SuggestionPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [userVotes, setUserVotes] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/get-suggestions")
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data);
        const storedVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
        setUserVotes(storedVotes);
      })
      .catch((error) => console.error("Error fetching suggestions:", error));
  }, []);

  const handleVote = async (id, type) => {
    if (userVotes[id]) return;

    const newVote = type === "upvote" ? 1 : -1;
    const updatedVotes = { ...userVotes, [id]: newVote };

    fetch("http://localhost:5000/vote-suggestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, vote: newVote }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuggestions((prev) =>
            prev.map((s) =>
              s.id === id ? { ...s, votes: s.votes + newVote } : s
            )
          );
          setUserVotes(updatedVotes);
          localStorage.setItem("userVotes", JSON.stringify(updatedVotes));
        }
      })
      .catch((error) => console.error("Error voting:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">All Suggestions</h1>
      <a href="/" className="text-blue-400 underline text-lg mb-4">
        ← Back to Suggestion Box
      </a>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl text-center">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <p className="text-lg">{suggestion.suggestion}</p>
            <p className="text-sm text-gray-400 mt-2">
              Submitted by: {suggestion.student_number}
            </p>
            <div className="flex items-center justify-center mt-3 space-x-3">
              <button
                className={`px-3 py-1 rounded-lg ${
                  userVotes[suggestion.id] === 1
                    ? "bg-green-700"
                    : "bg-green-500"
                }`}
                onClick={() => handleVote(suggestion.id, "upvote")}
              >
                ⬆
              </button>
              <span className="text-lg font-bold">{suggestion.votes}</span>
              <button
                className={`px-3 py-1 rounded-lg ${
                  userVotes[suggestion.id] === -1 ? "bg-red-700" : "bg-red-500"
                }`}
                onClick={() => handleVote(suggestion.id, "downvote")}
              >
                ⬇
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionPage;
