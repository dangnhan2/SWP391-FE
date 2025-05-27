"use client";
import { AppstoreOutlined, AuditOutlined, DollarOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import Link from "next/link";
import { ReactNode, useState } from "react";
const { Header, Sider, Content } = Layout;

type LayoutProps = {
  children: ReactNode;
};

const LayoutAdmin = ({ children }: LayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    
    const items = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: <Link href="/admin">Dash board</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link href="/admin/user">Manage Users</Link>,
    },
    {
      key: "3",
      icon: <AuditOutlined />,
      label: <Link href="/admin/profile">Profile</Link>,
    },
    {
      key: "4",
      icon: <DollarOutlined />,
      label: <Link href="/admin/ingredient">Ingredient</Link>,
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
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
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
              background: colorBgContainer,
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