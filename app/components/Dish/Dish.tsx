"use client";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { TableProps } from "antd/lib";
import { useState } from "react";

interface DishType {
  key: string;
  id: string;
  image: string; 
  name: string;
  category: string;
  price: number;
}

const Dish = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState<boolean>();
   const columns: TableProps<DataType>['columns'] = [
  {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} alt="dish" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }} />
      ),
    },
    {
      title: "Dish Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Popconfirm
            placement="leftTop"
            title="Xác nhận xóa món ăn"
            description="Bạn có chắc chắn muốn xóa món này?"
            // onConfirm={() => handleDelete(record.id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <span style={{ cursor: "pointer", marginRight: 16 }}>
              <DeleteTwoTone twoToneColor="#ff4d4f" />
            </span>
          </Popconfirm>
          <EditTwoTone
            twoToneColor="#f57800"
            style={{ cursor: "pointer" }}
            // onClick={() => handleEdit(record)}
          />
        </>
      ),
    },
  ];

  const renderHeader = () => (
    <div className="flex justify-end">
      <Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>
        Thêm mới
      </Button>
    </div>
  );

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl mb-5">Dish Management</h1>
        <Table<DishType> title={renderHeader} columns={columns} dataSource={data} />
      </div>

      <AddDish open={open} setOpen={setOpen} />
    </>
  );
};

export default Dish;