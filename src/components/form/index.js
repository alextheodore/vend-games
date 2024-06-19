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
import axios from "axios";
import "./keyboard.css";
import dayjs from "dayjs";

function FormComponent({ question }) {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [openTakeGift, setOpenTakeGift] = useState(false);
  const [takeGift, settakeGift] = useState(null);
  const [activeInput, setActiveInput] = useState("");
  const [input, setInput] = useState({
    useKeyboard: "",
    useKeyboard2: "",
  });

  const useKeyboard = Form.useWatch("nama", form);
  const useKeyboard2 = Form.useWatch("nomor", form);

  const onChanged = (target) => {
    // console.log(target, "====> nama", useKeyboard);
    let value = "";
    if (activeInput === "nama") value = (useKeyboard || "") + target;
    else value = (useKeyboard2 || "") + target;
    form.setFieldsValue({
      [activeInput]: value,
    });
  };

  // const [hiddenKeyboard, setHiddenKeyboard] = useState(true);
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
  const [items, setItems] = useState([]);

  const Name = Form.useWatch("nama", form);
  // console.log(Name, "name");
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

  // Function dengan kondisi sebelum mengambil hadiah harus mengisi form nama dan nomor terlebih dahulu
  const handleFinish = () => {
    if (useKeyboard && useKeyboard2) {
      setOpenTakeGift(false);
    } else {
      console.error("Tolong isi formnya terlebih dahulu");
    }
  };

  const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: [],
      capsKey: null,
    },

    properties: {
      value: "",
      capsLock: false,
      keyboardInputs: null,
      keyLayout: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "backspace",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "caps",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "enter",
        "done",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".",
        "?",
        "space",
      ],
    },

    init() {
      // create and setup main element
      this.elements.main = document.createElement("div");
      this.elements.main.classList.add("keyboard", "keyboard--hidden");
      document.body.appendChild(this.elements.main);

      // create and setup child container component
      this.elements.keysContainer = document.createElement("div");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.main.appendChild(this.elements.keysContainer);

      // create and setup key elements
      this.elements.keysContainer.appendChild(this._createKeys());
      this.elements.keys =
        this.elements.keysContainer.querySelectorAll(".keyboard__key");

      // open keyboard for elements with .use-keyboard-input
      this.properties.keyboardInputs = document.querySelectorAll(
        ".use-keyboard-input"
      );

      console.log(this.properties.keyboardInputs, "input keyboard");
      this.properties.keyboardInputs.forEach((element) => {
        element.addEventListener("focus", () => {
          this.open(element.value, (currentValue) => {
            console.log("current value", currentValue);
            element.value = currentValue;
          });
        });
      });

      const useKeyboard = () => {
        const [input, setInput] = useState("");

        useEffect(() => {
          setInput("");
        });

        const handleInput = (targetCharacter) => {
          setInput((prevState) => prevState + targetCharacter);
        };

        return { input, handleInput };
      };

      const useKeyboard2 = () => {
        const [input, setInput] = useState("");

        useEffect(() => {
          setInput("");
        });

        const handleInput = (targetCharacter) => {
          setInput((prevState) => prevState + targetCharacter);
        };

        return { input, handleInput };
      };

      this.properties.keyboardInputs2 = document.querySelectorAll(
        ".use-keyboard-input2"
      );

      this.properties.keyboardInputs2.forEach((element) => {
        element.addEventListener("focus", () => {
          this.close();
        });
      });
    },

    _createIconHTML(icon_name) {
      return `<span class="material-icons">${icon_name}</span>`;
    },

    _createKeyBtn(iconName, class1, onclick, class2) {
      this.keyElement = document.createElement("button");

      // add common attributes and classes
      this.keyElement.setAttribute("type", "button");
      this.keyElement.classList.add("keyboard__key");

      // add specific listeners and classes
      this.keyElement.classList.add(class1, class2);
      this.keyElement.innerHTML = this._createIconHTML(iconName);
      this.keyElement.addEventListener("click", onclick);
    },

    _createKeys() {
      const fragment = document.createDocumentFragment();

      this.properties.keyLayout.forEach((key) => {
        const insertLineBreak =
          ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

        switch (key) {
          case "backspace":
            this._createKeyBtn("backspace", "keyboard__key--wide", () => {
              this.properties.value = this.properties.value.slice(0, -1);
              this._updateValueInTarget();
            });
            break;

          case "caps":
            this._createKeyBtn(
              "keyboard_capslock",
              "keyboard__key--activatable",
              () => {
                this.elements.capsKey.classList.toggle("keyboard__key--active");
                this._toggleCapsLock();
              },
              "keyboard__key--wide"
            );
            this.elements.capsKey = this.keyElement;
            break;

          case "enter":
            this._createKeyBtn("keyboard_return", "keyboard__key--wide", () => {
              this.properties.value += "\n";
              this._updateValueInTarget();
            });
            break;

          case "space":
            this._createKeyBtn(
              "space_bar",
              "keyboard__key--extra--wide",
              () => {
                this.properties.value += " ";
                this._updateValueInTarget();
              }
            );
            break;

          case "done":
            this._createKeyBtn(
              "check_circle",
              "keyboard__key--dark",
              () => {
                this.close();
                this._updateValueInTarget();
              },
              "keyboard__key--wide"
            );
            break;

          default:
            this._createKeyBtn();
            this.keyElement.textContent = key.toLowerCase();

            this.keyElement.addEventListener("click", () => {
              this.properties.value += this.properties.capsLock
                ? key.toUpperCase()
                : key.toLowerCase();
              this._updateValueInTarget();
            });
            break;
        }

        fragment.appendChild(this.keyElement);

        if (insertLineBreak) {
          fragment.appendChild(document.createElement("br"));
        }
      });
      return fragment;
    },

    _updateValueInTarget() {
      this.properties.keyboardInputs.forEach((keyboard) => {
        keyboard.value = this.properties.value;
        console.log(keyboard.value, "Input Nama");
        form.setFieldValue("nama", keyboard.value);
      });
    },

    _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;

      for (let key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();
        }
      }
    },

    open(initialValue, oninput) {
      this.properties.value = initialValue || "";
      this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
      this.properties.value = this.properties.value;
      this.elements.main.classList.add("keyboard--hidden");
    },
  };

  const Keyboard2 = {
    elements: {
      main: null,
      keysContainer: null,
      keys: [],
      capsKey: null,
    },

    properties: {
      value: "",
      capsLock: false,
      keyboardInputs: null,
      keyLayout: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "backspace",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "caps",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "enter",
        "done",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".",
        "?",
        "space",
      ],
    },

    init() {
      // create and setup main element
      this.elements.main = document.createElement("div");
      this.elements.main.classList.add("keyboard", "keyboard--hidden");
      document.body.appendChild(this.elements.main);

      // create and setup child container component
      this.elements.keysContainer = document.createElement("div");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.main.appendChild(this.elements.keysContainer);

      // create and setup key elements
      this.elements.keysContainer.appendChild(this._createKeys());
      this.elements.keys =
        this.elements.keysContainer.querySelectorAll(".keyboard__key");

      // open keyboard for elements with .use-keyboard-input
      this.properties.keyboardInputs = document.querySelectorAll(
        ".use-keyboard-input2"
      );

      this.properties.keyboardInputs.forEach((element) => {
        element.addEventListener("focus", () => {
          this.open(element.value, (currentValue) => {
            console.log("current value", currentValue);
            element.value = currentValue;
            form.setFieldValue("nomor", currentValue);
          });
        });
      });

      const useKeyboard = () => {
        const [input, setInput] = useState("");

        useEffect(() => {
          setInput("");
        });

        const handleInput = (targetCharacter) => {
          setInput((prevState) => prevState + targetCharacter);
        };

        return { input, handleInput };
      };

      const useKeyboard2 = () => {
        const [input, setInput] = useState("");

        useEffect(() => {
          setInput("");
        });

        const handleInput = (targetCharacter) => {
          setInput((prevState) => prevState + targetCharacter);
        };

        return { input, handleInput };
      };

      this.properties.keyboardInputs2 = document.querySelectorAll(
        ".use-keyboard-input"
      );

      this.properties.keyboardInputs2.forEach((element) => {
        element.addEventListener("focus", () => {
          this.close();
        });
      });
    },

    _createIconHTML(icon_name) {
      return `<span class="material-icons">${icon_name}</span>`;
    },

    _createKeyBtn(iconName, class1, onclick, class2) {
      this.keyElement = document.createElement("button");

      // add common attributes and classes
      this.keyElement.setAttribute("type", "button");
      this.keyElement.classList.add("keyboard__key");

      // add specific listeners and classes
      this.keyElement.classList.add(class1, class2);
      this.keyElement.innerHTML = this._createIconHTML(iconName);
      this.keyElement.addEventListener("click", onclick);
    },

    _createKeys() {
      const fragment = document.createDocumentFragment();

      this.properties.keyLayout.forEach((key) => {
        const insertLineBreak =
          ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

        switch (key) {
          case "backspace":
            this._createKeyBtn("backspace", "keyboard__key--wide", () => {
              this.properties.value = this.properties.value.slice(0, -1);
              this._updateValueInTarget();
            });
            break;

          case "caps":
            this._createKeyBtn(
              "keyboard_capslock",
              "keyboard__key--activatable",
              () => {
                this.elements.capsKey.classList.toggle("keyboard__key--active");
                this._toggleCapsLock();
              },
              "keyboard__key--wide"
            );
            this.elements.capsKey = this.keyElement;
            break;

          case "enter":
            this._createKeyBtn("keyboard_return", "keyboard__key--wide", () => {
              this.properties.value += "\n";
              this._updateValueInTarget();
            });
            break;

          case "space":
            this._createKeyBtn(
              "space_bar",
              "keyboard__key--extra--wide",
              () => {
                this.properties.value += " ";
                this._updateValueInTarget();
              }
            );
            break;

          case "done":
            this._createKeyBtn(
              "check_circle",
              "keyboard__key--dark",
              () => {
                this.close();
                this._updateValueInTarget();
              },
              "keyboard__key--wide"
            );
            break;

          default:
            this._createKeyBtn();
            this.keyElement.textContent = key.toLowerCase();

            this.keyElement.addEventListener("click", () => {
              this.properties.value += this.properties.capsLock
                ? key.toUpperCase()
                : key.toLowerCase();
              this._updateValueInTarget();
            });
            break;
        }

        fragment.appendChild(this.keyElement);

        if (insertLineBreak) {
          fragment.appendChild(document.createElement("br"));
        }
      });
      return fragment;
    },

    _updateValueInTarget() {
      this.properties.keyboardInputs.forEach((keyboard) => {
        keyboard.value = this.properties.value;
        console.log(keyboard.value, "Input Nomor");
        form.setFieldValue("nomor", keyboard.value);
      });
    },

    _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;

      for (let key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();
        }
      }
    },

    open(initialValue, oninput) {
      this.properties.value = initialValue || "";
      this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
      this.properties.value = this.properties.value;
      this.elements.main.classList.add("keyboard--hidden");
    },
  };

  useEffect(() => {
    Keyboard.init();
    Keyboard2.init();
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
        // console.log(dataxml, "dataxml");
        const status = dataxml.getElementsByTagName("status")[0].textContent;
        const productName = dataxml.getElementsByTagName("productName")[0].textContent;
        console.log(productName, "product name");
        // console.log(status);
        // const ProductName = (localStorage.getItem('productName'));
        // const retrievedDate = (localStorage)
        // console.log(items, "product name")
        if (status === "101") {
          const date = dayjs().format("YYYY MM-DD-HH:mm:ss SSS [Z] A");
          const name = form.getFieldsValue().nama;
          const nomor = form.getFieldsValue().nomor;
          
          setOpenTakeGift(true);
          console.log(date);
          localStorage.setItem(date, name + "," + nomor + "," + productName);
          // localStorage.setItem('dispensedDate', dispensedDate);
          //
          // localStorage.setItem("productName", productName )
        }
        else {
          navigate("/")
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
          <div className="header-form">
            <div className="left-nomor">
              <p
                style={{
                  fontSize: "45px",
                  color: "white",
                  paddingLeft: "110px",
                }}
              >
                Nomor 5
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
          <Form
            layout="vertical"
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={handleFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              style={{ marginBottom: "100px" }}
              label="NAMA"
              name="nama"
              colon={false}
              // rules={[
              //   {
              //     required: false,
              //     message: "Please input your name",
              //   },
              //   () => ({
              //     validator(_, value) {
              //       console.log(value.length, "tes");
              //       if (value.length < 2) {
              //         return Promise.resolve();
              //       }
              //       return Promise.reject("Maximum character name 25");
              //     },
              //   }),
              // ]}
            >
              <Input
                size="large"
                className="use-keyboard-input"
                // onFocus={() => {
                //   // setHiddenKeyboard(false);

                //   setActiveInput("nama");
                // }}
              />
            </Form.Item>

            <Form.Item
              label="NOMOR HANDPHONE"
              name="nomor"
              colon={false}
              // rules={[
              //   {
              //     required: false,
              //     message: "Please input your number",
              //   },
              //   () => ({
              //     validator(_, value) {
              //       console.log(value.length, "tes");
              //       if (value.length > 3) {
              //         return Promise.resolve();
              //       }
              //       return Promise.reject("Minimum your number 3");
              //     },
              //   }),
              // ]}
            >
              <Input
                className="use-keyboard-input2"
                size="large"
                // onFocus={() => {
                //   setActiveInput("nomor");
                // }}
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

            <Form.Item>
              {useKeyboard && useKeyboard2 ? (
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
                <Button htmlType="submit" className="btn-notfilled">
                  Ambil Hadiah
                </Button>
              )}
            </Form.Item>
          </Form>

          <h1
            style={{
              fontSize: "45px",
              color: "white",
              paddingTop: "135px",
              marginLeft: "500px",
            }}
          >
            5/5
          </h1>
        </MainLayout>
      </div>
    </>
  );
}

export default FormComponent;
