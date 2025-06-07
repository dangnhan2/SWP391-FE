"use client"
import { GetUnits } from "@/app/service/api";
import { Col, Divider, Form, Input, InputNumber, Modal, Row, Select } from "antd"
import { log } from "console";
import { useEffect, useState } from "react";
const { TextArea } = Input;

interface PropsValue {
    open : boolean
    setOpen : (value : boolean) => void
}

interface DataValue {
  id : number,
  name: string,
}

type FieldType = {
  name?: string;
  quantity?: string;
  price?: number;
  unit?: string;
  description? : string;
};

const AddModal = (props : PropsValue) => {
   const {open, setOpen} = props
   const [unit, setUnit] = useState<DataValue[]>([]);
   const [form] = Form.useForm();
   
   useEffect(() => {
    const fetchUnit = async () => {
      let res = await GetUnits();
      console.log(res);
      if(res && res.statusCode === 200){
          setUnit(res.data);
      }
    }
    fetchUnit();
   },[])

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
      title="Thêm nguyên liệu mới"
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
                  label="Tên nguyên liệu"
                  name="name"
                  rules={[{ required: true, message: "Nhập tên!" }]}
              >
                  <Input />
                 </Form.Item>
             </Col>
             <Col span={12}>
                  <Form.Item<FieldType>
                   
                   label="Số lượng"
                   name="quantity"
                    rules={[{ required: true, message: "Nhập số lượng!" }]}
                  >
                    <InputNumber min={1} defaultValue={1} style={{ width: '100%' }}/>
                   </Form.Item>
             </Col>  
          </Row>
          
          <Row gutter={[20,20]}>
            <Col span={12}>
               <Form.Item<FieldType>
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Nhập giá!" }]}
          >
            <Input />
          </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item<FieldType>
            label="Đơn vị"
            name="unit"
            rules={[{ required: true, message: "Nhập đơn vị!" }]}
           >
            {/* [{ value: 'sample', label: <span>sample</span> }] */}
            <Select options={unit.map(u => (
              { value: u.id, 
                label: <span>{u.name}</span> 
              }
            ))} />
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
export default AddModal

          
