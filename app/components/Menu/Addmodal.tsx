"use client"
import { Col, Divider, Form, Input, InputNumber, Modal, Row, Select } from "antd"
import MenuList from "./MenuList";
const { TextArea } = Input;

interface PropsValue {
    open : boolean
    setOpen : (value : boolean) => void
}

type FieldType = {
  name?: string;
  status?: string;
  price?: number;
  unit?: string;
  description? : string;
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
      width={800}
      title="Thêm thực đơn mới"
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
          autoComplete="off"
          form={form}
        //   onFinish={handleSubmit}
          fields={[
            {
              name : ["quantity"],
              value : 1
            }
          ]}
        >
          <Row gutter={[20,20]}>
             <Col span={12}>
                <Form.Item<FieldType>
                  label="Menu"
                  name="name"
                  rules={[{ required: true, message: "Nhập tên" }]}
              >
                  <Input />
                 </Form.Item>
             </Col>
             <Col span={12}>
                  <Form.Item<FieldType>
                   
                   label="Trang thái"
                   name="status"
                   rules={[{ required: true, message: "Chọn trạng thái" }]}
                  >
                    <Select options={[{ value: 'active', label: <span>Active</span> } , { value: 'inactive', label: <span>Inactive</span> }]} />
                   </Form.Item>
             </Col>  
          </Row>
          
          <Row gutter={[20,20]}>
            <Col span={24}>
               <Form.Item<FieldType>
            label="Ghi chú"
            name="description"
            rules={[{ required: false }]}
          >
            <TextArea  onChange={onChange} rows={4}/>
          </Form.Item>
            </Col>

          </Row>
          
        </Form>
      </div>
      <MenuList></MenuList>
    </Modal>

   </div>
   )
}
export default AddModal