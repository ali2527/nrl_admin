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
  Popover,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Modal,
  Skeleton,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOADS_URL, STATES , CONTENT_TYPE,EVENT } from "../../config/constants";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

function AddState() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [state, setState] = useState({});


  useEffect(() => {
    getState();
  }, []);

  const getState = async () => {
    setLoading(true);
    const response = await Get(`${STATES.getStateById}${id}`, token);
    setState(response?.data?.state);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(
        STATES.toggleStatus + "/" + user._id,
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


  const onFinish = (values) => {

    let data = {
      name: values.name,
      abbreviation: values.abbreviation,
      stateNo: values.stateNo
    };

       
    const formObject = new FormData();

    for (const key in data) {
      const item = values[key];
      formObject.append(key, item);
    }


    if(values?.image?.fileList){
      formObject.append("image",values.image.fileList[0].originFileObj);
    }



    Post(STATES.addState, formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        console.log(response)
        if (response?.data?.status) {
          swal("Success","State added successfully","success");
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
             Add State
            </h1>
          </Col>
        </Row>
        <br />
        {loading ? (
          <div style={{ padding: "30px" }}>
            <Skeleton.Image active /> <br />
            <br /> <Skeleton active /> <br />
            <br /> <Skeleton active /> <br />
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
               
                        <Form.Item
                          label="Flag"
                          name="image"
                          initialValue={state?.flag}
                          rules={[
                            {
                              required: true,
                              message: "Please Upload Image!",
                            },
                          ]}
                        >
                         <Upload className="uploadBtn"  beforeUpload={(file) => {
                                    // setImageNew(URL.createObjectURL(file));
                                    return false;
                                  }}>
                                      <div className="dotted-border">

                        <Button icon={<UploadOutlined />}>+Upload Image</Button>
                                      </div>
                      </Upload>


                        </Form.Item>
                        <Form.Item
                          label="State Number"
                          name="stateNo"
                          rules={[
                            
                            {
                              required: true,
                              message: "Please input state number!",
                            },
                          ]}
                        >
                          <InputNumber
                       
                            placeholder="Enter State Number"
                            style={{
                              borderRadius: "5px",
                              width:"100%",
                              background: "white",
                              fontSize: "14px",
                              padding: "5px 20px",
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Name"
                          name="name"
                          rules={[
                            
                            {
                              required: true,
                              message: "Please input state name!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter State Name"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "10px 20px",
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Abbreviation"
                          name="abbreviation"
                          rules={[
                            
                            {
                              required: true,
                              message: "Please input state abbreviation!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter State Abbreviation"
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
                              Add 
                            </Button>
                          </Form.Item>
                        </Row>{" "}
                    
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
          onOk={() => handleStatus()}
          onCancel={() => setModalOpen(false)}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              className="yes-btn"
            >
              Okay
            </Button>,
          ]}
          cancelButtonProps={false}
          okText="Yes"
          className="StyledModal"
          style={{
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
          okButtonProps={{}}
        >
          <Image
            src="../images/done.png"
            preview={false}
            width={74}
            height={74}
          />
          <Typography.Title level={4} style={{ fontSize: "25px" }}>
            System Message!
          </Typography.Title>
          <Typography.Text style={{ fontSize: "16px" }}>
            Content Of The Page Has Been Updated Successfully!
          </Typography.Text>
        </Modal>
      </div>
    </Layout>
  );
}
export default AddState;
