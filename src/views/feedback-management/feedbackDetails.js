import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  Button,
  Layout,
  Image,
  Modal,
  Skeleton,
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { USERS } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function FeedbackDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Bella Edward",
      email: "abc@emaple.com",
      subject: "ABC",
      date: "mm/dd/yyyy",
      message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    // Add more user objects as needed
  ]);

  useEffect(() => {
    getUser();
  }, []);

  console.log("JJJJJ", window.location);

  const getUser = async () => {
    setLoading(true);
    // const user = await Get(`${USERS.getOne}${id}`, token);
    // setUser(user);

    let _user = users.find((item) => item.id == id);

    console.log("_user", _user);
    setUser(_user);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(
        USERS.toggleStatus + "/" + user._id,
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
  const handleDeleteButtonClick = () => {
    setModalOpen(true);
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
              View Feedback
            </h1>
          </Col>
        </Row>
        <br />

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        )}

        {!loading && user && (
          <>
            <Row style={{ padding: "20px" }}>
              <Col xs={24} md={16}>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Name:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">{user?.name}</h5>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Email:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">{user?.email}</h5>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Subject:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">{user?.subject}</h5>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Date:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">{user?.date}</h5>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div>
                      <h4 className="heading-inner-medium">Message:</h4>
                    </div>
                  </Col>
                  <Col xs={24} md={14}>
                    <div>
                      <h5 className="heading-inner-text">{user?.message}</h5>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}

        <br />
        <br />

        <Modal
          open={modalOpen}
          onOk={() => handleStatus()}
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
            Are You Sure You Want To Delete This Book?
          </Typography.Text>
        </Modal>
      </div>
    </Layout>
  );
}
export default FeedbackDetails;
