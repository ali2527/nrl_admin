import { useState } from "react";
import { Col, Row, Layout, Upload,Avatar, Form, Button,Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {USER , UPLOADS_URL} from "../../config/constants"
import { CONTENT_TYPE } from "../../config/constants";
import swal from "sweetalert";
import { Post } from "../../config/api/post";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import avatar from "../../assets/avatar.png"
import { TbCameraPlus } from "react-icons/tb";



function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [imageNew, setImageNew] = useState();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);

  const onFinish = (values) => {
   
    const formObject = new FormData();

    if(imageNew){
      formObject.append("image",values.image.fileList[0].originFileObj);
    }
    for (const key in values) {
      if (key !== "image") {
        const item = values[key];
        formObject.append(key, item);
      }
    }


    Post(USER.updateProfile,formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
       
        if (response?.data?.status) {
          console.log(response?.data)
          dispatch(
            addUser({ user: response.data.data, token: token })
          );

          swal("Success!", "Profile Updated Successfully", "success");
         
          setEditMode(false);
          setImageNew()
        } else {
          swal("Oops!", response.data.message, "error");
        }
      })
      .catch((e) => {

       console.log(e)
      });
  };


  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            <h1 className="pageTitle" style={{ margin: 0 }}>
              My Profile
            </h1>
          </Col>
        </Row>
        <br />
        <>
        <Row style={{ padding: "20px" }}>
                <Col xs={24} md={24}>
                  <Row
                    style={{ justifyContent: "center", textAlign: "center" }}
                  >
                    <Col xs={24} md={12} >
                      <Form
                        layout="vertical"
                        name="basic"
                        labelCol={{
                          span: 0,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        initialValues={user}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                      >
                        <Row justify={"center"}>
                          <Col>
                            {editMode ? (
                              <Form.Item name="image">
                                <Upload
                                  name="image"
                                  showUploadList={false}
                                  style={{ position: "relative" }}
                                  beforeUpload={(file) => {
                                    setImageNew(URL.createObjectURL(file));
                                    return false;
                                  }}
                                >
                                  {" "}
                                  <div
                                    style={{
                                      padding: "8px",
                                      position: "absolute",
                                      right: -10,
                                      zIndex: 2,
                                      bottom: 40,
                                      backgroundColor: "#243D62",
                                      display: "flex",
                                      maxWidth: "fit-content",
                                      color: "white",
                                      borderRadius: "20px",
                                    }}
                                  >
                                    <TbCameraPlus />
                                  </div>{" "}
                                  <Avatar
                                    size={120}
                                    src={
                                      imageNew
                                        ? imageNew
                                        : !user?.image
                                        ? avatar
                                        : UPLOADS_URL + "/" + user?.image
                                    }
                                  />
                                </Upload>
                              </Form.Item>
                            ) : (
                              <Avatar
                                size={120}
                                src={
                                  !user?.image
                                    ? avatar
                                    : UPLOADS_URL + "/" + user?.image
                                }
                              />
                            )}
                            
                          </Col>
                        </Row>
                        <br />
                        <br />
                        <Row
                          style={{
                            padding: "10px",
                            justifyContent: "space-between",
                          }}
                          gutter={[20,20]}
                        >
                          <Col xs={24} md={8}>
                            {editMode ? (
                              <Form.Item
                                label="First Name"
                                name="firstName"
                                initialValue={user?.firstName}
                                rules={[
                                  {
                                    type: "text",
                                    // warningOnly: true,
                                  },
                                  {
                                    required: true,
                                    message: "Please input firstName!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Bella"
                                  style={{
                                    borderRadius: "5px",
                                    background: "white",
                                    fontSize: "14px",
                                    padding: "10px 20px",
                                  }}
                                />
                              </Form.Item>
                            ) : (
                              <>
                                {" "}
                                <h5
                                  style={{
                                    display: "inline",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                  }}
                                >
                                  First Name{" "}
                                </h5>
                                <h5
                                  style={{
                                    display: "block",
                                    fontSize: 16,
                                    color: "#7a7e7f",
                                    marginBottom:"20px"
                                  }}
                                >
                                  {user?.firstName}
                                </h5>
                              </>
                            )}
                          </Col>
                          <Col xs={24} md={8}>
                            {editMode ? (
                              <Form.Item
                                label="Last Name"
                                name="lastName"
                                initialValue={user?.lastName}
                                rules={[
                                  {
                                    type: "text",
                                    // warningOnly: true,
                                  },
                                  {
                                    required: true,
                                    message: "Please input lastName!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Bella"
                                  style={{
                                    borderRadius: "5px",
                                    background: "white",
                                    fontSize: "14px",
                                    padding: "10px 20px",
                                  }}
                                />
                              </Form.Item>
                            ) : (
                              <>
                                {" "}
                                <h5
                                  style={{
                                    display: "inline",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                  }}
                                >
                                  Last Name{" "}
                                </h5>
                                <h5
                                  style={{
                                    display: "block",
                                    fontSize: 16,
                                    color: "#7a7e7f",
                                    marginBottom:"20px"

                                  }}
                                >
                                  {user?.lastName}
                                </h5>
                              </>
                            )}
                          </Col>
                          <Col xs={24} md={8}>
                            {editMode ? (
                              <Form.Item
                                label="Email Address"
                                name="email"
                                rules={[
                                  {
                                    type: "text",
                                    // warningOnly: true,
                                  },
                                  {
                                    required: true,
                                    message: "Please input name!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  disabled
                                  // placeholder="bellaedward@gmail.com"
                                  initialValue={user?.email}
                                  style={{
                                    borderRadius: "5px",
                                    background: "white",
                                    fontSize: "14px",
                                    padding: "10px 20px",
                                  }}
                                />
                              </Form.Item>
                            ) : (
                              <>
                                {" "}
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
                                    marginBottom:"20px"
                                  }}
                                >
                                  {user?.email}
                                </h5>
                              </>
                            )}
                          </Col>
                        </Row>

                        <Row justify="center">
                          {editMode && (
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                size={"large"}
                                style={{ padding: "12px 40px", height: "auto" }}
                                className="mainButton graden-bg"
                                // onClick={() => setEditMode(true)}
                              >
                                Update Profile
                              </Button>
                            </Form.Item>
                          )}
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                  {!editMode && (
                    <Row justify="center">
                      <Button
                        type="button"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton graden-bg"
                        onClick={() => setEditMode(true)}
                      >
                        Edit Profile
                      </Button>
                    </Row>
                  )}
                </Col>
              </Row>
              <Row justify={"center"}>
                          <Col>
                           
                            <h5
                              className="change-pas-link"
                              onClick={() => navigate("/profile/changePass")}
                            >
                              Change Password
                            </h5>
                          </Col>
                        </Row>
        </>
        <br />
        <br />

      </div>
    </Layout>
  );
}
export default Profile;
