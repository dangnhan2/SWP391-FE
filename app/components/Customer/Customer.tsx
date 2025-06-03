"use client"
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { TableProps } from "antd/lib";
import { useState } from "react";

interface DataType {
  key: string;
  id: string;
  fullName: string;
  phone: string;
  address: string;
}
const Customer = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState<boolean>();
   const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullname',
    key: 'name',
  },
  {
    title: 'Phone No',
    dataIndex: 'phone no',
    key: 'phone',
  },
   {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    render: (text, record, index) => {
       return (
                    <>

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa "}
                            description={"Bạn có chắc chắn muốn xóa khách hàng này ?"}
                            onConfirm={() => handleDelete(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin:"0 20px"}}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer" }}
                  
                        />
                    </>

                )
               }         
   },
];

   const renderHeader = () => {
        return (
            <div className="flex justify-end">
               <div>
                   <Button
                        icon={<PlusOutlined />}
                        type="primary"
                    >Thêm mới</Button>
               </div>
            </div>
        )
    }

   return (
   <>
     <div>
      <h1 className="font-bold text-3xl mb-5">Ingredient</h1>
      <Table<DataType> title={renderHeader} columns={columns} dataSource={data} />
   </div>
   </>
   
   )
  
}

export default Customer;