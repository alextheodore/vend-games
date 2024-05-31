import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import MainLayout from "../layout/main";
import Start from "../../assets/start.gif";
import BRI from "../../assets/BRI_white.png";
import Quiz from "../../assets/quiz.png";
import useQuery from "../Hooks";
import Check from "../../assets/check.gif";
import Error from "../../assets/err.gif";
import Gift from "../../assets/gift.gif";
import Question from "../question";
import { useEffect } from "react";
import { dummyData } from "../../dummy";
import "./index.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import axios from "axios";

function FormComponent({ question }) {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [openTakeGift, setOpenTakeGift] = useState(false);
  const [takeGift, settakeGift] = useState(null);
  const [activeInput, setActiveInput] = useState("");
  const [input, setInput] = useState({
    name: "",
    phone: "",
  });

  const inputName = Form.useWatch("nama", form)
  const inputPhone = Form.useWatch("nomor", form)

  const onChanged = (target) => {
    console.log(target, "====> nama", inputName);
    // setInput({
    //   name: target,
    //   phone: target,
    // });
    let value = ""
    if (activeInput === "nama") value = (inputName || "") + target;
    else value = (inputPhone || "") + target
    form.setFieldsValue({
      [activeInput]: value,
    });
  };

  const [hiddenKeyboard, setHiddenKeyboard] = useState(true);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Dari page start
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

  let query = useQuery();
  let currentID = query.get("id") ?? 0;
  // console.log(question[parseInt(currentID) - 1]);
  // console.log(currentID);
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

  //function dengan kondisi sebelum mengambil hadiah harus mengisi form nama dan nomor terlebih dahulu
  const handleFinish = () => {
    if (inputName && inputPhone) {
      setOpenTakeGift(false);
    } else {
      console.error("Tolong isi formnya terlebih dahulu");
    }
  };

  useEffect(() => {
    function clickHanlder(e) {
      if (
        !(e.target.nodeName === "INPUT") &&
        !e.target.classList.contains("hg-button")
      ) {
        setHiddenKeyboard(true);
      }
    }

    window.addEventListener("click", clickHanlder);
    return window.removeEventListener("click", clickHanlder, true);
  }, []);

  function Submit() {
    // console.log("jatoh");
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
  }

  const modalFooterTakeGift = (
    <div style={{ position: "relative" }}>
      <h1
        style={{
          fontSize: "38px",
          paddingTop: "80px",
          paddingRight: "60px",
          fontWeight: "bold",
        }}
      >
        Terima kasih sudah mencoba BRI Quiz
      </h1>
    </div>
  );

  console.log(openTakeGift);

  return (
    <>
      <div>
        <MainLayout>
          <div
            className="logo-bri"
            style={{ textAlign: "end", padding: "30px" }}
          >
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
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 1000,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              className="form-username"
              label="Nama"
              name="nama"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
                {
                  validator: (_, value) => {
                    if (value && value.length > 25) {
                      return Promise.reject(
                        <text
                          style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "red",
                          }}
                        >
                          "Nama tidak boleh lebih dari 25 karakter."
                        </text>
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                className="form-input-nama"
                onFocus={() => {
                  setHiddenKeyboard(false);
                  setActiveInput("nama");
                }}
              />
            </Form.Item>

            <Form.Item
              label="Nomor HP"
              name="nomor"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  validator: (_, value) => {
                    if (value && value.length < 4) {
                      return Promise.reject(
                        <text
                          style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "red",
                          }}
                        >
                          "Nomer tidak boleh kurang dari 3 nomor."
                        </text>
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                className="form-input-nomor"
                onFocus={() => {
                  setHiddenKeyboard(false);
                  setActiveInput("nomor");
                }}
              />
            </Form.Item>

            <Modal
              centered
              title="Silahkan Ambil Hadiah"
              open={openTakeGift}
              onOk={(e) => handleOk(e)}
              onCancel={() => setOpenTakeGift(false)}
              footer={modalFooterTakeGift}
              okButtonProps={{
                disabled: true,
              }}
              okText=""
              cancelButtonProps={{
                disabled: true,
                style: { visibility: "hidden" },
              }}
              closable={false}
              width={900}
            >
              <img src={Gift} style={{ width: "95%" }} />
              <text
                className="stok-BRI"
                style={{
                  fontSize: "200px",
                  padding: "10px",
                }}
              >
                {takeGift}
              </text>
            </Modal>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            ></Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {inputName && inputPhone ? (
                <Button
                  onClick={() => Submit()}
                  type="primary"
                  htmlType="submit"
                  className="btn-form"
                >
                  Ambil Hadiah
                </Button>
              ) : (
                //Button jika belum isi form
                <Button
                  htmlType="submit"
                  className="btn-form"
                  style={{ backgroundColor: "gray" }}
                >
                  Isi form
                </Button>
              )}
            </Form.Item>
          </Form>
          {!hiddenKeyboard && <Keyboard 
          // onChange={onChanged}
          onKeyPress={onChanged}
          />}
        </MainLayout>
      </div>
    </>
  );
}

export default FormComponent;
