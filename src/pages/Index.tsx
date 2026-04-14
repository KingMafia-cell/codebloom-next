import { useState } from "react";

const Index = () => {
  const [result, setResult] = useState("Result will be displayed here");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleClick = () => {
    // Example: add the two numbers
    const sum = Number(input1) + Number(input2);
    setResult(`Result: ${sum}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <p className="text-xl text-center font-semibold">{result}</p>
        
        <input 
          id="inp1"
          type="number"
          className="border rounded p-2 w-full"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="First number"
        />
        
        <input 
          id="inp2"
          type="number"
          className="border rounded p-2 w-full"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Second number"
        />
        
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded w-full active:bg-blue-700"
          onClick={handleClick}
        >
          CLICK
        </button>
      </div>
    </div>
  );
};

export default Index;
