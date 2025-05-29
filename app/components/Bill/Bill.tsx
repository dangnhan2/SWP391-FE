"use client"
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm,Table } from "antd";
import { TableProps } from "antd/lib";
import { useState } from "react";


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const Bill = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [openEditModal,setOpenEditModal] = useState<boolean>(false)
  const [data, setData] = useState();
   const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Khách hàng',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Bàn',
    dataIndex: 'table',
    key: 'table',
  },
   {
    title: 'Thời gian xuất',
    dataIndex: 'created_time',
    key: 'created_time',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
  },
 
];

   

   return (
    <>
       <div>
       <h1 className="font-bold text-3xl mb-5">Hóa đơn</h1>
       <Table<DataType>  columns={columns} dataSource={data} />
    </div>
 
   
    </>
   )
  
}

export default Bill;

