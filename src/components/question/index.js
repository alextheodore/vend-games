import React from "react";
import "./index.css";

function Question({ data, onClickAnswer, setStatus, setTimer }) {
  return (
    <>
      <div className="question-card">
        <p className="BRI">{data?.question}</p>
        <img className="card-img" src={data?.picture} />
      </div>

      <div style={{ height: "28vh"}}>
        {data?.answer.map((data, index) => (
          <button
            className="answer"
            onClick={(e) => {
              e.preventDefault();
            
              setStatus("pause")
              setTimeout(() => {
                setTimer(15)
              }, 3000);
              onClickAnswer(data);
              
            }}
            key={index}
          >
            {data?.answer}
          </button>
        ))}
      </div>
    </>
  );
}

export default Question;
