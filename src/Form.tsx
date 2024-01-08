import React from "react";
import { Form, Button } from "antd";

type FieldType = {
  title?: string;
  content?: string;
  lang?: number;
};

const FormComponent: React.FC = () => {
  const [form] = Form.useForm<FieldType>();
  return (
    <Form<FieldType> form={form} initialValues={{ lang: 1 }} layout="vertical">
      <Form.Item<FieldType> name="title" label="标题">
        <input />
      </Form.Item>
      <Form.Item<FieldType> name="content" label="内容">
        <input />
      </Form.Item>
      <Form.Item<FieldType> name="lang" label="语言">
        <select>
          <option value="1">普通话</option>
          <option value="2">英语</option>
          <option value="3">日语</option>
        </select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
