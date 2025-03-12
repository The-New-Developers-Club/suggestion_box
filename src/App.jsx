import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SuggestionBox from "./components/suggestionBox";
import SuggestionPage from "./components/suggestionPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-center min-h-screen p-6">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center justify-center bg-center self-center items-center">
                <p className="text-4xl font-bold border-b border-white pb-3">
                  Suggestion Box
                </p>
                <p className="text-xl pt-2 mb-4">
                  Submit your suggestions for future club meetings here!
                </p>
                <SuggestionBox />
                <Link
                  to="/suggestions"
                  className="text-blue-400 mt-4 inline-block text-lg"
                >
                  View Suggestions
                </Link>
              </div>
            }
          />
          <Route path="/suggestions" element={<SuggestionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
