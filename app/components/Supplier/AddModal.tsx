"use client"
import { AddSupplier } from "@/app/service/api";
import { Col, Divider, Form, Input, message, Modal, Row,notification } from "antd"
import { FormProps } from "antd/lib";
const { TextArea } = Input;

interface PropsValue {
    open : boolean
    setOpen : (value : boolean) => void
    fetchSupplier : () => void
}

type FieldType = {
  name: string;
  phone: string;
  email: string;
  address: string;
  representative? : string | undefined;
};


const AddModal = (props : PropsValue) => {
   const {open, setOpen, fetchSupplier} = props
   const [form] = Form.useForm();
  const [messageApi, messageContext] = message.useMessage();
  const [notificationApi, notificationContext] = notification.useNotification();

   const openNotification = (type: 'success' | 'error', message: string, description: string, placement: NotificationArgsProps['placement'] = 'topRight') => {
    notificationApi[type]({
      message,
      description,
      placement,
    });
  };

   const handleCancel = () => {
    setOpen(false);
  };

   const handleSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
     const {name,phone,email,address,representative} = values
     
     let res = await AddSupplier(name,phone,email,address,representative!);
     
     console.log(res);
     
     if(res && res.statusCode === 201){
       messageApi.success(res.msg);
        setOpen(false);
        form.resetFields();
        fetchSupplier();
     }else{
        openNotification('error', 'Lỗi dữ liệu', res.msg);
     }

  };

   return (
   <div>
    {messageContext}
    {notificationContext}
    <Modal
      width={600}
      title="Thêm nhà cung cấp"
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
          onFinish={handleSubmit}
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
                  label="Tên nhà cung cấp"
                  name="name"
                  rules={[{ required: true, message: "Nhập tên!" }]}
              >
                  <Input />
                 </Form.Item>
             </Col>
             <Col span={12}>
                  <Form.Item<FieldType>
                   
                   label="Số điện thoại"
                   name="phone"
                    rules={[{ required: true, message: "Nhập điện thoại!" }]}
                  >
                    <Input/>
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
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Nhập địa chỉ!" }]}
           >
            <Input />
          </Form.Item>
            </Col>

          </Row>
          <Row>

              <Col span={12}>
              <Form.Item<FieldType> label="Người đại diện" name="representative">
              
               <Input />
              </Form.Item>
              </Col>
          </Row>
          
        </Form>
      </div>
    </Modal>
   </div>)
}
export default AddModal