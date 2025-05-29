"use client"
import { Col, Divider, Form, Input, InputNumber, Modal, Row } from "antd";

const { TextArea } = Input;
interface PropsValue {
    openEditModal : boolean
    setOpenEditModal : (value : boolean) => void
}

type FieldType = {
  name?: string;
  quantity?: string;
  price?: number;
  unit?: string;
  description? : string;
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
         title="Thêm menu mới"
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
                     label="Menu"
                     name="name"
                     rules={[{ required: true, message: "Nhập tên!" }]}
                 >
                     <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                     <Form.Item<FieldType>
                      
                      label="Trang thai"
                      name="quantity"
                       rules={[{ required: true, message: "Nhập số lượng!" }]}
                     >
                       <InputNumber min={1} style={{ width: '100%' }}/>
                      </Form.Item>
                </Col>  
             </Row>
             
             <Row gutter={[20,20]}>
               <Col span={24}>
                  <Form.Item<FieldType>
               label="Ghi chú"
               name="price"
               rules={[{ required: true, message: "Nhập giá!" }]}
             >
               <TextArea  onChange={onChange} rows={4}/>
             </Form.Item>
               </Col>
   
             </Row>
             
           </Form>
         </div>
       </Modal>
      </div>
      )
}
export default EditModal;