import { useState } from "react";

function suggestionBox({addSuggestion}) {
    const [text, setText] = useState("");
    const [studentID, setStudentID] = useState("");
    const [count, setCount] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (text.trim()){
            addSuggestion({text, votes: 0});
            setText("");
            setStudentID("");
            setCount(0);
        }
    }
    const handleTextChange = (event) =>{
        setText(event.target.value);
        setCount(event.target.value.length);
    }
    const handleIDChange = (event) => {
        setStudentID(event.target.value);
    }
  
    return (
        <form onSubmit={handleSubmit} className="rounded-lg flex flex-col gap-2 p-4 text-white">
            <div className="flex content-center items-center gap-3">
                <textarea
                    placeholder="Enter your suggestion here..."
                    className="rounded bg-gray-500 text-white resize-none w-xl h-32"
                    value={text}
                    maxLength="200"
                    required
                    onChange={handleTextChange}
                    
                />
                <textarea
                    placeholder="Student ID"
                    className="rounded bg-gray-500 text-white resize-none max-h-10 overflow-y-hidden content-center"
                    value={studentID}
                    maxLength="9"
                    required
                    onChange={handleIDChange}
                />
            </div>
            <div className="text-left">
                <p>{count}/200</p>
            </div>

            <button type="submit" className="bg-blue-800">Submit</button>    
        </form>
  );
}

export default suggestionBox;
