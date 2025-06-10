"use client";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { DiSmashingMagazine } from "react-icons/di";
import { FaLeaf, FaMoneyBill, FaSatelliteDish } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdDashboard, MdMenuBook } from "react-icons/md";
import { TbAdjustmentsUp } from "react-icons/tb";


const { Header, Sider, Content } = Layout;

type LayoutProps = {
  children: ReactNode;
};

const LayoutAdmin = ({ children }: LayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    
    const items = [
    {
      key: "1",
      icon: <MdDashboard />,
      label: <Link href="/admin">Dash board</Link>,
    },
    {
      key: "2",
      icon: <IoPeople />,
      label: <Link href="/admin/customer">Khách Hàng</Link>,
    },
    {
      key: "3",
      icon: <TbAdjustmentsUp />,
      label: <Link href="/admin/supplier">Nhà Cung Cấp </Link>,
    },
    {
      key: "4",
      icon: <FaLeaf />,
      label: <Link href="/admin/ingredient">Nguyên Liệu</Link>,
    },
    {
      key: "5",
      icon: <MdMenuBook />,
      label: <Link href="/admin/menu">Thực Đơn</Link>,
    },
    {
      key: "6",
      icon:<FaMoneyBill />,
      label: <Link href="/admin/bill">Hóa Đơn</Link>,
    },
    {
      key: "7",
      icon:<DiSmashingMagazine />,
      label: <Link href="/admin/dish">Món Ăn</Link>,
    },
  ];
  
  const itemsDropdown = [
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => alert("me")}>
          Quản lý tài khoản
        </label>
      ),
      key: "account",
    },
    {
      label: <Link href={"/"}>Trang chủ</Link>,
      key: "home",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
   
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
   <> 
   {/* style={{ minHeight: "100vh" }} */}
      <Layout  style={{ minHeight: "100vh" }} >
        <Sider trigger={null} collapsible collapsed={collapsed} className="h-screen bg-white"  style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="demo-logo-vertical" />
          <div
            style={{
              height: "64px",
              lineHeight: "64px",
              backgroundColor: "white",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Admin
          </div>
           

          <Menu
            // defaultSelectedKeys={[activeMenu]}
            mode="inline"
            items={items}
            // onClick={(e) => setActiveMenu(e.key)}
            style={{
              height: "100vh",
            }}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />

              <Dropdown
                menu={{ items: itemsDropdown }}
                trigger={["click"]}
                // disabled={isAuthenticated === true ? false : true}
              >
                <Space style={{ cursor: "pointer", paddingRight: "100px" }}>
                  {/* <Avatar src={avatar} />
                  {user?.fullName} */}
                </Space>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#F5F5F5",
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
export default LayoutAdmin;