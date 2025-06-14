import React, { useState } from "react";
import { Button, Col, Form, Input, InputNumber, Row, Select, theme } from "antd";
import { FormProps } from "antd/lib";

type FieldType = {
  name: string;
  category: string;
  price: number;
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

    if (values.category) {
      query = `&Category=${values.category}`
    }
    if (values.name) {
      query += `&Name=${values.name}`;
    }
    if (values.price) {
      query += `&Price=${values.price}`;
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
          <Col span={8}>
            <Form.Item<FieldType>
              labelCol={{ span: 24 }} //whole column
              name="name"
              label="Món ăn"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FieldType>
              labelCol={{ span: 24 }} //whole column
              name="category"
              label="Danh mục"
            >
             <Select options={[{ value: 'Drink', label: <span>Thức uống</span> } , { value: 'Food', label: <span>Đồ ăn</span> }]} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item<FieldType>
              labelCol={{ span: 24 }} //whole column
              name="price"
              label="Giá"
            >
              <InputNumber style={{ width: '100%' }} min={1}/>
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