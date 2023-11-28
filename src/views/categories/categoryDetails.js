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
import { UPLOADS_URL, CATEGORIES , CONTENT_TYPE, CATEGORIESEVENT } from "../../config/constants";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

function CategoryDetails() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [category, setCategory] = useState({});


  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setLoading(true);
    const response = await Get(`${CATEGORIES.getCategoryById}${id}`, token);
    if(response?.status){
      setCategory(response?.data?.category);
    }
    setLoading(false);
  };


  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };


  const deleteCategory = () => {

    Post(CATEGORIES.deleteCategory+id, {},token)
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
    Post(CATEGORIES.updateCategory+id, values,token)
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
              {editMode ? "Edit" : "View"} Category
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
          <Row style={{ padding: "20px" }}>
            <Col xs={24} md={16}>
              <Row style={{ padding: "10px" }}>
                <Col xs={24} md={11}>
                  <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                      span: 0,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    onFinish={onFinish}
                  >
                    {editMode ? (
                      <>
                        <Form.Item
                          label="Title"
                          name="title"
                          initialValue={category?.title}
                          rules={[
                           
                            {
                              required: true,
                              message: "Please input category title!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter Category Title"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "10px 20px",
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Description"
                          name="description"
                          initialValue={category?.description}
                          rules={[
                           
                            {
                              required: true,
                              message: "Please input category description!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter Category Description"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "10px 20px",
                            }}
                          />
                        </Form.Item>
                        <br />
                        <Row justify="">
                          <Form.Item>
                            <Button
                              type="button"
                              htmlType="submit"
                              size={"large"}
                              style={{ padding: "12px 40px", height: "auto" }}
                              className="mainButton graden-bg"
                            >
                              Update
                            </Button>
                          </Form.Item>
&emsp;
                          <Button
                              type="button"
                              htmlType="button"
                              ghost
                              style={{ padding: "10px 40px", height: "43px", borderColor:"#aeafaf", color:"#aeafaf" }}
                              className="mainButton "
                              onClick={() => setEditMode(false)}
                            >
                              Cancel
                            </Button>
                        </Row>{" "}
                      </>
                    ) : (
                      <>
                        <Row style={{ padding: "10px" }}>
                          <Col>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Title
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {category.title}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }}>
                          <Col>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Description
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {category.description}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }}>
                          <Button
                            type="button"
                            htmlType="button"
                            size={"large"}
                            style={{ padding: "12px 40px", height: "auto" }}
                            className="mainButton graden-bg"
                            onClick={() => setEditMode(true)}
                          >
                            Edit Category
                          </Button>
                          &emsp;
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
                      </>
                    )}
                  </Form>
                </Col>
              </Row>
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
export default CategoryDetails;
