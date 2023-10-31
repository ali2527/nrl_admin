import { useState } from "react";
import { Col, Row, Layout, Image, Table, Skeleton } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderSummary from "../../components/orderSummary";
// import image1 from "../../../public/images/product.png";

function LiveStreaming({ subTotal = 0, tax = 0 }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user.userToken);
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState([
    {
      _id: 1,
      image:"/images/product.png",
      product: "Abc Product",
      quantity: 10,
      unitPrice: "180",
      size:"Small",
      color:"Silver",
      totalPrice:100

    },
    {
        _id: 2,
        image:"/images/product.png",
        product: "Abc Product",
        quantity: 10,
        unitPrice: "180",
        size:"Small",
        color:"Silver",
        totalPrice:100
  
      },
  ]);


  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (item) => <Image preview={false} src={item} width={"48px"} height={"48px"} style={{objectFit:"contain"}} />,
    },
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "UNIT PRICE",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (item) => <span>${item}</span>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (item) => (
        <>
          {item == "PENDING" ? (
            <span style={{ color: "#ED8D37" }}>{item}</span>
          ) : item == "INPROCESS" ? (
            <span style={{ color: "#28BCBC" }}>{item}</span>
          ) : item == "DELIEVRED" ? (
            <span style={{ color: "#00D640" }}>{item}</span>
          ) : item == "DISPATCHED" ? (
            <span style={{ color: "#892BF5" }}>{item}</span>
          ) : (
            <span>{item}</span>
          )}
        </>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
        title: "Total",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (item) => <span>${item}</span>,
      },
  ];

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
              Users Details
            </h1>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
          </Col>
        </Row>
        <br />
        <>
        <Row gutter={30}>
              <Col xs={24} style={{ textAlign: "right" }}>
                <h6>Order Status</h6>
                <span className="orderstatus">Dispatched</span>
              </Col>
              <Col xs={24} md={15} lg={17} className="order-detail-box">
                <h3>Order Information</h3>
                <h4>Order ID: #14547</h4>
                <h5>Order Date: 24 July 2023</h5>

                <h3>Account Information</h3>
                <h5>Customer Name: Harry Brooks</h5>
                <h5>Email Address: Info@Example.com</h5>

                <h3>Billing Address</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the when an unknown printer
                  took a galley of type and scrambled it to make a type specimen
                  book.
                </p>

                <h3>Payment & Shipping</h3>
                <h5>Payment Method: Card</h5>
                <h5>Shipping Address: 356 Arsenal St Watertown</h5>
              </Col>
              <Col xs={24} md={9} lg={7}>
                <OrderSummary subTotal={100} tax={10} />
              </Col>
            </Row>
            <div className="boxDetails">
              <Row style={{ padding: 20, overflow: "auto" }}>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Skeleton active />
                    <br />
                  </div>
                ) : (
                  <Table
                    className="styledTable2"
                    dataSource={orders}
                    columns={columns}
                    pagination={false}
                  />
                )}
              </Row>
            </div>
        </>
      </div>
    </Layout>
  );
}
export default LiveStreaming;
