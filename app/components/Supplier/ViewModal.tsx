"use client"
import { GetSupplierById } from "@/app/service/api";
import { Descriptions, Divider, Modal } from "antd";
import { DescriptionsProps } from "antd/lib";
import { useEffect, useState } from "react";

interface PropsValue {
    openView : boolean,
    setOpenView : (v : boolean) => void
    id:number
}
const ViewModal = (props : PropsValue) => {
    const {openView, setOpenView, id} = props;
    const [data, setData] = useState<ISupplier>();
    useEffect(() => {
        const fetch = async () => {
            let res = await GetSupplierById(id);

            if(res && res.statusCode === 200){
                setData(res.data);
            }
        }
        fetch();
        
    },[id])

    const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Tên',
    span: {xxl: 1},
    children: <p>{data?.name}</p>,
  },
  {
    key: '2',
    label: 'SĐT',
     span: {xxl: 1},
    children: <p>{data?.phoneNo}</p>,
  },
  {
    key: '3',
    label: 'Địa chỉ',
     span: {xxl: 1},
    children: <p>{data?.address}</p>,
  },
  {
    key: '4',
    label: 'Email',
    span: {xxl: 1},
    children: <p>{data?.email}</p>,
  },
  {
    key: '5',
    label: 'Người đại diện',
     span: {xxl: 1},
    children: <p>{data?.representative}</p>,
  },
];
   const handleCancel = () => {
    setOpenView(false);
   }

    return (

   <Modal
        width={700}
        title="Thông tin chi tiết"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={openView}
        onCancel={handleCancel}
        footer={false}
      > 
      <Divider></Divider>
        <Descriptions items={items} bordered column={{ xxl: 1 }}/>
      </Modal>
    )
}
export default ViewModal;