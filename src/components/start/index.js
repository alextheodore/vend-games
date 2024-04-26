import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import MainLayout from "../layout/main";
import { Button, Modal } from "antd";
import Start from "../../assets/start.gif";
import BRI from "../../assets/BRI_white.png";

function StartComponent() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
    // navigate(`/${id}`)
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };

  const modalFooter = (
    <div style={{ textAlign: "center" }}>
      <Button onClick={oncancel} type={"primary"}>
        Mulai
      </Button>
    </div>
  );

  return (
    <div className="bgr">
      <MainLayout>
        <div className="logo-bri" style={{ textAlign : 'end' }}>
          <img src={BRI} style={{ width: "15%", alignItems: "end" }} />
        </div>
        <Modal
          centered
          title="BRI QUIZ"
          open={open}
          onOk={handleOk}
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
          <img src={Start} style={{ width: "100%" }} />
        </Modal>
      </MainLayout>
    </div>
  );
}

export default StartComponent;
