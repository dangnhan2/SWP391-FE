"use client";
import {
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

const { Option } = Select;

interface PropsValue {
  open: boolean;
  setOpen: (value: boolean) => void;
}

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
      title={<h2 style={{ marginBottom: 0 }}>Add New Employee</h2>}
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
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Enter full name!" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Enter phone number!" }]}
            >
              <Input placeholder="Enter phone" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Enter email!" },
                { type: "email", message: "Enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Enter address!" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Choose gender!" }]}
            >
              <Select placeholder="Choose gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Choose role!" }]}
            >
              <Input.Group compact>
                <Select placeholder="Choose role" style={{ width: "calc(100% - 32px)" }}>
                  <Option value="admin">Admin</Option>
                  <Option value="staff">Staff</Option>
                  <Option value="manager">Manager</Option>
                </Select>
                <Button icon={<PlusOutlined />} />
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center" gutter={20}>
          <Col>
            <Button onClick={handleCancel} danger size="large" style={{ backgroundColor: "red", color: "#fff" }}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" size="large" style={{ backgroundColor: "#4F7BFE" }}>
              Confirm
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddModal;