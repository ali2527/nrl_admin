import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Layout,
  Input,
  Button,
  Checkbox,
  Tabs,
  Table,
  Image,
  Modal,
  Divider,
} from "antd";
import Link from "antd/es/typography/Link";
import { useNavigate, useLocation } from "react-router";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants";
import swal from "sweetalert";

function ForgetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: state.email,
      code: state.code,
    };
    Post(AUTH.resetPassword, data)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success", response?.data?.message, "success");
          navigate("/signin", { replace: true });
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch((e) => {
        swal("Oops!", "internal server error", "error");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthLayout
      head={{ title: "User Management", description: "Some Description." }}
    >
      <Layout style={{ backgroundColor: "#fff" }}>
        <Row
          style={{
            minHeight: "100vh",
            padding: window.innerWidth < 500 ? "10px" : "100px",
            justifyContent: "center",
          }}
        >
          <Col
            xs={24}
            md={10}
            style={{ background: "#040404" }}
            className="formMainWrap"
          >
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Col xs={24} md={20} className="formWrap">
                <Row style={{ width: "100%", textAlign: "center" }}>
                  <Col xs={24} md={0}>
                    <Image
                      src={"/images/logo.jpg"}
                      style={{ maxWidth: "200px" }}
                      alt=""
                      preview={false}
                    />
                  </Col>
                </Row>

                <h2 class="authFormHeading">Reset Password</h2>
                <p style={{ color: "white" }}>Enter New Password</p>
                <br />
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
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    className="authInput"
                    label="New Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter New Password"
                      style={{
                        borderRadius: "5px",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    className="authInput"
                    label="Confirm Password*"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Confirm Password!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Confirm Password"
                      style={{
                        borderRadius: "5px",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>
                  <br />

                  <Row justify="center">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          fontSize: "16px",
                          minWidth: "300px",
                          background:
                            "linear-gradient(rgb(172,172,172) 10%, rgb(190, 192, 194) 100%)",
                          padding: "10px",
                          height: "auto",
                          borderRadius: "5px",
                        }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Row>
                  <Row justify="center">
                    <span
                      style={{
                        textDecoration: "underlined",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/signin")}
                    >
                      Back to login
                    </span>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={8}>
            <div
              className="loginScreenContentWrapper"
              style={{ position: "relative" }}
            >
              <div class="loginScreenContent">
                <Image
                  src={"/images/logo.png"}
                  alt=""
                  style={{ width: "300px" }}
                  preview={false}
                  className="right-logo"
                />
                <h2 class="authHeading">National Reparations League</h2>
                <p class="text-white p-text">
                  Now we can avoid the loss of secrets by locking under the key
                  of technology while authorize interested parties to unlock it
                  with pride.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Layout>
    </AuthLayout>
  );
}

export default ForgetPassword;
