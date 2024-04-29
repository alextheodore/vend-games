import React from "react";
import "./index.css";

function Question({ data }) {
  return (
    <>
      <div className="question-card">
        <p className="BRI">{data?.question}</p>
        <img className="card-img" src={data?.picture} />
      </div>

      {data?.answer.map((data, index) => (
        <button className="answer" key={index}>{data?.answer}</button>
      ))}
    </>
  );
}

export default Question;
