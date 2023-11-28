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
import { CONTENT_TYPE,CATE, CATEGORIES } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
const { TextArea } = Input;

function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);


  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    Post(CATEGORIES.addCategory, values,token)
      .then((response) => {
        setLoading(false);
        console.log(response)
        if (response?.data?.status) {
          swal("Success","Category added successfully","success");
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
              Add New Category
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
                    label="Category Title"
                    name="title"
                    rules={[
                      
                      {
                        required: true,
                        message: "Please input Category Title!",
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
                    label="Category Description"
                    name="description"
                    rules={[
                      
                      {
                        required: true,
                        message: "Please enter Category Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter Category Description"
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
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
                        Add Category
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
export default Category;
