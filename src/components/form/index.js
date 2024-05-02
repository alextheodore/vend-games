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
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
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
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
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
