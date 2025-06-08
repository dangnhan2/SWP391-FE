"use client"
import { Col, Divider, Form, Input, InputNumber, Modal, Row, Select } from "antd";
const { TextArea } = Input;

interface PropsValue {
    open : boolean
    setOpen : (value : boolean) => void
}

type FieldType = {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  gender?: string;
  note?: string;
};
const AddModal = (props : PropsValue) => {
   const {open, setOpen} = props
   const [form] = Form.useForm();

   const handleCancel = () => {
    setOpen(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

   return (
   <div>
    <Modal
      width={600}
      title="Add New Customer"
      open={open}
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
        >
          <Row gutter={[20,20]}>
             <Col span={12}>
                <Form.Item<FieldType>
                  label="Full Name"
                  name="fullName"
                  rules={[{ required: true, message: "Nhập tên!" }]}
              >
                  <Input />
                 </Form.Item>
             </Col>
             <Col span={12}>
                  <Form.Item<FieldType>
                   
                   label="Phone Number"
                   name="phone"
                    rules={[{ required: true, message: "Nhập số điện thoại !" }]}
                  >
                    <InputNumber min={1} defaultValue={1} style={{ width: '100%' }}/>
                   </Form.Item>
             </Col>  
          </Row>
          
          <Row gutter={[20,20]}>
            <Col span={12}>
               <Form.Item<FieldType>
            label="Email "
            name="email"
            rules={[{ required: true, message: "Nhập email !" }]}
          >
            <Input />
          </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item<FieldType>
            label="Address "
            name="address"
            rules={[{ required: true, message: "Nhập địa chỉ !" }]}
           >
            <Input />
          </Form.Item>
            </Col>
            <Col span={12}>
                  <Form.Item<FieldType>
                   label="Gender"
                   name="gender"
                   rules={[{ required: true, message: "Chọn giới tính " }]}
                  >
                    <Select options={[{ value: 'male', label: <span>Male</span> } , { value: 'female', label: <span>Female</span> }]} />
                   </Form.Item>
             </Col>  
        </Row>

          <Row>

              <Col span={24}>
              <Form.Item<FieldType> label="Note">
              
              <TextArea  onChange={onChange} rows={4}/>
              </Form.Item>
              </Col>
          </Row>
          
        </Form>
      </div>
    </Modal>
   </div>)
}
export default AddModal;

          
