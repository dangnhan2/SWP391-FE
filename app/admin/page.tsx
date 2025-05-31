"use client";

import { CheckCircleOutlined, ClockCircleOutlined, LikeOutlined, PoundCircleOutlined, RedEnvelopeOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FaCoffee, FaGlassWhiskey } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
   ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function AdminDashboard() {
  const data = {
  labels: ["11 Feb", "12 Feb", "13 Feb", "14 Feb", "15 Feb", "16 Feb", "17 Feb"],
  datasets: [
    {
      label: "Customer",
      data: [10, 35, 20, 15, 30, 25, 15],
      borderColor: "#ff6384",
      backgroundColor: "rgba(255,99,132,0.2)",
    },
    {
      label: "Order",
      data: [25, 20, 30, 15, 35, 30, 25],
      borderColor: "#36a2eb",
      backgroundColor: "rgba(54,162,235,0.2)",
    },
  ],
};

const summaryData = {
  labels: ["Completed", "Pending", "Rejected"],
  datasets: [
    {
      data: [53, 28, 19],
      backgroundColor: ["#2ED47A", "#F6C23E", "#F87171"],
      hoverBackgroundColor: ["#1CC88A", "#FFCE56", "#E74A3B"],
      borderWidth: 0,
    },
  ],
};

const summaryOptions = {
  cutout: "70%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

  return (
     <div>
       <h1 className="font-bold text-3xl mb-5">Thống Kê</h1>
       <Row gutter={[20,20]}>
        <Col span={8}>
           <Card variant="borderless">
                <Statistic title="Tổng số khách hàng" value={1128} prefix={<UserOutlined />} />
           </Card>
        </Col>
        <Col span={8}>
           <Card variant="borderless">
                <Statistic title="Tổng số đơn đặt" value={1128} prefix={<RedEnvelopeOutlined />} />
           </Card>
        </Col>
        <Col span={8}>
           <Card variant="borderless">
                <Statistic title="Tổng số bán" value={1128} prefix={<PoundCircleOutlined />} />
           </Card>
        </Col>
       </Row>
       
       <div className="mt-5 mb-5"></div>
       <Row gutter={[20,20]}>
        <Col span={16}>
          <Card className="shadow rounded-2xl p-4">
            <h3 className="text-lg font-semibold mb-2">Orders Statistics</h3>
            <Line data={data} />
          </Card>
        </Col>

        <Col span={8}>
          <Card className="shadow rounded-2xl p-4">
    <h3 className="text-lg font-semibold mb-2">Orders Summary / Last 7 Days</h3>
    <div className="relative flex justify-center items-center my-4">
      <div className="w-32 h-32">
        <Doughnut data={summaryData} options={summaryOptions} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-lg font-bold">100</p>
          <p className="text-xs text-gray-500">ORDERS</p>
        </div>
      </div>
    </div>
    <div className="text-sm space-y-1 mt-4">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#2ED47A]"></span>
        <span className="text-gray-700 font-medium">Completed:</span>
        <span className="ml-auto">53</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#F6C23E]"></span>
        <span className="text-gray-700 font-medium">Pending:</span>
        <span className="ml-auto">28</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#F87171]"></span>
        <span className="text-gray-700 font-medium">Rejected:</span>
        <span className="ml-auto">19</span>
      </div>
    </div>
  </Card>
        </Col>
       </Row> 

        <div className="mt-5 mb-5"></div>

        <Row gutter={[20,20]}>
          <Col span={12}>
          <Card className="shadow rounded-2xl p-4">
            <h3 className="text-lg font-semibold mb-2">Recent Sales / Last 7 Days</h3>
            <div className="text-sm">
              <div className="flex justify-between border-b py-2">
                <span>Coffee</span>
                <span>12.08.2019 - 12:53 PM</span>
                <span>$14,256</span>
                <CheckCircleOutlined className="text-green-500" />
              </div>
              <div className="flex justify-between py-2">
                <span>Soda</span>
                <span>12.08.2019 - 12:53 PM</span>
                <span>$4,256</span>
                <ClockCircleOutlined className="text-yellow-500" />
              </div>
            </div>
          </Card>
        </Col>
        
         <Col span={12}>
          <Card className="shadow rounded-2xl p-4">
            <h3 className="text-lg font-semibold mb-2">Trending Dishes / Last 7 Days</h3>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <FaCoffee className="text-xl" />
                <span>#1 Coffee</span>
              </div>
              <span className="bg-green-100 text-green-700 rounded-full px-2">62 Sold</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <div className="flex items-center gap-2">
                <FaGlassWhiskey className="text-xl" />
                <span>#2 Soda</span>
              </div>
              <span className="bg-yellow-100 text-yellow-700 rounded-full px-2">51 Sold</span>
            </div>
          </Card>
        </Col>
        </Row>
    </div>
  )
}
             