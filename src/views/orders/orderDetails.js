import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  TextArea,
  Button,
  InputNumber,
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
import { UPLOADS_URL, ORDERS , CONTENT_TYPE, ORD, ORDERSERSEVENT } from "../../config/constants";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

function OrderDetails() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [order, setOrder] = useState({});


  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    setLoading(true);
    const response = await Get(`${ORDERS.getOrderById}${id}`, token);
    if(response?.status){
      setOrder(response?.data?.order);
    }
    setLoading(false);
  };


  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };


  const deleteCategory = () => {

    Post(ORDERS.deleteCategory+id, {},token)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success","Category deleted successfully","success");
          navigate(-1)
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
  };

  const onFinish = (values) => {
    Post(ORDERS.updateCategory+id, values,token)
      .then((response) => {
        setLoading(false);
        console.log("response",response)
        if (response?.data?.status) {
          swal("Success","Category updated successfully","success");
          navigate(-1)
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
  };

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 18px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "18px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
            View Order
            </h1>
          </Col>
        </Row>
        <br />
        {loading ? (
          <div style={{ padding: "30px" }}>
            <Skeleton active /> <br />
            <br /> <Skeleton.Button active />
          </div>
        ) : (
          <Row style={{ padding: "18px" }}>
            <Col xs={24} md={16}>
              {order && <Row style={{ padding: "10px" }}>
                <Col xs={24} md={18}>
                  
                <Row padding={[20,20]} style={{ padding: "10px" }}>
                          <Col xs={24} md={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Customer Name
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {order?.user?.firstName + " " + order?.user?.lastName}
                            </Typography.Text>
                          </Col>
                          <Col xs={24} md={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                            Total Amount
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              $ {order?.totalAmount}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row padding={[20,20]} style={{ padding: "10px" }}>
                          <Col xs={24} md={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                             Address
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {order?.address}
                            </Typography.Text>
                          </Col>
                          <Col xs={24} md={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                            City
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {order?.city}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row padding={[20,20]} style={{ padding: "10px" }}>
                          <Col xs={24} md={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                             State
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {order?.state}
                            </Typography.Text>
                          </Col>
                          <Col xs={24} md={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                            Zip
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {order?.zip}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row padding={[20,20]} style={{ padding: "10px" }}>
                          <Col xs={24} md={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                             Phone
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {order?.phone}
                            </Typography.Text>
                          </Col>
                          <Col xs={24} md={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                            Status
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {order?.status}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br/>
                        <hr/>
                        <br/>

                        {order?.items && order?.items.length > 0 && order?.items.map((item,index) => {
                          return(<Row padding={[20,20]} style={{ padding: "10px" }}>
                            <Col xs={24} md={24}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "20px",fontWeight:'bold' }}
                            >
                             Product {index + 1}
                            </Typography.Title>
                            </Col>
                          <Col xs={24} md={8}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                             sku
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {item?.product?.sku}
                            </Typography.Text>
                          </Col>
                          <Col xs={24} md={8}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                            Title
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                            {item?.product?.title}
                            </Typography.Text>
                          </Col>
                          <Col xs={24} md={8}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                             Price
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {item?.product?.price}
                            </Typography.Text>
                          </Col>
                        </Row>);
                        })}
                        <br />
                        <Row style={{ padding: "10px" }}>
                         
                          <Button
                            type="button"
                            htmlType="button"
                            size={"large"}
                            style={{ padding: "10px 40px", height: "auto", background:"#b2001b", color:'white' }}
                          
                            onClick={() => handleDeleteButtonClick()}
                          >
                            Delete Category
                          </Button>
                        </Row>
                </Col>
              </Row>}
            </Col>
          </Row>
        )}

        <br />
        <br />

        <Modal
        open={modalOpen}
        onOk={() => deleteCategory()}
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
          className: "no-btn",
        }}
        okButtonProps={{
          className: "yes-btn",
        }}
      >
        <Image
          src="../images/question.png"
          preview={false}
          width={74}
          height={74}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
        System Message!
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Are You Sure You Want To Delete This Category?
        </Typography.Text>
      </Modal>
      </div>
    </Layout>
  );
}
export default OrderDetails;
