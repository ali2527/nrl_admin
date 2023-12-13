import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Card,
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
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { AiFillDelete } from "react-icons/ai";
import {
  UPLOADS_URL,
  REPRESENTATIVE,
  STATES,
  POSITIONS,
  CONTENT_TYPE,
} from "../../config/constants";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import Item from "antd/es/list/Item";

function RepresentativeDetail() {
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [states, setStates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [courses, setCourses] = useState([]);

  const [representative, setRepresentative] = useState({});

  useEffect(() => {
    getRepresentative();
    getAllStates();
    getAllPositions();
  }, []);


  const addCourses = () => {

    let _courses = [...courses]
    _courses.push({
      title:"",
  displayType:"RADIO",
  item:[],
  inputVisible:false
    })

    setCourses(_courses)
  }

  console.log("courses",courses)

  const handleCourse = (index,value,field) => {
    let _courses = [...courses]
    _courses[index][field] = value;
    setCourses(_courses)
  };

    
  const handleDeleteCourse = (subIndex) => {
    let _courses = [...courses]
    _courses = _courses.filter((item,indx) => indx !== subIndex);

   setCourses(_courses);
  };



  const getAllStates = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(STATES.getAllStates, token, {
        page: 1,
        limit: 100,
      });
      setLoading(false);
      console.log("csss", response);
      if (response?.status) {
        setStates(response?.data?.docs);
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getAllPositions = async (
    pageNumber,
    pageSize,
    search,
    reset = false
  ) => {
    setLoading(true);
    try {
      const response = await Get(POSITIONS.getAllPositions, token, {
        page: "1",
        limit: "100",
      });
      setLoading(false);
      console.log("csss", response);
      if (response?.status) {
        setPositions(response?.data?.docs);
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getRepresentative = async () => {
    setLoading(true);
    const response = await Get(
      `${REPRESENTATIVE.getRepresentativeById}${id}`,
      token
    );

    if (response?.data?.representative) {
      setRepresentative(response?.data?.representative);
      setCourses(response?.data?.representative?.reportCard?.courses)
    }
    setLoading(false);
  };

  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };

  const deleteRepresentative = () => {
    Post(REPRESENTATIVE.deleteRepresentative + id, {}, token)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success", "Representative deleted successfully", "success");
          navigate(-1);
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
  };

  const onFinish = (values) => {
    console.log("Success:", values);


    let data = {
      name: values.name,
      position: values.position,
      state: values.state,
    };


    let reportCard = {
      teacher:values.teacher,
      term:values.term,
      grade:values.grade,
      year:values.year,
      date:values.date,
      comment:values.comment,
      courses
    }
       
    const formObject = new FormData();

    for (const key in data) {
      const item = values[key];
      formObject.append(key, item);
    }

    formObject.append("reportCard",JSON.stringify(reportCard));


    if(values?.image?.fileList){
      formObject.append("image",values.image.fileList[0].originFileObj);
    }


    Post(REPRESENTATIVE.updateRepresentative + id, formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        console.log(response);
        if (response?.data?.status) {
          swal("Success", "Representative updated successfully", "success");
          setEditMode(false);
          getRepresentative()
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
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
              {editMode ? "Edit" : "View"} Representative
            </h1>
          </Col>
        </Row>
        <br />
        {loading ? (
          <div style={{ padding: "30px" }}>
            <Skeleton active /> <br />
            <br /> <Skeleton.Button active size="large" />{" "}
            <Skeleton.Button active size="large" />
          </div>
        ) : (
          <Row style={{ padding: "20px" }}>
            <Col xs={24}>
              <Row style={{ padding: "10px" }}>
                <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                  
                    {editMode ? (
                      <Form
                      layout="vertical"
                      name="basic"
                      form={form}
                      labelCol={{
                        span: 0,
                      }}
                      wrapperCol={{
                        span: 24,
                      }}
                      onFinish={onFinish}
                    >
                      <Row gutter={20}>
                        <Col xs={12}>
                          <Form.Item
                            label="Image"
                            name="image"
                            initialValue={representative?.image}
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
                                  src={
                                    UPLOADS_URL + "/" + representative?.image
                                  }
                                  preview={false}
                                  height={120}
                                />
                              </div>
                            </Upload>
                          </Form.Item>
                        </Col>
                        <Col xs={12} />
                        <Col xs={12}>
                          <Form.Item
                            label="Evaluatee"
                            name="name"
                            initialValue={representative?.name}
                            rules={[
                              {
                                required: true,
                                message: "Please input evaluatee name!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter evaluatee Name"
                              style={{
                                borderRadius: "5px",
                                background: "white",
                                fontSize: "14px",
                                padding: "10px 20px",
                              }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={12}>
                          <Form.Item
                           label="Evaluator"
                           name="teacher"
                           initialValue={representative?.reportCard?.teacher}
                            rules={[
                              {
                                required: true,
                                message: "Please input evaluator name!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter evaluator Name"
                              style={{
                                borderRadius: "5px",
                                background: "white",
                                fontSize: "14px",
                                padding: "10px 20px",
                              }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={12}>
                          <Form.Item
                            label="Updated"
                            name="term"
                            initialValue={representative?.reportCard?.term}
                            rules={[
                              {
                                required: true,
                                message: "Please input representative term!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter representative term"
                              style={{
                                borderRadius: "5px",
                                background: "white",
                                fontSize: "14px",
                                padding: "10px 20px",
                              }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={12}>
                          <Form.Item
                             label="Grade"
                             name="grade"
                             initialValue={representative?.reportCard?.grade}
                            rules={[
                              {
                                required: true,
                                message: "Please input representative grade!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter representative grade"
                              style={{
                                borderRadius: "5px",
                                background: "white",
                                fontSize: "14px",
                                padding: "10px 20px",
                              }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={12}>
                          <Form.Item
                            label="Year"
                            name="year"
                            initialValue={representative?.reportCard?.year}
                            rules={[
                              {
                                required: true,
                                message: "Please input representative year!",
                              },
                            ]}
                          >
                            <InputNumber
                              size="large"
                              placeholder="Enter representative year"
                              style={{
                                borderRadius: "5px",
                                width:'100%',
                                background: "white",
                                fontSize: "14px",
                                padding: "3px 20px",
                              }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={12}>
                          <Form.Item
                            label="Date"
                            name="date"
                            initialValue={dayjs(representative?.reportCard?.date) || null}
                            rules={[
                              {
                                required: true,
                                message: "Please input representative date!",
                              },
                            ]}
                          >
                            <DatePicker
                              size="large"
                              placeholder="Enter representative Date"
                              style={{
                                borderRadius: "5px",
                                background: "white",
                                width:'100%',
                                fontSize: "14px",
                                padding: "10px 20px",
                              }}
                            />
                          </Form.Item>
                        </Col>


                        <Col xs={12}>
                          <Form.Item
                            label="State"
                            name="state"
                            initialValue={representative?.state?._id}
                            rules={[
                              {
                                required: true,
                                message: "Please select representative state!",
                              },
                            ]}
                          >
                            <Select
                            className="FormSelect"
                            size="large"
                            style={{width:"100%", marginBottom:"20px"}}
                            placeholder="Select representative state"
                          >
                            {states.length > 0 && states.map(item => {
                              return(<Select.Option value={item._id}>{item.name}</Select.Option>)
                            })}
                          </Select>
                          </Form.Item>
                        </Col>

                        <Col xs={12}>
                          <Form.Item
                            label="Position"
                            name="position"
                            initialValue={representative?.position?._id}
                            rules={[
                              {
                                required: true,
                                message: "Please select representative position!",
                              },
                            ]}
                          >
                            <Select
                            className="FormSelect"
                            size="large"
                            style={{width:"100%", marginBottom:"20px"}}
                            placeholder="Select representative position"
                          >
                            {positions.length > 0 && positions.map(item => {
                              return(<Select.Option value={item._id}>{item.type}</Select.Option>)
                            })}
                          </Select>
                          </Form.Item>
                        </Col>

                        {courses.length > 0 &&
                    courses.map((subItem, subIndex) => {
                      return (
                        <>
                        <Col xs={7}>    <Input
                            size="large"
                            placeholder="Enter Name"
                            value={subItem.name}
                            onChange={(e) => handleCourse(subIndex,e.target.value,"name")}
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "10px 20px",
                              marginBottom:"20px"
                            }}
                          /></Col>
                           <Col xs={7}>    <Input
                            size="large"
                            placeholder="Enter Code"
                            value={subItem.code}
                            onChange={(e) => handleCourse(subIndex,e.target.value,"code")}
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "10px 20px",
                              marginBottom:"20px"
                            }}
                          /></Col>
                           <Col xs={7}>    <Input
                            size="large"
                            placeholder="Enter Grade"
                            value={subItem.grade}
                            onChange={(e) => handleCourse(subIndex,e.target.value,"grade")}
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "10px 20px",
                              marginBottom:"20px"
                            }}
                          /></Col>
                           <Col xs={3}><Button
                      type="primary"
                      htmlType="button"
                      size={"large"}
                      ghost
                      style={{
                        padding: "9px 40px",
                        color: "#000",
                        borderColor: "#000",
                        height: "auto",
                        marginTop:"0px"
                      }}
                      className="mainButton "
                      onClick={() => handleDeleteCourse(subIndex)}
                    >
                      <AiFillDelete style={{cursor:'pointer',fontSize:"18px",color:"#d5af68"}} />
                    </Button> </Col>
                 
                          
                         
               
          
                        </>
                      );
                    })}

<Col xs={12}>
                    <Button
                      type="primary"
                      htmlType="button"
                      size={"large"}
                      ghost
                      style={{
                        padding: "12px 40px",
                        color: "#000",
                        borderColor: "#000",
                        height: "auto",
                        marginTop:"0px"
                      }}
                      className="mainButton "
                      onClick={() => addCourses()}
                    >
                      + Add Course
                    </Button>
                  </Col>

                  <br/> <br/>  <br/>



                        
                        
                        <Col xs={24}>
                          <Form.Item
                            label="Comments"
                            name="comment"
                            initialValue={representative?.reportCard?.comment}
                            rules={[
                              {
                                required: true,
                                message: "Please input comment!",
                              },
                            ]}
                          >
                            <TextArea
                              size="large"
                              rows={4}
                              placeholder="Enter comments"
                              style={{
                                borderRadius: "5px",
                                background: "white",
                                fontSize: "14px",
                                padding: "10px 20px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        



                        <br />

                        <Col xs={12}>
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
                              style={{
                                padding: "10px 40px",
                                height: "43px",
                                borderColor: "#aeafaf",
                                color: "#aeafaf",
                              }}
                              className="mainButton "
                              onClick={() => setEditMode(false)}
                            >
                              Cancel
                            </Button>
                          </Row>
                        </Col>
                      </Row>
                      </Form>
                    ) : (
                      <>
                        <Card>
                          <Row
                            style={{ padding: "10px" }}
                            justify="space-between"
                          >
                            <Col
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                textAlign: "left",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography.Title
                                className="fontFamily3"
                                level={2}
                                style={{
                                  fontSize: "120px",
                                  margin: 0,
                                  color: "#AD1313",
                                  fontWeight: 900,
                                  textAlign: "left",
                                  lineHeight: 1,
                                }}
                              >
                                REPORT
                              </Typography.Title>
                              <Typography.Text
                                className="fontFamily3"
                                style={{
                                  fontSize: "80px",
                                  color: "#000",
                                  margin: 0,
                                  fontWeight: 900,
                                  lineHeight: 1,
                                }}
                              >
                                CARD{" "}
                                <hr
                                  style={{
                                    display: "inline-flex",
                                    border: "4px solid #AD1313",
                                    width: "250px",
                                  }}
                                />
                              </Typography.Text>
                            </Col>
                            <Col
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Image
                                src={UPLOADS_URL + "/" + representative.image}
                                width={250}
                                height={250}
                                style={{objectFit:"cover", objectPosition:'top'}}
                              />
                            </Col>
                          </Row>

                          <Row
                            style={{ padding: "10px" }}
                            justify="space-between"
                          >
                            <Col xs={24} md={12}>
                              <Row style={{ margin: "10px 0" }}>
                                <Col xs={24} md={12}>
                                  <Typography.Text
                                    style={{ fontSize: "20px" }}
                                    className="fontFamily3"
                                  >
                                    Evaluatee
                                  </Typography.Text>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Typography.Title
                                    className="fontFamily3"
                                    level={4}
                                  >
                                    {representative?.name}
                                  </Typography.Title>
                                </Col>
                              </Row>

                              <Row style={{ margin: "10px 0" }}>
                                <Col xs={24} md={12}>
                                  <Typography.Text
                                    style={{ fontSize: "20px" }}
                                    className="fontFamily3"
                                  >
                                    Position
                                  </Typography.Text>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Typography.Title
                                    className="fontFamily3"
                                    level={4}
                                  >
                                    {representative?.position?.type}
                                  </Typography.Title>
                                </Col>
                              </Row>

                              <Row style={{ margin: "10px 0" }}>
                                <Col xs={24} md={12}>
                                  <Typography.Text
                                    style={{ fontSize: "20px" }}
                                    className="fontFamily3"
                                  >
                                    Updated
                                  </Typography.Text>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Typography.Title
                                    className="fontFamily3"
                                    level={4}
                                  >
                                    {representative?.reportCard?.term}
                                  </Typography.Title>
                                </Col>
                              </Row>

                              <Row style={{ margin: "10px 0" }}>
                                <Col xs={24} md={12}>
                                  <Typography.Text
                                    style={{ fontSize: "20px" }}
                                    className="fontFamily3"
                                  >
                                    State
                                  </Typography.Text>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Typography.Title
                                    className="fontFamily3"
                                    level={4}
                                  >
                                    {representative?.state?.name}
                                  </Typography.Title>
                                </Col>
                              </Row>
                            </Col>

                            <Col xs={24} md={12}>
                              <Row style={{ margin: "10px 0" }}>
                                <Col xs={24} md={12}>
                                  <Typography.Text
                                    style={{ fontSize: "20px" }}
                                    className="fontFamily3"
                                  >
                                    Evaluator
                                  </Typography.Text>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Typography.Title
                                    className="fontFamily3"
                                    level={4}
                                  >
                                    {representative?.reportCard?.teacher}
                                  </Typography.Title>
                                </Col>
                              </Row>

                              <Row style={{ margin: "10px 0" }}>
                                <Col xs={24} md={12}>
                                  <Typography.Text
                                    style={{ fontSize: "20px" }}
                                    className="fontFamily3"
                                  >
                                    School Year
                                  </Typography.Text>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Typography.Title
                                    className="fontFamily3"
                                    level={4}
                                  >
                                    {representative?.reportCard?.year}
                                  </Typography.Title>
                                </Col>
                              </Row>

                              <Row style={{ margin: "10px 0" }}>
                                <Col xs={24} md={12}>
                                  <Typography.Text
                                    style={{ fontSize: "20px" }}
                                    className="fontFamily3"
                                  >
                                    Date
                                  </Typography.Text>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Typography.Title
                                    className="fontFamily3"
                                    level={4}
                                  >

                                    {dayjs(representative?.reportCard?.date).format("MMMM D, YYYY") }
                                  </Typography.Title>
                                </Col>
                              </Row>

                              {/* <Row style={{ margin: "10px 0" }}>
                                <Col xs={24} md={12}>
                                  <Typography.Text
                                    style={{ fontSize: "20px" }}
                                    className="fontFamily3"
                                  >
                                    Position
                                  </Typography.Text>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Typography.Title
                                    className="fontFamily3"
                                    level={4}
                                  >
                                    {representative?.position?.type}
                                  </Typography.Title>
                                </Col>
                              </Row> */}
                            </Col>
                          </Row>

                          <br />
                          <table class="reportCardTable">
                            <thead>
                              <tr>
                                <th>Course Name</th>
                                <th>Code</th>
                                <th>Grade</th>
                              </tr>
                            </thead>
                            <tbody>
                              {representative?.reportCard?.courses.length > 0 &&
                                representative?.reportCard?.courses.map(
                                  (item) => {
                                    return (
                                      <tr>
                                        <td>
                                          <span>{item.name}</span>
                                        </td>
                                        <td>
                                          <span>{item.code}</span>
                                        </td>
                                        <td>
                                          <span>{item.grade}</span>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                            </tbody>
                          </table>
                          <br />

                          <Row style={{ margin: "5px 0" }}>
                            <Typography.Title className="fontFamily3" level={4}>
                              Comments
                            </Typography.Title>
                          </Row>
                          <Row style={{ margin: "10px 0" }}>
                            <Typography.Text
                              style={{ fontSize: "20px" }}
                              className="fontFamily3"
                            >
                              {representative?.reportCard?.comment}
                            </Typography.Text>
                          </Row>
                        </Card>
                        <br />
                        <Row style={{ padding: "5px" }}>
                          <Button
                            type="button"
                            htmlType="button"
                            size={"large"}
                            style={{ padding: "12px 40px", height: "auto" }}
                            className="mainButton graden-bg"
                            onClick={() => setEditMode(true)}
                          >
                            Edit Representative
                          </Button>
                          &emsp;
                          <Button
                            type="button"
                            htmlType="button"
                            size={"large"}
                            style={{
                              padding: "10px 40px",
                              height: "auto",
                              background: "#b2001b",
                              color: "white",
                            }}
                            onClick={() => handleDeleteButtonClick()}
                          >
                            Delete Representative
                          </Button>
                        </Row>
                      </>
                    )}
                 
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        <br />
        <br />

        <Modal
          open={modalOpen}
          onOk={() => deleteRepresentative()}
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
            Are You Sure You Want To Delete This Representative?
          </Typography.Text>
        </Modal>
      </div>
    </Layout>
  );
}
export default RepresentativeDetail;
