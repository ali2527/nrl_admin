import React, { useEffect, useState } from "react";
import { Col, Row, message, Image, Button, Layout, Skeleton , Modal, Typography,} from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import ImageGrid from "../../components/imagegrid";
import { AiFillDelete } from "react-icons/ai";
import { PRODUCT } from "../../config/constants";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import swal from "sweetalert";



function ProductDetails() {
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams()


  useEffect(() => {
    getProduct();
  }, []);

  
  const handleDeleteButtonClick = () => {
    setModalOpen(true);
  };
  
  const getProduct = async (pageNumber, pageSize, search, reset = false) => {
    // setLoading(true);
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

  const handleDelete = () => {
    Post(PRODUCT.deleteProduct + id, {}, token)
    .then((response) => {
      setLoading(false);
      if (response?.data?.status) {
        swal("Success", "Product deleted successfully", "success");
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
  }


  
 
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

            {loading &&
          <div >
            <Row  gutter={50}>
              <Col xs={24} md={12}>
              <Row gutter={20}>
        <Col span={6}>
        <Row gutter={[0, 25]} style={{maxHeight:"500px",overflow:"auto"}}>
          
            <Col span={24} style={{flexDirection:'column'}} >
              <Row>
                <Skeleton.Image style={{height:"150px",borderRadius:"20px"}} active className="skeleteonImage" />
              </Row>
              <br/>

              <Row>
                <Skeleton.Image style={{height:"150px",borderRadius:"20px"}} active className="skeleteonImage" />
              </Row>
              <br/>
              <Row>
                <Skeleton.Image style={{height:"150px",borderRadius:"20px"}}  active className="skeleteonImage" />
              </Row> 
            
            </Col>
          
        </Row>
      </Col>
      <Col span={18}>
      <Skeleton.Image style={{height:"490px",borderRadius:"20px"}} active className="skeleteonImage"/>
      </Col>
      
    </Row>
              </Col>

              <Col xs={24} md={12}>
              <Skeleton active /> <br />
              <Skeleton active /> <br />
              <Skeleton active /> <br />
              <Skeleton.Button active /> &nbsp;
              <Skeleton.Button active />
              </Col>
            </Row>
          </div>}






          
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
                 {/* <Button
                   className="delete-icn"
                   icon={<AiFillDelete />}
                   onClick={handleDeleteButtonClick}
                 ></Button> */}

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
           <br/>
           <br/>
                 
                 
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
                   &emsp;
                          <Button
                            type="button"
                            htmlType="button"
                            size={"large"}
                            style={{ padding: "8px 40px", height: "auto", background:"#b2001b", color:'white' }}
                          
                            onClick={() => handleDeleteButtonClick()}
                          >
                            Delete Product
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
        onOk={() => handleDelete()}
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

export default ProductDetails;
