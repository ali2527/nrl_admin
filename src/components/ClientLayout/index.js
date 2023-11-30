import React, { useEffect, useLayoutEffect, useState } from "react";
// import Head from "next/head";
// import Image from "next/image";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

// import router from "next/router";
import { Breadcrumb, Layout, Menu, theme, Row, Col, Drawer,Image } from "antd";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai";
import { Badge, Avatar, Dropdown, Popover, Alert, Button } from "antd";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { SITE_NAME } from "../../config/constants";
import "../../styles/Home.module.css";
import ClientHeader from "./ClientHeader";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineEventNote } from "react-icons/md";
import { FaFlagUsa } from "react-icons/fa";
import { MdOutlineLeaderboard } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { IoCashOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { BsQuestionSquare } from "react-icons/bs";



const { Header, Content, Sider } = Layout;


const sideNavItems = [
  { key: 1, icon: <RxDashboard style={{fontSize:"18px"}}/>, label: "Dashboard", path: "/" },
  {
    key: 2,
    icon: <FaRegUser style={{fontSize:"18px"}}/>,
    label: "Users",
    path: "/users",
  },
  {
    key: 3,
    icon: <FaFlagUsa style={{fontSize:"18px"}}/>,
    label: "States",
    path: "/states",
  },
  {
    key: 4,
    icon: <MdOutlineLeaderboard style={{fontSize:"18px"}}/>,
    label: "Positions",
    path: "/positions",
  },
  {
    key: 5,
    icon: <FaRegUser style={{fontSize:"18px"}}/>,
    label: "Representatives",
    path: "/representatives",
  },
  {
    key: 6,
    icon: <BiDonateHeart style={{fontSize:"18px"}}/>,
    label: "Dontaions",
    path: "/Donations",
  },
  {
    key: 7,
    icon: <BiCategory style={{fontSize:"18px"}}/>,
    label: "Categories",
    path: "/categories",
  },
  {
    key: 8,
    icon: <BsBox style={{fontSize:"18px"}}/>,
    label: "Products",
    path: "/product-management",
  },
  {
    key: 9,
    icon: <LiaCashRegisterSolid style={{fontSize:"20px"}}/>,
    label: "Orders",
    path: "/orders",
  },
  {
    key: 10,
    icon: <IoCashOutline style={{fontSize:"18px"}}/>,
    label: "Payments",
    path: "/payments",
  },
  {
    key: 11,
    icon: <IoNewspaperOutline style={{fontSize:"18px"}}/>,
    label: "News",
    path: "/news",
  },
  {
    key: 12,
    icon: <MdOndemandVideo style={{fontSize:"18px"}}/>,
    label: "Histories",
    path: "/histories",
  },
  {
    key: 13,
    icon: <MdOutlineEventNote style={{fontSize:"20px"}}/>,
    label: "Events",
    path: "/events",
  },
]

const items = [
  {
    key: "1",
    label: (
      <div
        className="headerDropdown"
        style={{
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          padding: "5px 12px",
        }}
      >
        <FaUser style={{ fontSize: "16px" }} /> &nbsp; My Profile
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div
        style={{
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          padding: "5px 12px",
        }}
      >
        <FaSignOutAlt style={{ fontSize: "16px" }} />
        &nbsp; Logout
      </div>
    ),
  },
];

const content = (
  <div style={{ width: "350px" }}>
    <div
      style={{
        padding: "10px 18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Notifications</h3>
      <Alert
        message="5 New"
        type="success"
        style={{ fontSize: "12px", padding: "2px 10px", color: "green" }}
      />
    </div>
    <hr
      style={{
        borderLeft: "none",
        borderBottom: "none",
        borderRight: "none",
        borderTop: "1px solid rgb(0 0 0 / 15%)",
      }}
    />
    <div style={{ height: "250px", overflow: "auto" }}>
      <div style={{ padding: 10 }}>
        <Row style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Col xs={3}>
            <div
              style={{
                padding: "10px 10px 10px 10px",
                width: "35px",
                display: "flex",
                backgroundColor: "#000000",
                borderRadius: "5px",
              }}
            >
              <FiBell style={{ fontSize: "16px", margin: 0, color: "white" }} />
            </div>
          </Col>
          <Col xs={20}>
            <h6 class="notificationHeading">
              Lorem Ipsum is simply dummy text
            </h6>
            <p class="notificationText">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
              veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
              illo delectus.
            </p>
          </Col>
        </Row>
      </div>

      <div style={{ padding: 10 }}>
        <Row style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Col xs={3}>
            <div
              style={{
                padding: "10px 10px 10px 10px",
                width: "35px",
                display: "flex",
                backgroundColor: "#000000",
                borderRadius: "5px",
              }}
            >
              <FiBell style={{ fontSize: "16px", margin: 0, color: "white" }} />
            </div>
          </Col>
          <Col xs={20}>
            <h6 class="notificationHeading">
              Lorem Ipsum is simply dummy text
            </h6>
            <p class="notificationText">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
              veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
              illo delectus.
            </p>
          </Col>
        </Row>
      </div>

      <div style={{ padding: 10 }}>
        <Row style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Col xs={3}>
            <div
              style={{
                padding: "10px 10px 10px 10px",
                width: "35px",
                display: "flex",
                backgroundColor: "#000000",
                borderRadius: "5px",
              }}
            >
              <FiBell style={{ fontSize: "16px", margin: 0, color: "white" }} />
            </div>
          </Col>
          <Col xs={20}>
            <h6 class="notificationHeading">
              Lorem Ipsum is simply dummy text
            </h6>
            <p class="notificationText">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
              veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
              illo delectus.
            </p>
          </Col>
        </Row>
      </div>
    </div>

    <hr
      style={{
        borderLeft: "none",
        borderBottom: "none",
        borderRight: "none",
        borderTop: "1px solid rgb(0 0 0 / 15%)",
      }}
    />

    <div
      style={{
        padding: "10px 18px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button type="link">View All</Button>
    </div>
  </div>
);

const ClientLayout = ({ children, head, }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [selectedItem, setSelectedItem] = useState("1");
  const navigate = useNavigate();
  const path = window.location.pathname;


  useLayoutEffect(() => {
    // get the path and set selected item to key of the path that matches

    const item = sideNavItems.find((item) => item.path == path);
    if (item) {
      setSelectedItem(item.key.toString());
    }else{
      setSelectedItem();
    }
  }, [path]);

  let title = head?.title ? head?.title : "";
  if (title) {
    title = `${SITE_NAME} | ${title}`;
  } else {
    title = SITE_NAME;
  }

  // set the page title
  useEffect(() => {
    document.title = title;
  }, [title]);

  const containerStyle = {
    position: "relative",
    height: 200,
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
  };

  return (
    <Layout style={{ backgroundColor: "white", scrollBehavior: "smooth",height:"100vh" }}>
     
      <ClientHeader
        visible={visible}
        setVisible={setVisible}
        visible2={visible2}
        setVisible2={setVisible2} 
      />

      <Layout style={{ height: "90vh" }}>
        <Row
          style={{
            background: "#000",
          }}
        >
          <Col xs={0} md={24}>
            <Sider
              width={280}
              style={{
                background: "white",
              }}
              className="mainSider"
            >
              <Menu
                mode="inline"
                selectedKeys={[selectedItem]}
                style={{
                  height: "100%",
                  borderRight: 0,
                  background: "#000",
                }}
              >
                {sideNavItems.map((item) => (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => {
                      navigate(item.path);
                      setSelectedItem(item.key.toString());
                    }}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
          </Col>
        </Row>

        <Layout
          style={{
            padding: "30px",
            overflow: "auto",
            backgroundColor: "#f4f7fe",
            position: "relative",
            outline: "none",
          }}
        >
          {visible2 && (
            <div
              style={{
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Row style={{ alignItems: "flex-end" }}>
                <Col xs={24} md={0}>
                  <div
                    style={{
                      backgroundColor: "#000000",
                      padding: "18px",
                      display: "flex",
                      justifyContent: "flex-end",
                      transition: "all 0.5s ease-in-out",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Popover
                        content={content}
                        placement="bottomRight"
                        arrow={false}
                        className="headerPopover"
                      >
                        <Badge count={5} style={{ backgroundColor: "#000000" }}>
                          <FiBell
                            style={{ fontSize: "25px", color: "white" }}
                          />
                        </Badge>
                      </Popover>
                      &emsp; &emsp;
                      <Avatar size={40} src="/images/avatar.png" />
                      <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <p
                          style={{
                            marginLeft: 10,
                            fontSize: "16px",
                            color: "white",
                          }}
                        >
                          Masooma Albert <AiFillCaretDown fontSize={12} />{" "}
                        </p>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          {children}

          <Drawer
            className="drawer"
            placement={"left"}
            size={"default"}
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            getContainer={false}
            key={"drawer"}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedItem]}
              style={{
                height: "100%",
                borderRight: 0,
                backgroundColor: "rgb(0, 0, 0)",
              }}
            >
              {sideNavItems.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => {
                    navigate(item.path);
                    setSelectedItem(item.key.toString());
                  }}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
