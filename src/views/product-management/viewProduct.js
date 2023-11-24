import React, { useEffect, useState } from "react";
import { Col, Row, message, Image, Button, Layout, Skeleton , Modal, Typography,} from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import ImageGrid from "../../components/imagegrid";
import { AiFillDelete } from "react-icons/ai";
import { PRODUCT } from "../../config/constants";
import { Get } from "../../config/api/get";



function AdvertiseBusiness() {
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams()
  const [onlineService, setOnlineServices] = useState([
    {
      key: 1,
      title: "Men's Ruby Masonic Ring",
      text: "Lorem Ipsum is simply dummy text of the printing  and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      bottomTitle: "Product Specification",
      images: [
        "../images/productPic.png",
        "../images/productPic2.png",
        "../images/productPic3.png",
      ],
      sizeTitle: "Select Size",
      sizes: ["16mm", "15mm", "14mm", "13mm"],
    },
  ]);

  useEffect(() => {
    getProduct();
  }, []);

  
  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };
  
  const getProduct = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(PRODUCT.getProductById + id, token);
      setLoading(false);
      console.log("response", response);
      if (response?.status) {
        setProduct(response?.data?.product);
       
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  
 
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
                procucts Details
              </h1>
            </Col>
          </Row>
          <br />

          <Row justify="center" className="whitebg" style={{padding:"20px"}}>
            <Col xs={24} md={24} xl={24}>
              {!loading && product &&
               <Row
               justify="space-between"
               gutter={30}
               className="info-area padding-y-40 greybg margin-y-40 border-radius-15"
              
             >
               <Col xs={22} md={22} lg={11}>
                {product?.gallery && 
                  <ImageGrid smallImages={product.gallery} />
                }
               </Col>
               <Col xs={22} md={22} lg={12}>
                 <Button
                   className="delete-icn"
                   icon={<AiFillDelete />}
                   onClick={handleDeleteButtonClick}
                 ></Button>

                 <h3 className="product-tital">{product.title}</h3>
                 <h5 className="product-bottomtitle">
                 Product Specification
                 </h5>
                 <p className="product-text">{product.description}</p>

                 <br/>

                 {product?.variations && product?.variations.length > 0 && product?.variations.map(vari => {
                   return(<>
                    <h5 className="product-bottomtitle">
                   {vari.title}
                 </h5>
                 {vari?.item && vari?.item.length > 0 && vari.item.map(subItem => {
                   return(<div className="size-box">{subItem}</div>)
                 })}
                   </>);
                 }) }
           
                 
                 
                 <div>
                   <Button
                     type="primary"
                     shape="round"
                     size={"large"}
                     style={{ padding: "12px 40px", height: "auto" }}
                     className="mainButton primaryButton"
                     onClick={() => navigate("/product-management/editProduct/" + id)}
                   >
                     Edit Product
                   </Button>
                 </div>
               </Col>
             </Row>
}
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
        Are You Sure You Want To Delete This Product?
        </Typography.Text>
      </Modal>
        
    </>
  );
}

export default AdvertiseBusiness;
