"use client";
import { Modal, Form, Input, Row, Col, Select, Button, Upload, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";

const { TextArea } = Input;

interface PropsValue {
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
}

interface DishType {
  image?: string;
  name?: string;
  price?: string;
  category?: string;
  description?: string;
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
      title={<h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Edit Dish</h2>}
      open={openEditModal}
      footer={null}
      onCancel={handleCancel}
      width={700}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={6}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3043/3043501.png"
              alt="dish"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </Col>
          <Col span={9}>
            <Form.Item label="Image">
              <Upload>
                <Button icon={<UploadOutlined />}>Choose file</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item<DishType>
              label="Name"
              name="name"
              initialValue="American Coffee"
              rules={[{ required: true, message: "Please enter the dish name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<DishType>
              label="Price"
              name="price"
              initialValue="$1"
              rules={[{ required: true, message: "Please enter the price" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<DishType>
              label="Category"
              name="category"
              initialValue="Coffee"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select options={[{ value: "Coffee" }, { value: "Tea" }, { value: "Juice" }]} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<DishType>
          label="Description"
          name="description"
          initialValue="Omatsuri Manbo"
        >
          <TextArea rows={4} />
        </Form.Item>

        <Divider />

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
