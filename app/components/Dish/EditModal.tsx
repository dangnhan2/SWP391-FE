"use client"
import { MAX_UPLOAD_IMAGE_SIZE } from "@/app/helper";
import { DeleteImage, UpdateDish, UploadImage } from "@/app/service/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Divider, Form, GetProp, Image, Input, InputNumber, message, Modal, notification, Row, Select, Upload, UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { FormProps } from "antd/lib";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;
interface PropsValue {
    openEditModal : boolean
    setOpenEditModal : (value : boolean) => void
    dataDish : IDish  | undefined
    fetchDishes : () => void
}

type FieldType = {
  id : number,
  name: string;
  imageUrl: any;
  price: number;
  category: string;
  description?: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const EditModal = (props : PropsValue) => {
   const {openEditModal, setOpenEditModal, dataDish, fetchDishes} = props
   const [messageApi, messageContext] = message.useMessage();
   const [notificationApi, notificationContext] = notification.useNotification();
   const [form] = Form.useForm();
   const [previewOpen, setPreviewOpen] = useState<boolean>(false);
   const [previewImage, setPreviewImage] = useState("");
   const [loading, setLoading] = useState<boolean>(false);
   const [fileList, setFileList] = useState<UploadFile[]>([]);
  
   const openNotification = (type: 'success' | 'error', message: string, description: string, placement: NotificationArgsProps['placement'] = 'topRight') => {
       notificationApi[type]({
         message,
         description,
         placement,
       });
     };

   const normFile = (e: any) => {
    // console.log("Upload event:", e);
   if (Array.isArray(e)) return e;
      return e?.fileList || [];
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

  useEffect(() => {
    if(dataDish){
      form.setFieldsValue({
        id: dataDish.id,
        // imageUrl: dataDish.imageUrl,
        name: dataDish.name,
        price: dataDish.price,
        category: dataDish.category,
        description: dataDish.description,
      });
      if (dataDish.imageUrl) {
      const file: UploadFile = {
        uid: uuidv4(),
        name: dataDish.name,
        status: "done",
        url: dataDish.imageUrl,
      };
      setFileList([file]);
    }     
    }
  },[dataDish])  
  
  const handleSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
  const { id, name, category, price, description, imageUrl } = values;

  let imageUrlRes = dataDish?.imageUrl; // mặc định giữ nguyên ảnh cũ

  // Nếu người dùng đã chọn ảnh mới
  const fileObj = imageUrl?.[0]?.originFileObj as File;

  if (fileObj) {
    // ✅ Xóa ảnh cũ
    if (dataDish?.imageUrl) {
      await DeleteImage(dataDish.imageUrl);
    }

    // ✅ Upload ảnh mới
    const uploadRes = await UploadImage(fileObj);
    imageUrlRes = uploadRes.data;
  }

  // Gọi API cập nhật món ăn
  const res = await UpdateDish(id, name, category, price, description || "", imageUrlRes!);

  if (res && res.statusCode === 200) {
    messageApi.success(res.msg);
    setOpenEditModal(false);
    form.resetFields();
    fetchDishes();
   }else{
     openNotification('error', 'Lỗi dữ liệu', res.msg);
   }
  };

  const handleCancel = () => {
    setOpenEditModal(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };

   return (
   <div>
    {messageContext}
    {notificationContext}
    <Modal
      width={600}
      title="Cập nhật thông tin"
      open={openEditModal}
      onOk={form.submit}
      onCancel={handleCancel}
      okText="Cập nhật"
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
          <Form.Item<FieldType>          
                   label="Id"
                   name="id"
                   hidden={true}
                    rules={[{ required: true, message: "Nhập tên!" }]}
                  >
                    <Input readOnly/>
          </Form.Item>

          <Row gutter={[20,20]}>
              <Col span={12}>
                <Form.Item<FieldType>
                  label="Hình ảnh"
                  name="imageUrl"
                  getValueFromEvent={normFile}
                  // valuePropName="fileList"
              >
                <Upload
                  onPreview={handlePreview}
                  multiple={false}
                  maxCount={1}
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={(info) => {
                    handleChange(info); 
                    setFileList(info.fileList);
                  }}
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
            <InputNumber min={1} style={{ width: '100%' }}/>
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
export default EditModal;