"use client"
import { GetDishById } from "@/app/service/api";
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
    const [data, setData] = useState<IDish>();

    useEffect(() => {
        const fetch = async () => {
           let res = await GetDishById(id);
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
    children: <p>{data?.name}</p>,
  },
  {
    key: '2',
    label: 'Hình ảnh',
     children: (
      <img
        src={data?.imageUrl}
        alt="Hình ảnh sản phẩm"
        style={{ maxWidth: '100%', maxHeight: 100, objectFit: 'contain' }}
      />
     )
  },
  {
    key: '3',
    label: 'Danh mục',
    children: <p>{data?.category}</p>,
  },
  {
    key: '4',
    label: 'Giá',
    children: <p>{data?.price}</p>,
  },
  {
    key: '5',
    label: 'Ghi chú',
    children: <p>{data?.description}</p>,
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
        <Descriptions items={items} bordered  column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}/>
      </Modal>
    )

}
export default ViewModal;