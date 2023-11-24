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
import { UPLOADS_URL, STATES , CONTENT_TYPE,EVENT } from "../../config/constants";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

function StateDetails() {
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
    if(response?.data?.status){
      setState(response?.data?.state);
    }
    setLoading(false);
  };


  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };


  const deleteState = () => {

    Post(STATES.deleteState+id, {},token)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success","State deleted successfully","success");
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



    Post(STATES.updateState+id, formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        console.log(response)
        if (response?.data?.status) {
          swal("Success","State updated successfully","success");
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
              {editMode ? "Edit" : "View"} State
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
                    {editMode ? (
                      <>
                        <Form.Item
                          label="Flag"
                          name="image"
                         
                          rules={[
                            {
                              required: true,
                              message: "Please Upload Image!",
                            },
                          ]}
                        >
                          <Upload
                            className="uploadBtn"
                            beforeUpload={(file) => {
                              // setImageNew(URL.createObjectURL(file));
                              return false;
                            }}
                          >
                            <div
                              className="dotted-border"
                              style={{ height: "auto", padding: "10px" }}
                            >
                              <Image
                                src={UPLOADS_URL + "/" + state?.flag}
                                preview={false}
                                height={120}
                              />
                            </div>
                          </Upload>
                        </Form.Item>

                        <Form.Item
                          label="State Number"
                          name="stateNo"
                          initialValue={state?.stateNo}
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
                          initialValue={state?.name}
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
                          initialValue={state?.abbreviation}
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
                          <Col xs={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              Flag
                            </Typography.Title>
                            <Image
                              src={UPLOADS_URL + "/" + state.flag}
                              style={{ width: "100%" }}
                            />
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }}>
                          <Col>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px" }}
                            >
                              State number
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {state.stateNo}
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
                              Name
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {state.name}
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
                              Abbreviation
                            </Typography.Title>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {state.abbreviation}
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
                            Edit State
                          </Button>
                          &emsp;
                          <Button
                            type="button"
                            htmlType="button"
                            size={"large"}
                            style={{ padding: "10px 40px", height: "auto", background:"#b2001b", color:'white' }}
                          
                            onClick={() => handleDeleteButtonClick()}
                          >
                            Delete State
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
        onOk={() => deleteState()}
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
        Are You Sure You Want To Delete This State?
        </Typography.Text>
      </Modal>
      </div>
    </Layout>
  );
}
export default StateDetails;
