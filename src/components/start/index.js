import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import MainLayout from "../layout/main";
import { Button, Modal } from "antd";
import Start from "../../assets/start.gif";
import BRI from "../../assets/BRI_white.png";
import Quiz from "../../assets/quiz.png";
import useQuery from "../Hooks";
import Check from "../../assets/check.gif";
import Error from "../../assets/err.gif";
import TimeOut from "../../assets/timeout.gif";
import Question from "../question";
import { useEffect } from "react";
import { dummyData } from "../../dummy";

function StartComponent({ question }) {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(15);
  const [open, setOpen] = useState(true);
  const [openCorrectAnswer, setOpenCorrectAnswer] = useState(false);
  const [openFalseAnswer, setOpenFalseAnswer] = useState(false);
  const [openTimeStop, setOpenTimeStop] = useState(false);
  const [correctAnswer, setcorrectAnswer] = useState(null);
  const [falseAnswer, setfalseAnswer] = useState(null);
  const [timeStop, settimeStop] = useState(null);
  let query = useQuery();
  let currentID = query.get("id") ?? 0;
  console.log(question[parseInt(currentID) - 1]);
  console.log(currentID);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    const intID = parseInt(currentID) + 1;
    if (parseInt(currentID) === dummyData.length) {
      setOpenTimeStop(false);
      navigate("form");
      return;
    }
    console.log(e);
    setOpen(false);
    setOpenCorrectAnswer(false);
    setOpenFalseAnswer(false);
    setTimer(15);
    navigate(`/?id=${intID}`);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };

  useEffect(() => {
    if (timer >= 0) {
      const interval = setInterval(() => {
        if (timer === 0) {
          // const intID = parseInt(currentID) + 1;
          const correctAnswer = dummyData
            .find((item) => item.no === parseInt(currentID))
            .answer.find((answer) => answer.status === true)?.answer;
          settimeStop(correctAnswer);
          setOpenTimeStop(true);
          clearInterval(interval);
          // setTimer(15);
          // navigate(`/?id=${intID}`);
        } else {
          setOpenTimeStop(false);
          setTimer(timer - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);
  console.log(timer);

  // else if (parseInt(currentID) !== parseInt(currentID) - 1) {
  //   setTimer(15);
  // }

  useEffect(() => {
    // setTimer(15);
    console.log(timer);
    if (timer === 0) {
      // setOpenTimeStop(false);
      setTimer(15);
    }
  }, []);

  const modalFooter = (
    <div style={{ textAlign: "center" }}>
      <Button onClick={handleOk} type={"primary"}>
        Mulai
      </Button>
    </div>
  );

  const modalFooterCorrectAnswer = (
    <div style={{ position: "relative" }}>
      <Button
        className="btn-correct-answer"
        onClick={handleOk}
        type={"primary"}
        style={{
          position: "absolute",
          bottom: "-384px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Selanjutnya
      </Button>
    </div>
  );

  const modalFooterFalseAnswer = (
    <div style={{ position: "relative" }}>
      <Button
        className="btn-false-answer"
        onClick={handleOk}
        type={"primary"}
        style={{
          position: "absolute",
          bottom: "-258px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Selanjutnya
      </Button>
    </div>
  );

  const modalFooterTimeStop = (
    <div style={{ position: "relative" }}>
      <Button
        className="btn-stop"
        onClick={handleOk}
        type={"primary"}
        style={{
          position: "absolute",
          bottom: "-258px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Selanjutnya
      </Button>
    </div>
  );

  const answer = (data) => {
    console.log("answer data ->", data);
    if (data.status === true) {
      setcorrectAnswer(data.answer);
      setOpenCorrectAnswer(true);
    } else {
      console.log(
        "find 1-> ",
        dummyData.find((item) => item.no === parseInt(currentID))
      );
      const correctAnswer = dummyData
        .find((item) => item.no === parseInt(currentID))
        .answer.find((answer) => answer.status === true)?.answer;
      setfalseAnswer(correctAnswer);
      // settimeStop(correctAnswer);
      console.log("correct answer->", correctAnswer);
      console.log(currentID);

      setOpenFalseAnswer(true);
      // setOpenTimeStop(true);
    }
  };

  return (
    <div className="bgr">
      <MainLayout>
        <div className="logo-bri" style={{ textAlign: "end", padding: "30px" }}>
          <img src={BRI} style={{ width: "15%", alignItems: "end" }} />
        </div>
        <div
          className="logo-quiz"
          style={{ textAlign: "center", paddingTop: "-150px" }}
        >
          <img src={Quiz} style={{ width: "32%", alignItems: "center" }} />
        </div>
        <div className="header">
          <div className="left-nomor">
            <p
              style={{ fontSize: "50px", color: "white", paddingLeft: "110px" }}
            >
              Nomor {currentID}
            </p>
          </div>
          <div className="right-timer">Waktu : {timer}</div>
        </div>
        <hr className="line"></hr>
        <Modal
          centered
          title="- BRI QUIZ -"
          open={open}
          onOk={(e) => handleOk(e)}
          okButtonProps={{
            disabled: true,
          }}
          okText="Mulai"
          cancelButtonProps={{
            disabled: true,
            style: { visibility: "hidden" },
          }}
          closable={false}
          footer={modalFooter}
          width={900}
        >
          <img
            src={Start}
            style={{ width: "75%", paddingBottom: "105px", paddingTop: "50px" }}
          />
        </Modal>

        <Modal
          centered
          title="Jawaban Benar"
          open={openCorrectAnswer}
          onOk={(e) => handleOk(e)}
          okButtonProps={{
            disabled: true,
          }}
          okText="Selanjutnya"
          cancelButtonProps={{
            disabled: true,
            style: { visibility: "hidden" },
          }}
          closable={false}
          footer={modalFooterCorrectAnswer}
          width={900}
        >
          <img src={Check} style={{ width: "95%" }} />
          <text
            className="correct-answer-BRI"
            style={{
              backgroundColor: "greenyellow",
              fontSize: "60px",
              borderRadius: "15px",
              padding: "15px",
            }}
          >
            {correctAnswer}
          </text>
        </Modal>

        <Modal
          centered
          title="Oopss Jawaban Salah"
          open={openFalseAnswer}
          onOk={(e) => handleOk(e)}
          okButtonProps={{
            disabled: true,
          }}
          okText="Selanjutnya"
          cancelButtonProps={{
            disabled: true,
            style: { visibility: "hidden" },
          }}
          closable={false}
          footer={modalFooterFalseAnswer}
          width={900}
        >
          <img src={Error} style={{ width: "95%" }} />
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>
            yang benar adalah...
          </p>
          <text
            className="false-answer-BRI"
            style={{
              backgroundColor: "#00FF00",
              fontSize: "60px",
              borderRadius: "15px",
              padding: "15px",
            }}
          >
            {falseAnswer}
          </text>
        </Modal>

        <Modal
          centered
          title="Oopss Waktu Habis"
          open={openTimeStop}
          onOk={(e) => handleOk(e)}
          okButtonProps={{
            disabled: true,
          }}
          okText="Selanjutnya"
          cancelButtonProps={{
            disabled: true,
            style: { visibility: "hidden" },
          }}
          closable={false}
          footer={modalFooterTimeStop}
          width={900}
        >
          <img src={TimeOut} style={{ width: "95%" }} />
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>
            yang benar adalah...
          </p>
          <text
            className="time-stop-BRI"
            style={{
              backgroundColor: "#00FF00",
              fontSize: "60px",
              borderRadius: "15px",
              padding: "15px",
            }}
          >
            {timeStop}
          </text>
        </Modal>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Question
            data={question[parseInt(currentID) - 1]}
            onClickAnswer={answer}
          />
        </div>
      </MainLayout>
    </div>
  );
}

export default StartComponent;
