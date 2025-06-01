"use client"
import { Button, Card, Form, Input } from "antd";
import type { FormProps } from 'antd';


 type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login() {
 

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
  return (
    <>
     <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/bg.jpg')` }} // ảnh trong public
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[460px]">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold mb-1">
            <span className="text-blue-600">Mado</span>
            <span className="text-black">Coffee</span>
          </h3>
          <p className="text-base font-medium text-gray-700">Sign in</p>
        </div>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Account"
            name="account"
            rules={[{ required: true, message: 'Please input your account!' }]}
          >
            <Input placeholder="Your account" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    </>
  )
}