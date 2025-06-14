"use client"
import { Col, Divider, Form, FormProps, GetProp, Image, Input, InputNumber, message, Modal, notification, NotificationArgsProps, Row, Select, Upload, UploadFile } from "antd";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/lib";
import { useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { AddDish, UploadImage } from "@/app/service/api";
import { MAX_UPLOAD_IMAGE_SIZE } from "@/app/helper";


const { TextArea } = Input;

interface PropsValue {
    open : boolean
    setOpen : (value : boolean) => void
    fetchDishes : () => void
}

type FieldType = {
  name: string;
  imageUrl: any;
  price: number;
  category: string;
  description?: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const AddModal = (props : PropsValue) => {
   const {open, setOpen, fetchDishes} = props
   const [form] = Form.useForm();
   const [previewOpen, setPreviewOpen] = useState<boolean>(false);
   const [previewImage, setPreviewImage] = useState("");
   const [loading, setLoading] = useState<boolean>(false);
   const [messageApi, messageContext] = message.useMessage();
   const [notificationApi, notificationContext] = notification.useNotification();
  
   const openNotification = (type: 'success' | 'error', message: string, description: string, placement: NotificationArgsProps['placement'] = 'topRight') => {
       notificationApi[type]({
         message,
         description,
         placement,
       });
     };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
  };

  const normFile = (e: any) => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < MAX_UPLOAD_IMAGE_SIZE;
    if (!isLt2M) {
      message.error(`Image must smaller than ${MAX_UPLOAD_IMAGE_SIZE}MB!`);
    }
    return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = (
    info: UploadChangeParam,
  ) => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
        setLoading(false)
    }
  };


  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit : FormProps<FieldType>['onFinish'] =  async (values) => {
     const {name,category,price,description,imageUrl} = values
     
     const fileObj = imageUrl?.[0]?.originFileObj as File;
    //  console.log(fileObj);
     
     if (!fileObj) {
      message.error("Bạn chưa chọn ảnh.");
      return;
     }

    // Gọi API upload ảnh
    const uploadRes = await UploadImage(fileObj);
    
    console.log(uploadRes);
    const imageUrlRes = uploadRes.data;
    console.log(imageUrlRes);
    
    // Gọi API tạo món ăn
    let res = await AddDish(name, category, price, description!, imageUrlRes);

    if (res && res.statusCode === 201) {
      messageApi.success(res.msg);
      setOpen(false);
      fetchDishes();
      form.resetFields();
     } else {
      openNotification('error', 'Lỗi dữ liệu', res.msg);
     }
  }

   return (
   <div>
    {messageContext}
    {notificationContext}
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
          onFinish={handleSubmit}
        >
          <Row gutter={[20,20]}>
             <Col span={12}>
                <Form.Item<FieldType>
                  label="Hình ảnh"
                  name="imageUrl"
                  getValueFromEvent={normFile}
                  valuePropName="fileList"
                  rules={[
                  { required: true, message: "Hãy upload ảnh" },
                ]}
              >
                <Upload
                  onPreview={handlePreview}
                  multiple={false}
                  maxCount={1}
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info)}
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
                 </Form.Item>
             </Col>
             <Col span={12}>
                  <Form.Item<FieldType>
                   
                   label="Name"
                   name="name"
                    rules={[{ required: true, message: "Nhập tên!" }]}
                  >
                    <Input/>
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
            <InputNumber min={1} defaultValue={1} style={{ width: '100%' }}/>
          </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item<FieldType>
            label="Category"
            name="category"
            rules={[{ required: true, message: "Nhập loại!" }]}
           >
            <Select options={[{ value: 'Drink', label: <span>Thức uống</span> } , { value: 'Food', label: <span>Đồ ăn</span> }]} />
          </Form.Item>
            </Col>

          </Row>
          <Row>

              <Col span={24}>
              <Form.Item<FieldType> label="Description" name="description">
              
              <TextArea  onChange={onChange} rows={4}/>
              </Form.Item>
              </Col>
          </Row>
          
        </Form>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Modal>
   </div>)
}
export default AddModal