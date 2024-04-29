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
import Question from "../question";
import { useEffect } from "react";

function StartComponent({ question }) {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(15);
  const [open, setOpen] = useState(true);
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
    <div style={{ textAlign: "center" }}>
      <Button onClick={handleOk} type={"primary"}>
        Mulai
      </Button>
    </div>
  );

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
          <img src={Quiz} style={{ width: "32%", alignItems: "center", padding: "" }} />
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
          <img src={Start} style={{ width: "85%" }} />
        </Modal>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}> 
          <Question data={question[parseInt(currentID) - 1]} />
        </div>
      </MainLayout>
    </div>
  );
}

export default StartComponent;
