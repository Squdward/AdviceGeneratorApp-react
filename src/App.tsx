import { useEffect, useState } from "react";
import "./App.css";

interface IState {
  slip: {
    id: number;
    advice: string;
  };
}

function App() {
  const [state, setState] = useState<IState>();

  function randomNumber() {
    return Math.trunc(1 + Math.random() * (200 - 1));
  }

  async function getData(): Promise<void> {
    try {
      const id = randomNumber();
      const response = await fetch(`https://api.adviceslip.com/advice/${id}`);

      if (response.ok) {
        const data: IState = await response.json();

        setState(data);
      } else {
        throw new Error("Что-то пошло не так");
      }
    } catch (err) {
      console.error(err);
      getData()
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Wrapper">
      <div className="Block">
        <span className="Number">Advice #{state?.slip?.id}</span>
        <p className="Advice">{state?.slip?.advice}</p>
        <div className="Decoration"></div>
        <button className="Generate" onClick={getData}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
              fill="#202733"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
