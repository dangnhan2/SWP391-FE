import React, { useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
import { FormProps } from "antd/lib";

type FieldType = {
  name: string;
  phone: string;
  address: string;
  email : string;
};

interface PropsValue {
    handleSearch : (v : string) => void
}

const InputSearch = (props : PropsValue) => {
  const {handleSearch} = props
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };


  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    let query = "";

    if (values.address) {
      query = `&Address=${values.address}`
    }
    if (values.name) {
      query += `&Name=${values.name}`;
    }
    if (values.phone) {
      query += `&PhoneNo=${values.phone}`;
    }
    if (values.email){
        query += `&Representative=${values.email}`
    }

    if (query) {
      handleSearch(query);
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item<FieldType>
              labelCol={{ span: 24 }} //whole column
              name="name"
              label="Tên"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<FieldType>
              labelCol={{ span: 24 }} //whole column
              name="address"
              label="Địa chỉ"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<FieldType>
              labelCol={{ span: 24 }} //whole column
              name="phone"
              label="SĐT"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<FieldType>
              labelCol={{ span: 24 }} //whole column
              name="email"
              label="Người đại diện"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                form.resetFields();
                handleSearch("");
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
export default InputSearch;