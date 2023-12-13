import { useState,useEffect } from "react";
import { Image, Badge, Avatar, Dropdown, Popover, Alert,Modal } from "antd";
import { AiFillCaretDown } from "react-icons/ai";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Layout, Row, Col, Button, Typography, message } from "antd";
// import Link from "next/link";
import avatar from "../../assets/avatar.png"
import { FiBell } from "react-icons/fi";
import socket from "../../config/socket"
import {GoBellFill} from "react-icons/go"
import { UPLOADS_URL,AUTH } from "../../config/constants";
import { useSelector,useDispatch } from "react-redux";
import { fetchNotifications } from '../../redux/slice/notificationSlice';
import { incrementCount,addLatestNotification  } from "../../redux/slice/notificationSlice";

import {Get} from "../../config/api/get";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../redux/slice/authSlice";

const { Header } = Layout;



const ClientHeader = ({ visible, setVisible, visible2, setVisible2 }) => {
  const latestNotifications = useSelector((state) => state.notification.latestNotifications);
  const notificationsCount = useSelector((state) => state.notification.count);
  const [logoutModal, setLogoutModal] = useState(false);
  const [path, setPath] = useState(
    window.location.pathname.slice(1, window.location.pathname.length)
  );
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);

  console.log("user", token)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if(token){
      
      socket.connect();

      socket.emit("setupAdmin");
      dispatch(fetchNotifications(token));
    }
    return () => {
      socket.disconnect();
    };
  }, [token]);


  useEffect(() => {
    socket.on("notification", (notification) => {
      console.log("New Notification", notification);

      // Assuming your notification object contains data to determine if you should increment the count
      const shouldIncrement = true; // You should replace this with your logic

      if (shouldIncrement) {
        dispatch(incrementCount());
      }
      

      dispatch(addLatestNotification(notification));
    });

    // Don't forget to remove the event listener when the component unmounts
    return () => {
      socket.off("notification");
    };
  }, [dispatch]);




  const logout = () => {
    setLogoutModal(true);

    Get(AUTH.logout, token)
      .then((response) => {
        console.log(">><><>", response);
        if (response?.response?.status === 401) {
          message.error(
            response.response.data.message || "Something went wrong"
          );
        } else {
          dispatch(removeUser());
          navigate("/signin");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
          onClick={()=> navigate('/profile')}
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
          onClick={() => setLogoutModal(true)}
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
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Notifications</h3>
        <Alert
          message={`${notificationsCount} New`}
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
        {latestNotifications && latestNotifications.length > 0 && latestNotifications.map(item => {
          return(<div style={{ padding: 10,minHeight:"80px", borderBottom:"1px solid #dadada", marginBottom:"5px" }}>
            <Row
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Col xs={4}>
                <div
                  style={{
                    // padding: "10px 10px 10px 10px",
                                    
                    display: "flex",
                    width:'40px',
                    justifyContent:'center',
                    alignItems:"center",
                    height:'40px',
                    backgroundColor: "#385790",
                    borderRadius: "5px",
                  }}
                >
                 <GoBellFill style={{ fontSize: "20px",color:"white", }} />
                </div>
              </Col>
              <Col xs={18}>
              <Typography.Title
                    className="fontFamily1"
                    style={{ fontSize: "14px", color: "black",margin:0 }}
                  >
                   {item.title}
                  </Typography.Title>
  
                  <Typography.Text
                    className="fontFamily1"
                    style={{ fontSize: "12px", color: "black",margin:0 }}
                  >
                   {item?.content?.slice(0,100)} {item.content.length > 100 && "..."}
                  </Typography.Text>
               
              </Col>
            </Row>
          </div>);
        }) }
        

       
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
          padding: "10px 20px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button onClick={()=> navigate("/notifications")} type="link">View All</Button>
      </div>
    </div>
  );

  console.log(">>>>>>>>>.....", user);

  return (
    <>
      <Row>
        <Col xs={0} md={24}>
          <Header
            style={{
              height: "100px",
              backgroundColor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 60px",
            }}
          >
            <div>
              <Image
                src={"/images/logo.png"}
                alt="Picture of the author"
                width={140}
                height={90}
                preview={false}
                className="logo"
              />
            </div>
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
                <Badge count={notificationsCount} style={{ backgroundColor: "red" }}>
                  <FiBell style={{ fontSize: "25px",color:'silver' }} />
                </Badge>
              </Popover>
              &emsp; &emsp;
              <Avatar
                size={40}
                src={
                  !user.image ? avatar : UPLOADS_URL + "/" + user.image
                }
              />
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["hover"]}
                placement="bottomRight"
              >
                <p
                  style={{
                    marginLeft: 10,
                    fontSize: "16px",
                    textTransform: "capitalize",
                    fontWeight:"bold",
                    color:'white',
                    cursor:'pointer'
                  }}
                >
                  {user?.firstName + " " +user?.lastName} <AiFillCaretDown fontSize={12} />{" "}
                </p>
              </Dropdown>
            </div>
          </Header>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={0}>
          <Header
            style={{
              height: "10vh",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              padding: "15px 35px",
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaEllipsisV
                  style={{ fontSize: 22, color: "#000000" }}
                  onClick={() => setVisible2(!visible2)}
                />
              </Col>
              <Col>
                <a href={"/"}>
                  <Image
                    preview={false}
                    alt={"Failed to load image"}
                    src={"/images/logo.png"}
                    style={{ maxWidth: 120 }}
                  />
                </a>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaBars
                  style={{ fontSize: 22, color: "#000000" }}
                  onClick={() => setVisible(!visible)}
                />
              </Col>
            </Row>
          </Header>
        </Col>
      </Row>

      <Modal
        visible={logoutModal}
        onOk={() => logout()}
        onCancel={() => setLogoutModal(false)}
        okText="Yes"
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="No"
        cancelButtonProps={{
          className: "no-btn",
        }}
        okButtonProps={{
          className: "yes-btn",
        }}
      >
        <Image
          src="./images/question.png"
          preview={false}
          width={80}
          height={80}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
        System Message!
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Are You Sure You Want To Logout?
        </Typography.Text>
      </Modal>
    </>
  );
};

export default ClientHeader;
