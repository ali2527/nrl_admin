import { useState } from "react";
import {
  Col,
  Row,
  Input,
  Image,
  Button,
  Layout,
  TextArea,
  Modal,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import ImageGrid from "../../components/imagegrid";
import { AiFillDelete } from "react-icons/ai";

function AdvertiseBusiness() {
  const { TextArea } = Input;
  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };
  const [modalOpen, setModalOpen] = useState(false);

  const handleSecondModalOpen = () => {
    setModalOpen(false); // Close the first modal
    setSecondModalOpen(true); // Open the second modal
  };
  const [secondModalOpen, setSecondModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   const images = [
  //     "../images/productPic.png",
  //     "../images/productPic2.png",
  //     "../images/productPic3.png",
  //   ];
  const [onlineService, setOnlineServices] = useState([
    {
      key: 1,
      title: "Men's Ruby Masonic Ring",
      text: "Lorem Ipsum is simply dummy text of the printing  and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      contactText: "+012 345 6789",
      bottomTitle: "Product Specification",
      images: [
        "../images/productPic.png",
        "../images/productPic2.png",
        "../images/productPic3.png",
      ],
      sizeTitle: "Contact Details",
      sizes: ["16mm", "15mm", "14mm", "13mm"],
    },
  ]);

  return (
    <>
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
                Ad Details
              </h1>
            </Col>
          </Row>
          <br />

          <Row justify="center" className="whitebg">
            <Col xs={24} md={24} xl={24}>
              {onlineService.length > 0 &&
                onlineService.map((item, index) => {
                  return (
                    <Row
                      justify="space-between"
                      gutter={30}
                      className="info-area padding-y-40 greybg margin-y-40 border-radius-15"
                      key={index}
                    >
                      <Col xs={22} md={22} lg={11}>
                        <ImageGrid smallImages={item.images} />
                      </Col>
                      <Col xs={22} md={22} lg={12}>
                        <h3 className="product-tital">{item.title}</h3>
                        <p className="product-text">{item.text}</p>
                        <h5 className="product-bottomtitle">
                          {item.sizeTitle}
                        </h5>
                        <p>{item.contactText}</p>
                        <div>
                          <Button
                            type="primary"
                            shape="round"
                            size={"large"}
                            style={{ padding: "12px 40px", height: "auto" }}
                            className="mainButton primaryButton"
                            // onClick={() => navigate("/product-management/editProduct")}
                          >
                            Approve
                          </Button>
                          <Button
                            type="primary"
                            shape="round"
                            size={"large"}
                            style={{
                              padding: "12px 40px",
                              height: "auto",
                              marginLeft: "15px",
                            }}
                            className="mainButton secondaryButton"
                            onClick={handleDeleteButtonClick}
                          >
                            Disapprove
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  );
                })}
            </Col>
          </Row>
          <br />
          <br />
        </div>
      </Layout>

      <Modal
        open={modalOpen}
        // onOk={() => handleStatus()}
        onCancel={() => setModalOpen(false)}
        okText="Submit & Disapprove"
        onOk={handleSecondModalOpen}
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="Cancel"
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
          Are You Sure You Want To Disapprove This?
          <TextArea
            placeholder="Please Write A Reason Here"
            autoSize={{
              minRows: 5,
              maxRows: 5,
            }}
          />
        </Typography.Text>
      </Modal>

      <Modal
        open={secondModalOpen}
        // onOk={() => handleStatus()}
        onCancel={() => setSecondModalOpen(false)}
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
        <Typography.Text style={{ fontSize: 16 }}>
        Ad Has Been Disapproved Successfully!
        </Typography.Text>
      </Modal>
    </>
  );
}

export default AdvertiseBusiness;
