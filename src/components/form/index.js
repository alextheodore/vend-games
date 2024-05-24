import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import MainLayout from "../layout/main";
import Start from "../../assets/start.gif";
import BRI from "../../assets/BRI_white.png";
import Quiz from "../../assets/quiz.png";
import useQuery from "../Hooks";
import Check from "../../assets/check.gif";
import Error from "../../assets/err.gif";
import Question from "../question";
import { useEffect } from "react";
import { dummyData } from "../../dummy";
import "./index.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function FormComponent() {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activeInput, setActiveInput] = useState("");
  const onChanged = (input) => {
    console.log(input);
    form.setFieldsValue({
      [activeInput]: input,
    });
  };

  // form.setFieldValue("nama", input);
  // form.setFieldValue("nomor", input);
  const [hiddenKeyboard, setHiddenKeyboard] = useState(true);
  // form.setFieldsValue //nama:value masuk ke onChanged
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            onFinish={onFinish}
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
                  if (value && (value.length > 25)) {
                    return Promise.reject(<text style={{ fontSize: '30px', fontWeight: 'bold', color: 'red' }}>"Nama tidak boleh lebih dari 25 karakter."</text>);
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
                  message: "Please input your password!",
                },
                {
                  validator: (_, value) => {
                    if (value && (value.length < 3)) {
                      return Promise.reject(<text style={{ fontSize: '30px', fontWeight: 'bold', color: 'red' }}>"Nomor tidak boleh kurang dari 3 nomor."</text>);
                    }
                    return Promise.resolve();
                  },
                  },
              ]}
            >
              <Input.Password
                className="form-input-password"
                onFocus={() => {
                  setHiddenKeyboard(false);
                  setActiveInput("nomor");
                }}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="btn-form">
                Ambil Hadiah
              </Button>
            </Form.Item>
          </Form>
          {!hiddenKeyboard && <Keyboard onChange={onChanged} />}
        </MainLayout>
      </div>
    </>
  );
}

export default FormComponent;
