import React from "react";
import AuthLayout from "../../components/AuthLayout";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Checkbox,
  Tabs,
  Table,
  Image,
  Divider,
  Layout,
} from "antd";
import { useNavigate,useLocation } from "react-router";
import Link from "antd/es/typography/Link";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants";
import swal from 'sweetalert'
// import router from "next/router";




function ForgetPassword() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  let [codeData, setCodeData] = React.useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });


  const onFinish = (values) => {
    Post(AUTH.verifyCode, {code:values.code,email:state.email})
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success", response?.data?.message, "success");
          navigate("/forgot-password-3", { replace: true,state:{code:values.code,email:state.email} });
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
        }
      })
      .catch((e) => {
        console.log(e,"ww")
        swal("Oops!","internal server error", "error");
        setLoading(false);
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
          padding: window.innerWidth < 500 ? "10px" :"100px" ,
          justifyContent: "center",
        }}
      >
                <Col xs={24} md={10} style={{background:'#040404'}} className="formMainWrap">
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

              <h2 class="authFormHeading">Forgot Password</h2>
              <p style={{color:'white'}}>An Email Has Been Sent To You With A Verification Code. Please Enter It Here.</p>
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
                  label="Verification Code"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Verification Code",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter Verification Code"
                    style={{
                      borderRadius: "5px",
                      background: "white",
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
                      Continue
                    </Button>
                  </Form.Item>
                </Row>
                <Row justify="center">
                <span style={{textDecoration:"underlined",fontWeight:"bold",cursor:'pointer'}} onClick={()=>  navigate("/signin")}>
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
                  style={{width:"300px"}}
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
            {/* <div className="loginProp loginProp1">
                <Image src={"/images/loginProp1.png"} alt="" preview={false} />
              </div>
              <div className="loginProp loginProp2">
                <Image src={"/images/loginProp2.png"} alt="" preview={false} />
              </div>
              <div className="loginProp loginProp3">
                <Image src={"/images/loginProp3.png"} alt="" preview={false} />
              </div> */}
          </div>
        </Col>
      </Row>
    </Layout>
  </AuthLayout>
  );
}

export default ForgetPassword;
