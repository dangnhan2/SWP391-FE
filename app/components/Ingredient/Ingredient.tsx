"use client"
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm,Table } from "antd";
import { TableProps } from "antd/lib";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const Ingredient = () => {
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Unit Type',
    dataIndex: 'type',
    key: 'type',
  },
   {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
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
                        onClick={() => setOpen(true)}
                    >Thêm mới</Button>
               </div>
            </div>
        )
    }

   return (
    <>
       <div>
       <h1 className="font-bold text-3xl mb-5">Nguyên liệu</h1>
       <Table<DataType> title={renderHeader} columns={columns} dataSource={data} />
    </div>
 
    <AddModal open={open} setOpen={setOpen}></AddModal>
    <EditModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}></EditModal>
    </>
   )
  
}

export default Ingredient;

