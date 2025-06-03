"use client";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface EmployeeType {
  key: string;
  id: string;
  fullName: string;
  phone: string;
  role: string;
  status: "Active" | "Inactive";
}

const Employee = () => {
  const [data, setData] = useState<EmployeeType[]>([
    {
      key: "1",
      id: "E001",
      fullName: "John Doe",
      phone: "123-456-7890",
      role: "Manager",
      status: "Active",
    },
    {
      key: "2",
      id: "E002",
      fullName: "Jane Smith",
      phone: "987-654-3210",
      role: "Staff",
      status: "Inactive",
    },
  ]);

  const [open, setOpen] = useState<boolean>(false);

  const columns: ColumnsType<EmployeeType> = [
    {
      title: <strong>ID</strong>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <strong>FULL NAME</strong>,
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: <strong>PHONE NO</strong>,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: <strong>ROLE</strong>,
      dataIndex: "role",
      key: "role",
    },
    {
      title: <strong>STATUS</strong>,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: <strong>ACTION</strong>,
      key: "action",
      render: (_, record) => (
        <>
          <Popconfirm
            placement="leftTop"
            title="Confirm Deletion"
            description="Are you sure you want to delete this employee?"
            onConfirm={() => {
              setData(data.filter((item) => item.key !== record.key));
            }}
            okText="Yes"
            cancelText="No"
          >
            <span style={{ cursor: "pointer", marginRight: 16 }}>
              <DeleteTwoTone twoToneColor="#ff4d4f" />
            </span>
          </Popconfirm>
          <EditTwoTone
            twoToneColor="#f57800"
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
          />
        </>
      ),
    },
  ];

  const renderHeader = () => {
    return (
      <div className="flex justify-end">
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>
          Add New
        </Button>
      </div>
    );
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl mb-5">Employee</h1>
        <Table<EmployeeType>
          title={renderHeader}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>

      {/* Replace this with your actual modal component */}
      {/* <AddEmployeeModal open={open} setOpen={setOpen} /> */}
    </>
  );
};

export default Employee;