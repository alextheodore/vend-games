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
import SoldOut from "../../assets/soldout.jpeg";
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
  const [openSoldOut, setOpenSoldOut] = useState(false);
  const [correctAnswer, setcorrectAnswer] = useState(null);
  const [falseAnswer, setfalseAnswer] = useState(null);
  const [timeStop, settimeStop] = useState(null);
  const [soldOut, setsoldOut] = useState(null);
  const [openTakeGift, setOpenTakeGift] = useState(false);
  const [hiddenKeyboard, setHiddenKeyboard] = useState(true);
  const [activeInput, setActiveInput] = useState("");
  const [form] = Form.useForm();
  const [counterSecond, setCounterSecond] = useState(0);
  // const [counter, setCounter] = useState(15);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("pause");
  // const [timeIntervalId, setTimeIntervalId] = useState(null);

  const [mytime, setMytime] = useState();
  let query = useQuery();
  let currentID = query.get("id") ?? 0;
  console.log(question[parseInt(currentID) - 1]);
  console.log(currentID);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e) => {
    clearTimeout(mytime);
    startCounter();
    const intID = parseInt(currentID) + 1;
    if (parseInt(currentID) === dummyData.length) {
      setOpenTimeStop(false);
      navigate("form");
      return;
    }
    // console.log(e);
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
          setOpenSoldOut(true); // Test jika stoknya 0, akan menampilkan modal stok habis
        }
      })

      .catch((err) => console.log(err));
  }, []);

  //Axios untuk ambil hadiah

  useEffect(() => {
    let secondCounterId;
    let timerId;
    if (timer > 0 && status === "working") {
      secondCounterId = setTimeout(
        () => setCounterSecond(counterSecond + 1),
        1000
      );
      timerId = setTimeout(() => setTimer(timer - 1), 1000);
      // return () => {
      //   clearTimeout(secondCounterId);
      //   clearTimeout(timeIntervalId);
      // };
      const interval = setInterval(() => {
        if (timer === 1) {
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

      return () => {
        clearInterval(interval);
        clearTimeout(timerId);
        clearTimeout(secondCounterId);
      };
    } else {
    }
  }, [timer, counterSecond, timer, status]);

  // useEffect(() => {
  //   let secondCounterId;
  //   let counterId;
  //   if (status === "working") {
  //     secondCounterId = setTimeout(
  //       () => setCounterSecond(counterSecond + 1),
  //       1000
  //     );
  //     counterId = setTimeout(() => setCounter(counter - 1), 1000);
  //   }
  //   return () => {
  //     clearTimeout(counterId);
  //     clearTimeout(secondCounterId);
  //   };
  // }, [counterSecond, counter, status]);

  const startCounter = () => {
    setStatus("working");
  };

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

  function modalFooterCorrectAnswer() {
    // const intID = parseInt(currentID) + 1;
    if (openCorrectAnswer === true) {
      setTimeout(() => {
        setTimer(15);
        handleOk();
      }, 3000);
    }
    return (
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
  }

  function modalFooterFalseAnswer() {
    // const intID = parseInt(currentID) + 1;
    if (openFalseAnswer === true) {
      setTimeout(() => {
        setTimer(15);
        handleOk();
      }, 3000);
    }
    return (
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
  }

  function modalFooterTimeStop() {
    // const intID = parseInt(currentID) + 1;
    if (openTimeStop === true) {
      const time = setTimeout(() => {
        // setOpen(false);
        // setOpenCorrectAnswer(false);
        // setOpenFalseAnswer(false);
        setTimer(15);
        handleOk();
      }, 3000);

      setMytime(time);
    }

    return (
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
  }

  const modalFooterSoldOut = (
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
    // setTimer(0);
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
      url: "https://vmdummy.onrender.com/vendmart/api/dispenseRandom?sensor=YES",
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

  const FormInput = ({ onFocus }) => {};
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Autofocus
      if (FormInput) {
        FormInput({ scan }); // Call onFocus
      }
    }
  }, [Input]);

  console.log(status, "===============");

  return (
    <div className="bgr">
      <MainLayout>
        <div className="logo-bri" style={{ textAlign: "end", padding: "30px" }}>
          <img src={BRI} style={{ width: "15%", alignItems: "end" }} />
        </div>
        <div
          className="logo-quiz"
          style={{ textAlign: "center", paddingTop: "10px" }}
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
          style={{
            marginLeft: "136px",
            marginTop: "-20px",
            marginRight: "20px",
          }}
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
            Scan QR Code anda pada setelah transaksi
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
          footer={() => modalFooterCorrectAnswer()}
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
          open={openSoldOut}
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
          footer={modalFooterSoldOut}
          width={900}
        >
          <img src={SoldOut} style={{ width: "95%" }} />
          <text
            className="stok-BRI"
            style={{
              fontSize: "200px",
              padding: "10px",
            }}
          >
            {soldOut}
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
            setStatus={setStatus}
            setTimer={setTimer}
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
