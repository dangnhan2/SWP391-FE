"use client"
import { DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import { TableProps } from "antd/lib";
import { useEffect, useState } from "react";
import AddModal from "./Addmodal";
import EditModal from "./EditModal";
import { DeleteDish, DeleteImage, GetDishes } from "@/app/service/api";
import ViewModal from "./ViewModal";
import InputSearch from "./InputSearch";

interface DataType {
  id: string;
  imageUrl: string;
  name: string;
  category: string;
  price: number;
}

const Dish = () => {
  const [data, setData] = useState<IDish[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [openEditModal,setOpenEditModal] = useState<boolean>(false)
  const [id, setId] = useState<number>(0);
  const [filterField, setFilterField] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>();
  const [dataDish, setDataDish] = useState<IDish>();

  useEffect(() => {
     fetchDishes();
  },[currentPage, pageSize, filterField])

  const fetchDishes = async () => {
    let query = `?page=${currentPage}&pageSize=${pageSize}`

     if (filterField) {
          query += `&${filterField}`;
    }

    let res = await GetDishes(query);

    if(res && res.statusCode === 200 ){
        setData(res.data);
        setTotal(res.total);
    }
  }

  const handleDelete = async (record : IDish) => {
      console.log(record);
     
       await DeleteImage(record.imageUrl);
       let res = await DeleteDish(record.id);
       if(res && res.statusCode === 200){
         fetchDishes();
       }
    }

      

  const handleView = (id : number) => {
     setOpenView(true);
     setId(id);
  }

  const handleUpdate = (record : IDish) => {
    setOpenEditModal(true);
    setDataDish(record);
    console.log(record);
  
  } 

  const onChange : TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
      console.log(pagination);
      if (pagination && pagination.current !== currentPage) {
        setCurrentPage(pagination.current!);
      }
  
      if (pagination && pagination.pageSize !== pageSize) {
        setPageSize(pagination.pageSize!);
      }
    };

  const handleSearch = (query : string) => {
    setFilterField(query);
  };

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
    render: (img) => <img src={img} alt="dish" className="w-12 h-12 object-cover rounded" />,
  },
  {
    title: 'Món ăn',
    dataIndex: 'name',
    key: 'name',
  },
   {
    title: 'Danh mục',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Giá',
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
                            onConfirm={() => handleDelete(record)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone
                            onClick={() => handleUpdate(record)}
                            twoToneColor="#f57800" style={{ cursor: "pointer" }}
                  
                        />
                        <EyeTwoTone 
                           onClick={() => handleView(Number.parseInt(record.id))}
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
      <Row gutter={[20, 20]}>
          <Col span={24}>
          <InputSearch handleSearch={handleSearch}/>
      </Col>

      <Col span={24}>
           <Table<DataType> title={renderHeader} columns={columns} dataSource={data} onChange={onChange}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total : total,
            }}
             bordered/>
      </Col>
      </Row>
   </div>
      <AddModal open={open} setOpen={setOpen} fetchDishes={fetchDishes}></AddModal>
      <EditModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} dataDish={dataDish} fetchDishes={fetchDishes}></EditModal>
      <ViewModal openView={openView} setOpenView={setOpenView } id={id}></ViewModal>
   </>
   
   )
  
}

export default Dish;
     
      