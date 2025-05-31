"use client"
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { TableProps } from "antd/lib";
import { useState } from "react";
// import Add from "./Add";
// import AddIngrident from "./Add";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
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
    title: 'FullName',
    dataIndex: 'fullname',
    key: 'name',
  },
  {
    title: 'PhoneNo',
    dataIndex: 'phoneno',
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
                            title={"Xác nhận xóa book"}
                            description={"Bạn có chắc chắn muốn xóa book này ?"}
                           //  onConfirm={() => handleDeleteBook(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
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
        
{/* <AddIngrident open={open} setOpen={setOpen}></AddIngrident> */}
   </>
   
   )
  
}

export default Customer;