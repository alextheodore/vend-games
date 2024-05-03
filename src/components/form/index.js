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


function FormComponent() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
            <Form.Item className="form-username"
              label="Nama"
              name="nama"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]} 
            >
              <Input className="form-input-nama"/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="form-input-password" />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox style={{ fontSize: "40px", width: "90%" }}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Ambil Hadiah
              </Button>
            </Form.Item>
          </Form>
        </MainLayout>
      </div>
    </>
  );
}

export default FormComponent;
