"use client"
import { DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Popconfirm, Row, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { DeleteSupplier, GetSuppliers } from "@/app/service/api";
import ViewModal from "./ViewModal";
import InputSearch from "./InputSearch";

interface DataType {
  id : number
  name: string;
  phoneNo: string;
  address: string;
  email: string;
}

const Supplier = () => {
  const [data, setData] = useState<ISupplier[]>();
  const [dataSupplier, setDataSupplier] = useState<ISupplier>();
  const [open, setOpen] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [filterField, setFilterField] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>();

  const fetchSupplier = async () => {
        
        let query = `?page=${currentPage}&pageSize=${pageSize}`

        if (filterField) {
          query += `&${filterField}`;
        }

        let res = await GetSuppliers(query);
        console.log(res);
        
        if(res && res.statusCode === 200){
          setData(res.data);
          setTotal(res.total);
        }
      }

  useEffect(() => {
      fetchSupplier();
  },[currentPage, pageSize, filterField])

  const handleDelete = async (id : number) => {
     let res = await DeleteSupplier(id);
     if(res && res.statusCode === 200){
       fetchSupplier();
     }
  }

  const handleUpdate = (record : any) => {
    setOpenEditModal(true);
    setDataSupplier(record);
  } 

  const handleView = (id : number) => {
     setOpenView(true);
     setId(id);
  }

  const handleSearch = (query : string) => {
    setFilterField(query);
  };

   const onChange : TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    console.log(pagination);
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current!);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize!);
    }
  };


  const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'SĐT',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
  },
   {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
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
                            onConfirm={() => handleDelete(record.id)}
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
                           onClick={() => handleView(record.id)}
                        /> 
                    </>

                )
               }         
   },
];

   const renderHeader = () => {
        return (
            <div className="flex justify-end">
                  <Button
                        onClick={() => setOpen(true)}
                        icon={<PlusOutlined />}
                        type="primary"
                    >Thêm mới</Button>
                
               </div>
        )
    }

   return (
   <>
     <div>
      <h1 className="font-bold text-3xl mb-5">Nhà cung cấp</h1>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch}/>
        </Col>

        <Col span={24}>
            <Table<DataType> title={renderHeader} columns={columns} dataSource={data}  
            onChange={onChange}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total : total,
            }}
             bordered
            />
        </Col>
      </Row>
     
   </div>
    
    <AddModal open={open} setOpen={setOpen} fetchSupplier={fetchSupplier}></AddModal>
    <EditModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} fetchSupplier={fetchSupplier} dataSupplier={dataSupplier} setDataSupplier={setDataSupplier}></EditModal>
    <ViewModal openView={openView} setOpenView={setOpenView } id={id}></ViewModal>
   </>
   
   )
  
}

export default Supplier;