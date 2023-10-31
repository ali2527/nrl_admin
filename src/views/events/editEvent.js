import React, { useState,useEffect } from "react";
import {
  Col,
  Row, Form,
  Input,
  Image,
  Button, Layout,DatePicker
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { Get } from "../../config/api/get";
import { CONTENT_TYPE,EVENT, UPLOADS_URL } from "../../config/constants";
import { Upload } from "antd";
import swal from "sweetalert";
import dayjs from 'dayjs'
const { TextArea } = Input;


function EventEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { id } = useParams();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);
  const [event, setEvent] = useState(null);


    useEffect(() => {
    if (id) {
      getEventDetails();
    }
  }, []);

  const getEventDetails = async () => {
    setLoading(true);
    const response = await Get(`${EVENT.getEventById}${id}`, token);
    if(response.status){
      setEvent(response.data.event)
    }
    setLoading(false);
  };


  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);


    let data = {
      location: values.location,
      address: values.address,
      date: values.date,
      title: values.title,
      description: values.description,
    };

       
    const formObject = new FormData();

    for (const key in data) {
      const item = values[key];
      formObject.append(key, item);
    }


    if(values?.image?.fileList){
      formObject.append("image",values.image.fileList[0].originFileObj);
    }



    Post(EVENT.updateEvent+id, formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        console.log(response)
        if (response?.data?.status) {
          swal("Success","Event updated successfully","success");
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


  console.log("event",event?.title)

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
              Edit Event
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={11}>
               {event && <Form
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  // initialValues={event}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Event Title"
                    name="title"
                    initialValue={event?.title}
                    rules={[
                      {
                        required: true,
                        message: "Please input Event Title!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Event Title"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Event Image"
                    name="image"
                    initialValue={event?.image}
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
                                      <div className="dotted-border" style={{height:"auto",padding:"10px"}}>

                                      <Image
          src={UPLOADS_URL + "/" + event.image}
          preview={false}
          height={120}
        />
                                      </div>
                      </Upload>
                    
                  </Form.Item>

                  <Form.Item
                    label="Event Description"
                    name="description"
                    initialValue={event?.description}
                    rules={[
                      
                      {
                        required: true,
                        message: "Please enter Event Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter Event Description"
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Location"
                    name="location"
                    initialValue={event?.location}
                    rules={[
                      
                      {
                        required: true,
                        message: "Please Input Event Location!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Event Location"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    initialValue={event?.address}
                    rules={[
                      
                      {
                        required: true,
                        message: "Please enter Address!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Address"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Date"
                    name="date"
                    initialValue={dayjs(event?.date) || null}
                    rules={[
                      
                      {
                        required: true,
                        message: "Please enter Date!",
                      },
                    ]}
                  >
                    <DatePicker 
                      size="large"
                      placeholder="Select Date"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                        width:"100%"
                      }}
                    />
                  </Form.Item>
                  <br />

                  <Row justify="">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size={"large"}
                        style={{ padding: "12px 40px", height: "auto" }}
                        className="mainButton graden-bg"
                       
                      >
                        Update Event
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>}

                
              </Col>
            </Row>
          </Col>
        </Row>


      </div>
    </Layout>
  );
}
export default EventEdit;



