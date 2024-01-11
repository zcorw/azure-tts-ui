import React from "react";
import { Form, Input, Select, Button } from "antd";
import { FieldType, FormType } from "./Tasks.d";

interface FormProps {
  onSubmit: (data: FormType) => void;
}

const FormComponent: React.FC<FormProps> = (props: FormProps) => {
  const [form] = Form.useForm<FormType>();
  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        console.log("通过");
        const data = form.getFieldsValue();
        props.onSubmit(data);
      })
      .catch(() => {
        console.log("未通过");
      });
  };
  return (
    <Form<FormType> form={form} initialValues={{ lang: 1 }} layout="vertical">
      <Form.Item<FieldType>
        name="title"
        label="标题"
        rules={[{ required: true, message: "标题不能为空" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        name="content"
        label="内容"
        rules={[{ required: true, message: "内容不能为空" }]}
      >
        <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
      </Form.Item>
      <Form.Item<FieldType> name="lang" label="语言">
        <Select
          options={[
            {
              value: 1,
              label: "普通话",
            },
            {
              value: 2,
              label: "英语",
            },
            {
              value: 3,
              label: "日语",
            },
          ]}
          style={{ width: "120px" }}
        ></Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
