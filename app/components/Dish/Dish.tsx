"use client"
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { TableProps } from "antd/lib";
import { useState } from "react";
import AddModal from "./Addmodal";
import EditModal from "./EditModal";
// import Add from "./Add";
// import AddIngrident from "./Add";

interface DataType {
  key: string;
  id: string;
  image: string;
  dishName: string;
  category: string;
  price: number;
}
const Dish = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState<boolean>(false);
  const [openEditModal,setOpenEditModal] = useState<boolean>(false)
   const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (img) => <img src={img} alt="dish" className="w-12 h-12 object-cover rounded" />,
  },
  {
    title: 'Dish Name',
    dataIndex: 'dishname',
    key: 'dishname',
  },
   {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
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
                            title={"Xác nhận xóa "}
                            description={"Bạn có chắc chắn muốn xóa này ?"}
                           //  onConfirm={() => handleDeleteBook(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone
                            onClick={() => setOpenEditModal(true)}
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
      <h1 className="font-bold text-3xl mb-5">Món ăn</h1>
      <Table<DataType> title={renderHeader} columns={columns} dataSource={data} />
   </div>
      <AddModal open={open} setOpen={setOpen}></AddModal>
      <EditModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}></EditModal>
   </>
   
   )
  
}

export default Dish;