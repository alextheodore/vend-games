import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import MainLayout from "../layout/main";
import { Button, Modal, Input, Form } from "antd";
import Start from "../../assets/start.gif";
import BRI from "../../assets/BRI_white.png";
import Quiz from "../../assets/quiz.png";
import useQuery from "../Hooks";
import Check from "../../assets/check.gif";
import Error from "../../assets/err.gif";
import TimeOut from "../../assets/timeout.gif";
import Gift from "../../assets/gift.gif";
import OutofStock from "../../assets/outofstock.png";
import Question from "../question";
import { useEffect, useRef } from "react";
import { dummyData } from "../../dummy";
import axios from "axios";

function StartComponent({ question }) {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(15);
  const [open, setOpen] = useState(true);
  const [openCorrectAnswer, setOpenCorrectAnswer] = useState(false);
  const [openFalseAnswer, setOpenFalseAnswer] = useState(false);
  const [openTimeStop, setOpenTimeStop] = useState(false);
  const [openOutOfStock, setOpenOutOfStock] = useState(false);
  const [correctAnswer, setcorrectAnswer] = useState(null);
  const [falseAnswer, setfalseAnswer] = useState(null);
  const [timeStop, settimeStop] = useState(null);
  const [outofStock, setoutofStock] = useState(null);
  const [openTakeGift, setOpenTakeGift] = useState(false);
  const [hiddenKeyboard, setHiddenKeyboard] = useState(true);
  const [activeInput, setActiveInput] = useState("");
  const [form] = Form.useForm();

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

  // Axios untuk halaman start dengan kondisi dimana
  // jika remainingQty tidak sama dengan 0 aplikasi berjalan
  // saat remainingQty 0 halaman aplikasi menampilkan "stok habis"

  useEffect(() => {
    axios({
      method: "get",
      url: "https://vmdummy.onrender.com/vendmart/api/checkSlotAvailability",
    })
      .then(({ data }) => {
        navigate("/");
        console.log(data);
        const splitdata = data.split("?>");
        // console.log(splitdata[1]);
        const parser = new DOMParser();
        const dataxml = parser.parseFromString(`${splitdata[1]}`, "text/xml");
        console.log(dataxml);
        const remainingQty =
          dataxml.getElementsByTagName("remainingQty")[0].childNodes[0]
            .nodeValue; // Jika memakai API stoknya masih 5
        // const remainingQty = 0; // Set remainingQty sama dengan 0
        console.log(remainingQty);
        if (remainingQty === "0") {
          setOpenOutOfStock(true); // Test jika stoknya 0, akan menampilkan modal stok habis
        }
      })

      .catch((err) => console.log(err));
  }, []);

  //Axios untuk ambil hadiah

  useEffect(() => {
    if (timer >= 0) {
      const interval = setInterval(() => {
        if (timer === 0) {
          // const intID = parseInt(currentID) + 1;
          if (parseInt(currentID) > 0) {
            // Kondisi ketika halaman start muncul, maka belum ada timer waktunya (15 detik), lalu ketika klik tombol selanjutnya baru masuk ke nomor 1 dan ada timernya 15 detik
            // console.log(parseInt(currentID), "test");

            const correctAnswer = dummyData
              .find((item) => item.no === parseInt(currentID))
              .answer?.find((answer) => answer.status === true)?.answer;
            if (openCorrectAnswer) {
              settimeStop(correctAnswer);
            }
            // Check if incorrect answer is open
            else if (openFalseAnswer) {
              settimeStop(correctAnswer);
            } else {
              settimeStop(correctAnswer);
              setOpenTimeStop(true);
            }
          }
        } else {
          setOpenTimeStop(false);
          setTimer(timer - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const modalFooter = (
    <div style={{ textAlign: "center", paddingRight: "90px" }}>
      <Button
        onClick={handleOk}
        type={"default"}
        style={{ marginLeft: "70px" }}
      >
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
          bottom: "-345px",
          left: "41.7%",
          transform: "translateX(-50%)",
          backgroundColor: "#FF7F50",
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
          bottom: "-205px",
          left: "41.6%",
          transform: "translateX(-50%)",
          width: "900px !important",
          backgroundColor: "#FF7F50",
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
          bottom: "-205px",
          left: "41.5%",
          transform: "translateX(-50%)",
        }}
      >
        Selanjutnya
      </Button>
    </div>
  );

  const modalFooterOutofStock = (
    <div style={{ position: "relative" }}>
      <h1
        style={{
          fontSize: "35px",
          paddingRight: "100px",
          fontWeight: "bolder",
        }}
      >
        Terima kasih sudah mencoba BRI Quiz
      </h1>
    </div>
  );

  const modalFooterTakeGift = (
    <div style={{ position: "relative" }}>
      <h1
        style={{
          fontSize: "35px",
          paddingRight: "100px",
          fontWeight: "bolder",
        }}
      >
        Ambil Hadiah
      </h1>
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
      console.log("correct answer->", correctAnswer);
      console.log(currentID);
      setOpenFalseAnswer(true);
    }
  };

  const scan = (e) => {
    console.log(e.target.value);
    axios({
      method: "get",
      url: "https://vmdummy.onrender.com/vendmart/api/dispenseRandom?sensor=NO",
    })
      .then(({ data }) => {
        console.log(data);
        const parser = new DOMParser();
        const dataxml = parser.parseFromString(`${data}`, "text/xml");
        console.log(dataxml);
        const status = dataxml.getElementsByTagName("status")[0].textContent;
        console.log(status);
        if (status === "101") {
          setOpenTakeGift(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const FormInput = ({onFocus}) => {};
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Autofocus
      if (FormInput) {
        FormInput({ scan }); // Call onFocus 
      }
    }
  }, [Input]); 

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
              style={{ fontSize: "45px", color: "white", paddingLeft: "110px" }}
            >
              Nomor {currentID}
            </p>
          </div>
          <span className="right-timer">Waktu : </span>
          <span
            className="right-timer"
            style={{
              color: parseInt(timer) <= 5 ? "red" : "white",
              paddingLeft: 12,
            }}
          >
            {timer}
          </span>
        </div>
        <hr
          className="line"
          style={{ marginLeft: "115px", marginTop: "-20px" }}
        ></hr>
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
            style={{ width: "75%", paddingBottom: "5px", paddingTop: "50px" }}
          />
          <h2 style={{ paddingBottom: "10px", fontSize: "30px" }}>
            Scan QR Code anda pada struk setelah transaksi
          </h2>
          <Input
            ref={inputRef}
            variant="borderless"
            onFocus={() => {
              setHiddenKeyboard(false);
              setActiveInput("nama");
            }}
            onChange={scan}
            className="input-form"
            style={{ width: "400px", paddingLeft: "60px" }}
          />
        </Modal>
        <p>{currentID}</p>

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
              backgroundColor: "#00FF00",
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

        <Modal
          centered
          title="- BRI QUIZ -"
          open={openOutOfStock}
          onOk={(e) => handleOk(e)}
          okButtonProps={{
            disabled: true,
          }}
          okText="Terima kasih sudah mencoba BRI Quiz"
          cancelButtonProps={{
            disabled: true,
            style: { visibility: "hidden" },
          }}
          closable={false}
          footer={modalFooterOutofStock}
          width={900}
        >
          <img src={OutofStock} style={{ width: "95%" }} />
          <text
            className="stok-BRI"
            style={{
              fontSize: "200px",
              padding: "10px",
            }}
          >
            {outofStock}
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
          <h1
            style={{ fontSize: "45px", color: "white", paddingBottom: "3px" }}
          >
            {currentID}/5
          </h1>
        </div>
      </MainLayout>
    </div>
  );
}

export default StartComponent;
