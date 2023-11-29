import React, { useState } from "react";
import {
  Col,
  Row, Form,
  Input,
  Button, Layout,DatePicker
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { CONTENT_TYPE,CATE, NEWS } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
const { TextArea } = Input;

function News() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);


  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    Post(NEWS.addNews, values,token)
      .then((response) => {
        setLoading(false);
        console.log(response)
        if (response?.data?.status) {
          swal("Success","News added successfully","success");
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
              Add New News
            </h1>
          </Col>
        </Row>
        <br />
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
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="News Title"
                    name="title"
                    rules={[
                      
                      {
                        required: true,
                        message: "Please input News Title!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter News Title"
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
                    rules={[
                      
                      {
                        required: true,
                        message: "Please enter News Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter News Description"
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Iframe ID"
                    name="iframeID"
                    rules={[
                      
                      {
                        required: true,
                        message: "Please enter video iframeID!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Video iframeID"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="News Date"
                    name="date"
                    rules={[
                      
                      {
                        required: true,
                        message: "Please enter News Date!",
                      },
                    ]}
                  >
                   <DatePicker
                            size="large"
                            placeholder="Enter News Date"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              width:"100%",
                              padding: "10px 20px",
                            }}
                          />
                  </Form.Item>


                  <Row justify="">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton graden-bg"
                       
                      >
                        Add News
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>


      </div>
    </Layout>
  );
}
export default News;
