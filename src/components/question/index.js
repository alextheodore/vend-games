import React from "react";
import "./index.css";

function Question({ data, onClickAnswer}) {
  return (
    <>
      <div className="question-card">
        <p className="BRI">{data?.question}</p>
        <img className="card-img" src={data?.picture} />
      </div>

      {data?.answer.map((data, index) => (
        <button
          className="answer"
          onClick={(e) => {
            e.preventDefault();
            onClickAnswer(data);
          }}
          key={index}
        >
          {data?.answer}
        </button>
      ))}
    </>
  );
}

export default Question;
