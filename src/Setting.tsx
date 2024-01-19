import React, { useEffect, useState } from "react";
import { SettingOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import "./Setting.css";

type SettingProps = {
  host: string;
};
const Setting: React.FC = () => {
  const [isShow, setIsShow] = useState(true);
  const [form] = Form.useForm<SettingProps>();
  const host = Form.useWatch("host", form);
  if (typeof chrome.storage !== "undefined") {
    useEffect(() => {
      chrome.storage.local.get(["url"], (result) => {
        form.setFieldValue("host", result.url);
      });
    }, []);
    useEffect(() => {
      chrome.storage.local.set({ url: host });
    }, [host]);
  }
  return (
    <div className="setting-box">
      <div className="url-input">
        {isShow && (
          <Form form={form}>
            <Form.Item label="host" name="host">
              <Input />
            </Form.Item>
          </Form>
        )}
      </div>
      <div className="button">
        <a onClick={() => setIsShow(!isShow)}>
          {!isShow ? <SettingOutlined /> : <CloseOutlined />}
        </a>
      </div>
    </div>
  );
};

export default Setting;
