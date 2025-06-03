"use client"
import { Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import React from "react";

const { TextArea } = Input;
const { Option } = Select;

interface PropsValue {
  open: boolean;
  setOpen: (value: boolean) => void;
}

type FieldType = {
  name?: string;
  price?: number;
  category?: string;
  description?: string;
  image?: string;
};

const AddModal = (props: PropsValue) => {
  const { open, setOpen } = props;
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFinish = (values: any) => {
    console.log("Submitted values:", values);
    setOpen(false);
  };

  return (
    <Modal
      width={700}
      title={<h2 style={{ marginBottom: 0 }}>Add New Dish</h2>}
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ maxWidth: 700 }}
      >
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => e?.fileList}
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Choose file</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Enter name!" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Price"
              name="price"
              rules={[{ required: true, message: "Enter price!" }]}
            >
              <InputNumber
                placeholder="Enter price"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Category"
              name="category"
              rules={[{ required: true, message: "Choose category!" }]}
            >
              <Select placeholder="Choose category">
                <Option value="starter">Starter</Option>
                <Option value="main">Main</Option>
                <Option value="dessert">Dessert</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: "Enter description!" }]}
        >
          <TextArea
            placeholder="Enter description: (e.g: Omatsuri Manbo)"
            rows={4}
          />
        </Form.Item>

        <Row justify="center" gutter={20}>
          <Col>
            <Button onClick={handleCancel} danger size="large">
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" size="large">
              Confirm
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddModal;