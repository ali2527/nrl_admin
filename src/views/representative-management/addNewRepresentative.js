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

function AddRepresentative() {
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [states, setStates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [courses, setCourses] = useState([]);

  const [representative, setRepresentative] = useState({});

  useEffect(() => {
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
   
    try {
      const response = await Get(STATES.getAllStates, token, {
        page: 1,
        limit: 100,
      });
   
      console.log("csss", response);
      if (response?.status) {
        setStates(response?.data?.docs);
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
   
    }
  };

  const getAllPositions = async () => {
   
    try {
      const response = await Get(POSITIONS.getAllPositions, token, {
        page: "1",
        limit: "100",
      });
   
      console.log("csss", response);
      if (response?.status) {
        setPositions(response?.data?.docs);
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
   
    }
  };



  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };

  const onFinish = (values) => {
    setLoading(true);
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


    Post(REPRESENTATIVE.addRepresentative , formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        console.log(response);
        if (response?.data?.status) {
          swal("Success", "Representative added successfully", "success");
          navigate(-1)
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }

        setLoading(false)
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false)
     
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
             Add Representative
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={16}
            style={{ display: "flex", alignItems: "center" }}
          >
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
                               <Button icon={<UploadOutlined />}>+Upload Image</Button>
                              </div>
                            </Upload>
                          </Form.Item>
                        </Col>
                        <Col xs={12} />
                        <Col xs={12}>
                          <Form.Item
                            label="Student Name"
                            name="name"
                            initialValue={representative?.name}
                            rules={[
                              {
                                required: true,
                                message: "Please input representative name!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter representative Name"
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
                           label="Teacher"
                           name="teacher"
                           initialValue={representative?.reportCard?.teacher}
                            rules={[
                              {
                                required: true,
                                message: "Please input teacher name!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter teacher Name"
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
                            label="Term"
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
                                {loading ? "Loading..." : "Add Representative"}
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
                              onClick={() => navigate(-1)}
                            >
                              Cancel
                            </Button>
                          </Row>
                        </Col>
                      </Row>
                      </Form>

          </Col>
          </Row>
      
      </div>
    </Layout>
  );
}
export default AddRepresentative;
