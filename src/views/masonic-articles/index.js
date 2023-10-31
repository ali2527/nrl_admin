import { useState } from "react";
import { Col, Row, Layout, Avatar,  Image, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UPLOADS_URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostBox from "../../components/PostBox";
import SocialBox from "../../components/SocialBox";

function MasonicArticles() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [editMode,setEditMode] = useState(false)
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "bellaedward@gmail.com",
  });

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
            Masonic Articles
            </h1>
          </Col>
        </Row>
        <br />
        <>
        <Row style={{justifyContent:"center"}}>
            <Col xs={24} md={19}>
                <PostBox></PostBox>
                <SocialBox></SocialBox>
                <SocialBox></SocialBox>
            </Col>
        </Row>
        </>
      </div>
    </Layout>
  );
}
export default MasonicArticles;
