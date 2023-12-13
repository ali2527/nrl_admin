import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  message,
  Input,
  Button,
  Layout,
  Checkbox,
  Tabs,
  Table,
  Select,
  Image,
  Pagination,
} from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Get } from "../../config/api/get";
import { ADMIN } from "../../config/constants";
import { useSelector } from "react-redux";
import { ImUsers } from "react-icons/im";
import { BiSolidDonateHeart } from "react-icons/bi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";

import { FaCode, FaChartLine } from "react-icons/fa";
import styles from "../../styles/Home.module.css";
import { render } from "react-dom";

ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);





export default function Home() {
  const token = useSelector((state) => state.user.userToken);
  const [stats, setStats] = useState({
    userCount: 0,
    productCount: 0,
    donationSum: 0,
    orderSum: 0,
  });

  const [donations, setDonations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const Months = [ "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"]

  const data = {
    labels: orders.map(item => Months[parseInt(item.month.split("-")[1]) -1] + " " + item.month.split("-")[0]),
    datasets: [
      {
        label: "Total Sales",
        data: orders.map(item => item.totalAmount), 
        fill: true,
        backgroundColor: "rgba(157,98,245,0.2)",
        borderColor: "#000",
        pointRadius: 3,
      },
    ],
  };
  
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Total Sales",
          color: "#000000",
        },
        min: 0,
      },
      x: {
        title: {
          display: true,
          text: "Months",
          color: "#000000",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data2 = {
    labels: donations.map(item => Months[parseInt(item.month.split("-")[1]) -1] + " " + item.month.split("-")[0]),
    datasets: [
      {
        label: "Users",
        data: donations.map(item => item.totalAmount),
        fill: true,
        backgroundColor: "rgba(157,98,245,0.2)",
        borderColor: "#000",
        pointRadius: 3,
      },
    ],
  };
  
  const options2 = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Total Donation",
          color: "#000000",
        },
        min: 0,
      },
      x: {
        title: {
          display: true,
          text: "Months",
          color: "#000000",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  useEffect(() => {
    getStats();
    getDonationChart();
    getOrdersChart();
  }, []);

  
  const getStats = async () => {
    setLoading(true);
    try {
      const response = await Get(ADMIN.getStats, token);
      setLoading(false);

      if (response?.status) {
        setStats(response?.data);
      } else {
        // message.error("Something went wrong 3333!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getDonationChart = async () => {
    setLoading(true);
    try {
      const response = await Get(ADMIN.getDonationChart, token);
      setLoading(false);
      if (response?.status) {
        setDonations(response?.data);
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const getOrdersChart = async () => {
    setLoading(true);
    try {
      const response = await Get(ADMIN.getOrdersChart, token);
      setLoading(false);
      console.log("response", response);
      if (response?.status) {
        setOrders(response?.data);
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  return (
    <Layout className="configuration">
      {/* ================================ROW ONE START========================================= */}
      <Row gutter={[20, 10]} style={{ background: "#fff" }}>
        <Col xs={24} md={6}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={8}>
                <div class="analyticsIcon">
                <ImUsers style={{fontSize:"60px", color:'black'}} />
                </div>
              </Col>
              <Col xs={15} md={16}>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                  {stats?.userCount}
                </h6>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                Total Users
                </h6>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={8}>
                <div class="analyticsIcon">
                  <FaBoxOpen style={{fontSize:"60px", color:'black'}} />
                </div>
              </Col>
              <Col xs={15} md={16}>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                {stats?.productCount}
                </h6>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                Total Products
                </h6>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={8}>
                <div class="analyticsIcon">
                  <RiMoneyDollarCircleFill style={{fontSize:"60px", color:'black'}} />
                </div>
              </Col>
              <Col xs={15} md={16}>
                <h6 class="analyticsText" style={{ margin: 0 }}>
               $     {stats?.orderSum}
                </h6>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                Total Sales
                </h6>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div class="boxDetails analytics1">
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={7} md={8}>
                <div class="analyticsIcon">
                  <BiSolidDonateHeart style={{fontSize:"60px", color:'black'}} />
                </div>
              </Col>
              <Col xs={15} md={16}>
                <h6 class="analyticsText" style={{ margin: 0 }}>
                  $ {stats?.donationSum > 1000 ? stats?.donationSum / 1000 + 'K' : stats?.donationSum}
                </h6>
                <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                Total Donations
                </h6>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* ================================ROW ONE END========================================= */}
      <br />
      {/* ================================ROW TWO START========================================= */}
      <Row gutter={[20, 10]}>
        <Col xs={24}>
          <div class="boxDetails" style={{ padding: "30px" }}>
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={24} md={12}>
                <h5 class="sectionTitle">Orders</h5>
              </Col>
              {/* <Col xs={24} md={12} style={{ textAlign: "right" }}>
                <Select
                  size={"large"}
                  className="chartSelectBox"
                  defaultValue="monthly"
                  // onChange={handleChange}
                  style={{
                    width: 200,
                    textAlign: "left",
                  }}
                  options={[
                    { value: "monthly", label: "Monthly" },
                    { value: "halfYearly", label: "6 Months" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
              </Col> */}
            </Row>
            <Row style={{ minHeight: "400px", overflowX: "auto" }}>
              <div style={{ minWidth: "600px", width: "100%" }}>
                <Line options={options} data={data} />
              </div>
            </Row>
          </div>
        </Col>
      </Row>

      <br />
      {/* ================================ROW TWO START========================================= */}
      <Row gutter={[20, 10]}>
        <Col xs={24}>
          <div class="boxDetails" style={{ padding: "30px" }}>
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={24} md={12}>
                <h5 class="sectionTitle">Donations</h5>
              </Col>
              {/* <Col xs={24} md={12} style={{ textAlign: "right" }}>
                <Select
                  size={"large"}
                  className="chartSelectBox"
                  defaultValue="monthly"
                  // onChange={handleChange}
                  style={{
                    width: 200,
                    textAlign: "left",
                  }}
                  options={[
                    { value: "monthly", label: "Monthly" },
                    { value: "halfYearly", label: "6 Months" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
              </Col> */}
            </Row>
            <Row style={{ minHeight: "400px", overflowX: "auto" }}>
              <div style={{ minWidth: "600px", width: "100%" }}>
                <Line options={options2} data={data2} />
              </div>
            </Row>
          </div>
        </Col>
      </Row>
      {/* ================================ROW TWO END========================================= */}
      <br />

      {/* ================================ROW Three START========================================= */}
      {/* <Row gutter={[20, 10]}>
        <Col xs={24}>
          <div class="boxDetails" style={{ padding: "30px" }}>
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={24} md={12}>
                <h5 class="sectionTitle">Service Provider Subscriptions</h5>
              </Col>
              <Col xs={24} md={12} style={{ textAlign: "right" }}>
                <Select
                  size={"large"}
                  className="chartSelectBox"
                  defaultValue="monthly"
                  // onChange={handleChange}
                  style={{
                    width: 200,
                    textAlign: "left",
                  }}
                  options={[
                    { value: "monthly", label: "Monthly" },
                    { value: "halfYearly", label: "6 Months" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
              </Col>
            </Row>
            <Row style={{ minHeight: "400px", overflowX: "auto" }}>
              <div style={{ minWidth: "600px", width: "100%" }}>
                <Line options={options2} data={data2} />
              </div>
            </Row>
          </div>
        </Col>
      </Row> */}

      {/* ================================ROW Three END========================================= */}
      <br />
      {/* ================================ROW FOUR START========================================= */}
      {/* <Row gutter={[20, 10]}>
        <Col xs={24}>
          <div class="boxDetails" style={{ padding: "30px" }}>
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={24} md={12}>
                <h5 class="sectionTitle">Total Meeting</h5>
              </Col>
              <Col xs={24} md={12} style={{ textAlign: "right" }}>
                <Select
                  size={"large"}
                  className="chartSelectBox"
                  defaultValue="monthly"
                  // onChange={handleChange}
                  style={{
                    width: 200,
                    textAlign: "left",
                  }}
                  options={[
                    { value: "monthly", label: "Monthly" },
                    { value: "halfYearly", label: "6 Months" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
              </Col>
            </Row>
            <Row style={{ minHeight: "400px", overflowX: "auto" }}>
              <div style={{ minWidth: "600px", width: "100%" }}>
                <Line options={options3} data={data3} />
              </div>
            </Row>
          </div>
        </Col>
      </Row> */}

      {/* ================================ROW FOUR END========================================= */}
      <br />
      <br />
    </Layout>
  );
}
