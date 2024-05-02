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
import Question from "../question";
import { useEffect } from "react";

function StartComponent({ question }) {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(15);
  const [open, setOpen] = useState(true);
  const [openCorrectAnswer, setOpenCorrectAnswer] = useState(false);
  const [correctAnswer, setcorrectAnswer] = useState(null);
  let query = useQuery();
  let currentID = query.get("id") ?? 0;
  console.log(question[parseInt(currentID) - 1]);
  console.log(currentID);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
    navigate(`/?id=${parseInt((currentID += 1))}`);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer(timer-1)
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [timer]);
  //   console.log(timer)

  const modalFooter = (
    <div style={{ textAlign: "center"}}>
      <Button onClick={handleOk} type={"primary"}>
        Mulai
      </Button>
    </div>
  );

  const modalFooterCorrectAnswer = (
    <div style={{ position: "relative" }}>
      <Button
        className="btn-answer"
        onClick={handleOk}
        type={"primary"}
        style={{
          position: "absolute",
          bottom: "-236px",
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
    }
    // else {
    //   setcorrectAnswer(data.answer);
    //   setOpenCorrectAnswer(true);
    // }
  
  };

  return (
    <div className="bgr">
      <MainLayout>
        <div className="logo-bri" style={{ textAlign: "end", padding: "30px" }}>
          <img src={BRI} style={{ width: "15%", alignItems: "end" }} />
        </div>
        <div
          className="logo-quiz"
          style={{ textAlign: "center", padding: "15px" }}
        >
          <img
            src={Quiz}
            style={{ width: "32%", alignItems: "center", padding: "" }}
          />
        </div>
        <div>
          <div className="left-nomor">
            <p
              style={{ fontSize: "50px", color: "white", paddingLeft: "180px" }}
            >
              Nomor {currentID}
            </p>
          </div>
          {/* <div className="right">
            Waktu
          </div> */}
        </div>
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
          <img src={Start} style={{ width: "75%", paddingBottom: "105px", paddingTop: "50px"}} />
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
          <text style={{ fontSize: "50px" }}>{correctAnswer}</text>
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
