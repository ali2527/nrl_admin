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
  DatePicker,
} from "antd";
import ReactPlayer from 'react-player/youtube'

import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOADS_URL, HISTORIES , CONTENT_TYPE } from "../../config/constants";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

function HistoryDetails() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [history, setHistory] = useState({});


  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    setLoading(true);
    const response = await Get(`${HISTORIES.getHistoryById}${id}`, token);
    if(response?.status){
      setHistory(response?.data?.history);
    }
    setLoading(false);
  };


  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };


  const deleteHistory = () => {

    Post(HISTORIES.deleteHistory+id, {},token)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success","History deleted successfully","success");
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
    Post(HISTORIES.updateHistory+id, values,token)
      .then((response) => {
        setLoading(false);
        console.log("response",response)
        if (response?.data?.status) {
          swal("Success","History updated successfully","success");
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
            {editMode ? "Edit" : "View"} History
          </h1>
        </Col>
      </Row>
      <br />
      {loading ? (
        <div style={{ padding: "30px" }}>
          <Skeleton active /> <br />
          <br /> <Skeleton.Button active />
        </div>
      ) : (
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} >
               
  
                    <Row style={{ padding: "10px" }}>
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${history?.videoID}`} />
                      </Row>
                      <br />
                      <Row style={{ padding: "10px" }}>
                        <Col>
                          <Typography.Title
                            level={4}
                            style={{ fontSize: "18px" }}
                          >
                            Title
                          </Typography.Title>
                          <Typography.Text style={{ fontSize: "16px" }}>
                            {history?.title}
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
                            Description
                          </Typography.Title>
                          <Typography.Text style={{ fontSize: "16px" }}>
                            {history?.description}
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
                            Channel
                          </Typography.Title>
                          <Typography.Text style={{ fontSize: "16px" }}>
                            {history?.channel}
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
                            Date
                          </Typography.Title>
                          <Typography.Text style={{ fontSize: "16px" }}>
                          
                            {dayjs(history?.date).format("M/D/YYYY")}
                          </Typography.Text>
                        </Col>
                      </Row>
                      <br />
                     
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      <br />
      <br />

      <Modal
      open={modalOpen}
      onOk={() => deleteHistory()}
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
      Are You Sure You Want To Delete This News?
      </Typography.Text>
    </Modal>
    </div>
  </Layout>
  );
}
export default HistoryDetails;
