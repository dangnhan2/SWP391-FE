"use client"
import { Col, Divider, Form, Input, InputNumber, Modal, Row } from "antd"
const { TextArea } = Input;

interface PropsValue {
    openEditModal : boolean
    setOpenEditModal : (value : boolean) => void
}

type FieldType = {
  fullname?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  gender?: string;
  note?: string;
};
const EditModal = (props : PropsValue) => {
   const {openEditModal, setOpenEditModal} = props
   const [form] = Form.useForm();

   const handleCancel = () => {
    setOpenEditModal(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

   return (
   <div>
    <Modal
      width={600}
      title="EditCustomer"
      open={openEditModal}
      onOk={form.submit}
      onCancel={handleCancel}
      okText="Tạo mới"
      cancelText="Hủy"
    >
      <Divider></Divider>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          form={form}
        //   onFinish={handleSubmit}
          fields={[
            {
              name : ["edit-customer"],
              value : 1
            }
          ]}
        >
          <Row gutter={[20,20]}>
             <Col span={12}>
                <Form.Item<FieldType>
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: "Nhập tên!" }]}
              >
                  <Input />
                 </Form.Item>
             </Col>
             <Col span={12}>
                  <Form.Item<FieldType>
                   
                   label="Phone Number"
                   name="phonenumber""
                    rules={[{ required: true, message: "Nhập số điện thoại!" }]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }}/>
                   </Form.Item>
             </Col>  
          </Row>
          
          <Row gutter={[20,20]}>
            <Col span={12}>
               <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Nhập email!" }]}
          >
            <Input />
          </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item<FieldType>
            label="Address"
            name="address"
            rules={[{ required: true, message: "Nhập địa chỉ!" }]}
           >
            <Input />
          </Form.Item>
            </Col>

          </Row>

           <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select options={[{ value: "Male" }, { value: "Female" }]} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item<FieldType> label="Note" name="note">
              <TextArea rows={4} placeholder="Enter note (e.g: VIP)" />
            </Form.Item>
          </Col>
        </Row>

          <Row>

              <Col span={24}>
              <Form.Item<FieldType> label="Ghi Chú">
              
              <TextArea  onChange={onChange} rows={4}/>
              </Form.Item>
              </Col>
          </Row>
          
        </Form>
      </div>
    </Modal>
   </div>)
}
export default EditModal