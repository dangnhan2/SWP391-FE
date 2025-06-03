"use client"
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, TableProps } from "antd";
import { useState } from "react";
import AddDish from "./AddDish";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const MenuList = () => {
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
  },
  {
    title: 'Món ăn',
    dataIndex: 'name',
    key: 'name',
  },
   {
    title: 'Giảm  giá',
    dataIndex: 'discount',
    key: 'discount',
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


                    </>

                )
               }         
   },
];

   const renderHeader = () => {
        return (
            <div className="flex justify-between">
               <h1 className="font-bold text-3xl mb-5">Danh sách món ăn</h1>
               <div>
                   <Button
                        onClick={() => setIsModalOpen(true)}
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
      <Table<DataType> title={renderHeader} columns={columns} dataSource={data} />
   </div>
   <AddDish open={isModalOpen} setOpen={setIsModalOpen}></AddDish>
   </>
   
   )
}

export default MenuList;