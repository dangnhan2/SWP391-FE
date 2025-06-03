"use client";
import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
import React from "react";

interface PropsValue {
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
}

interface EmployeeType {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  gender?: string;
  role?: string;
  status?: string;
}

const EditModal = (props: PropsValue) => {
  const { openEditModal, setOpenEditModal } = props;
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpenEditModal(false);
  };

  const handleConfirm = () => {
    form.validateFields().then((values) => {
      console.log("Submitted values:", values);
      setOpenEditModal(false);
    });
  };

  return (
    <Modal
      title={<h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Edit Employee</h2>}
      open={openEditModal}
      footer={null}
      onCancel={handleCancel}
      width={700}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<EmployeeType>
              label="Full Name"
              name="fullName"
              initialValue="Christine Brooks"
              rules={[{ required: true, message: "Please enter the full name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<EmployeeType>
              label="Phone Number"
              name="phoneNumber"
              initialValue="0393943949"
              rules={[{ required: true, message: "Please enter the phone number" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<EmployeeType>
              label="Email"
              name="email"
              initialValue="chirs@gmail.com"
              rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<EmployeeType>
              label="Address"
              name="address"
              initialValue="Kokoro Kara"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item<EmployeeType>
              label="Gender"
              name="gender"
              initialValue="Male"
            >
              <Select options={[{ value: "Male" }, { value: "Female" }]} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<EmployeeType>
              label="Role"
              name="role"
              initialValue="Staff"
            >
              <Select options={[{ value: "Staff" }, { value: "Manager" }, { value: "Admin" }]} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<EmployeeType>
              label="Status"
              name="status"
              initialValue="Working"
            >
              <Select options={[{ value: "Working" }, { value: "On Leave" }, { value: "Resigned" }]} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center" gutter={16}>
          <Col>
            <Button onClick={handleCancel} style={{ backgroundColor: "#FF3B30", color: "white" }} size="large">
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleConfirm} style={{ backgroundColor: "#4F7BFF" }} size="large">
              Confirm
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditModal;
