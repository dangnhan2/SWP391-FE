"use client"
import { Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;

interface PropsValue {
    open : boolean
    setOpen : (value : boolean) => void
}

type FieldType = {
  image?: any;
  name?: string;
  price?: number;
  category?: string;
  description?: string;
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
      title="Add New Dish"
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
                  label="Image"
                  name="image"
                  valuePropName="file"
              >
                     <Upload beforeUpload={() => false} maxCount={1}>
                <Input addonBefore="Choose file" readOnly value="No file choosen" />
              </Upload>
                 </Form.Item>
             </Col>
             <Col span={12}>
                  <Form.Item<FieldType>
                   
                   label="Name"
                   name="name"
                    rules={[{ required: true, message: "Nhập tên!" }]}
                  >
                    <InputNumber min={1} defaultValue={1} style={{ width: '100%' }}/>
                   </Form.Item>
             </Col>  
          </Row>
          
          <Row gutter={[20,20]}>
            <Col span={12}>
               <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ required: true, message: "Nhập giá!" }]}
          >
            <Input />
          </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item<FieldType>
            label="Category"
            name="category"
            rules={[{ required: true, message: "Nhập loại!" }]}
           >
            <Select options={[{ value: 'Coffee', label: <span>Coffee</span> } , { value: 'Tea', label: <span>Tea</span> }]} />
          </Form.Item>
            </Col>

          </Row>
          <Row>

              <Col span={24}>
              <Form.Item<FieldType> label="Description">
              
              <TextArea  onChange={onChange} rows={4}/>
              </Form.Item>
              </Col>
          </Row>
          
        </Form>
      </div>
    </Modal>
   </div>)
}
export default AddModal