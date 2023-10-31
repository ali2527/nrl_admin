import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Popover,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Modal,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOADS_URL, USERS } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function UserDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([
    {
      id: 1,
      fullname: "John Doe",
      email: "huamj@email.com",
      phone: "+1234567890",
      isActive: true,
      gender: "male",
      registered: "12/24/1997",
      bio: "Lorem ipsum",
    },
    {
      id: 2,
      fullname: "Jane Smith",
      email: "huamj@email.com",
      phone: "+1234567890",
      isActive: false,
      gender: "male",
      registered: "12/24/1997",
      bio: "Lorem ipsum",
    },
    {
      id: 3,
      fullname: "Bob Johnson",
      email: "huamj@email.com",
      phone: "+1234567890",
      isActive: false,
      gender: "male",
      registered: "12/24/1997",
      bio: "Lorem ipsum",
    },
    // Add more user objects as needed
  ]);

  useEffect(() => {
    getUser();
  }, []);

  console.log("JJJJJ", window.location);

  const getUser = async () => {
    setLoading(true);
    // const user = await Get(`${USERS.getOne}${id}`, token);
    // setUser(user);

    let _user = users.find((item) => item.id == id);

    console.log("_user", _user);
    setUser(_user);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(
        USERS.toggleStatus + "/" + user._id,
        token,
        {}
      );
      const newUser = { ...user };

      newUser.isActive = !user.isActive;
      setModalOpen(false);
      setUser(newUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Users Details
            </h1>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {user && (
              <Select
                className={user?.isActive ? "greenSelect" : "redSelect"}
                suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
                value={user?.isActive ? "active" : "inactive"}
                onChange={() => setModalOpen(true)}
                style={{
                  fontSize: 16,
                }}
                bordered={false}
                options={[
                  {
                    value: "active",
                    label: "Active",
                  },
                  {
                    value: "inactive",
                    label: "Inactive",
                  },
                ]}
              />
            )}
          </Col>
        </Row>
        <br />

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        )}

        {!loading && user && (
          <>
            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  size={100}
                  icon={
                    !user?.image ? (
                      <UserOutlined />
                    ) : (
                      <Avatar size={40} src={UPLOADS_URL + user.image} />
                    )
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />{" "}
                &emsp;
                <h1
                  className="pageTitle"
                  style={{ margin: 0, textTransform: "capitalize" }}
                >
                  {}
                </h1>
              </Col>
              {/* <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <h1 className="pageTitle" style={{ margin: 0 }}>
                  {user?.followers || 0}{" "}
                </h1>
                <p>Followers</p>
              </Col> */}
            </Row>
            <Row style={{ padding: "20px" }}>
              <Col xs={24} md={16}>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Name{" "}
                    </h5>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.fullname}
                    </h5>
                  </Col>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Email Address{" "}
                    </h5>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.email}
                    </h5>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Phone Number{" "}
                    </h5>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.phone}
                    </h5>
                  </Col>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "block",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Registered On{" "}
                    </h5>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 16,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.registered}
                    </h5>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* {user?.experiances?.length > 0 &&
        <>
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Experiance
            </h1>
          </Col>
        </Row>

        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            {user?.experiances.map((item, index) => {
                return (
                  <Row style={{ padding: "10px" }}>
                    <Col xs={24} md={12}>
                      <h5
                        style={{
                          display: "inline",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {item?.jobTitle}
                      </h5>
                    </Col>
                    <Col xs={24} md={12}>
                      <h5 style={{ fontSize: 16, color: "#7a7e7f" }}>
                        ABC Technologies (Pvt) Ltd
                      </h5>
                      <h5 style={{ fontSize: 16, color: "#7a7e7f" }}>
                        Sep 2021 - Present · 1 yr 5 mos
                      </h5>
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
        </>}
        

        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Availability
            </h1>
          </Col>
        </Row>

        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <table
              className="table"
              style={{ border: "1px solid #dee2e6", width: "100%" }}
            >
              <thead
                style={{
                  backgroundColor: "#b78a39",
                  color: "white",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                <tr>
                  <th>Days</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody
                style={{
                  color: "#a49a92",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <tr>
                  <td>Monday</td>
                  <td>9:00 am</td>
                  <td>5:00 pm</td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>9:00 am</td>
                  <td>5:00 pm</td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>9:00 am</td>
                  <td>5:00 pm</td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>9:00 am</td>
                  <td>5:00 pm</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row> */}
          </>
        )}

        <br />
        <br />
      </div>

      <Modal
        open={modalOpen}
        onOk={() => handleStatus()}
        onCancel={() => setModalOpen(false)}
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
          style: {
            border: "2px solid #b78a39",
            color: "#b78a39",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#b78a39",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #b78a39",
          },
        }}
      >
        <Image
          src="../images/question.png"
          preview={false}
          width={100}
          height={120}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          {user?.isActive ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To {user?.isActive ? "Deactivate" : "Activate"} This User?
        </Typography.Text>
      </Modal>

      <br />
      <br />
    </Layout>
  );
}
export default UserDetails;
