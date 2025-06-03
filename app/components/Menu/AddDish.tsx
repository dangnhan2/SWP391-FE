import { Col, Divider, Form, Input, InputNumber, Modal, Row } from "antd"

type FieldType = {
  name?: string;
  discount?: number;
};

interface PropsValue {
    open : boolean
    setOpen : (value : boolean) => void
}

const AddDish = (props : PropsValue) => {
    const [form] = Form.useForm();
    const {open, setOpen} = props

    const handleCancel = () => {
    setOpen(false);
    };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
  }
    return (
         <div>
       <Modal
         width={600}
         title="Thêm món ăn"
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
                     label="Món ăn"
                     name="name"
                     rules={[{ required: true, message: "Nhập tên" }]}
                 >
                     <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                     <Form.Item<FieldType>
                      
                      label="Giảm giá"
                      name="discount"
                      rules={[{ required: true, message: "Nhập giảm giá" }]}
                     >
                       <InputNumber min={1} style={{ width: '100%' }}/>
                      </Form.Item>
                </Col>  
             </Row>

             
           </Form>
         </div>
       </Modal>
      </div>
    )
}

export default AddDish;