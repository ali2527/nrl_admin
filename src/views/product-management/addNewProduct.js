import React, { useState } from "react";
import {
  Col,
  Row, Form,
  Input,
  InputNumber,
  Select,
  Button, Layout,DatePicker,Tag
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { AiFillDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { CONTENT_TYPE,PRODUCT } from "../../config/constants";
import { Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import swal from "sweetalert";
const { TextArea } = Input;

function ProductAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [variations, setVariations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = useState('');

  // const [fileList, setFileList] = useState([])

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      price: values.price,
      stock: values.stock,
      title: values.title,
      description: values.description,
    };

       
    const formObject = new FormData();

    for (const key in data) {
      const item = values[key];
      formObject.append(key, item);
    }


    formObject.append("variations", JSON.stringify(variations));

    values.gallery.fileList.map((item) => {
      formObject.append("gallery",item.originFileObj);
    })
    


    Post(PRODUCT.addProduct, formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        console.log(response)
        if (response?.data?.status) {
          swal("Success","Product added successfully","success");
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


  const addVariations = () => {

    let _variations = [...variations]
    _variations.push({
      title:"",
  displayType:"RADIO",
  item:[],
  inputVisible:false
    })

    setVariations(_variations)
  }

  const handleTitle = (index,value) => {
    let _variations = [...variations]
    _variations[index].title = value;
    setVariations(_variations)
  };

  
  const handleDisplay = (index,value) => {
    let _variations = [...variations]
    _variations[index].displayType = value;
    setVariations(_variations)
  };

  console.log(">>>",variations);



  const handleClose = (subIndex,removedTag) => {
    let _variations = [...variations]
    let currentItem = _variations[subIndex] 
    currentItem.item = currentItem.item.filter((tag) => tag !== removedTag);

   setVariations(_variations);
  };


  
  const handleDeleteVariation = (subIndex) => {
    let _variations = [...variations]
    _variations = _variations.filter((item,indx) => indx !== subIndex);

   setVariations(_variations);
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (index) => {
    let _variations = [...variations]
    let currentItem = _variations[index] 
    if (inputValue && !currentItem.item.includes(inputValue)) {
      currentItem.item.push(inputValue);
    }
    currentItem.inputVisible = false;
    setInputValue('');
    setVariations(_variations);
  };

  const showInput = (index) => {
    let _variations = [...variations]
    _variations[index].inputVisible = true;
    setVariations(_variations)
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
              Add New Product
            </h1>
          </Col>
        </Row>
        <br />
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={11}>
                <Form
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                >

<Form.Item label="Product Images" name="gallery">
                    <Upload
                      multiple
                      listType="picture-card"
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                    </Upload>
                  </Form.Item>

                  
                  <Form.Item
                    label="Product Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product Title!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Product Title"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>


                 

                  <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Product Description!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Enter Product Description"
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please Input Product Price!",
                      },
                    ]}
                  >
                    <InputNumber
                      size="small"
                      placeholder="Enter Product Price"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        width: "100%",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Number in stock"
                    name="stock"
                    rules={[
                      {
                        required: true,
                        message: "Please enter stock!",
                      },
                    ]}
                  >
                     <InputNumber
                      size="small"
                      placeholder="Enter Product Stock"
                      style={{
                        borderRadius: "5px",
                        background: "white",
                        fontSize: "14px",
                        width: "100%",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>
                  {variations.length > 0 &&
                    variations.map((subItem, subIndex) => {
                      return (
                        <>
                        <hr/> 
                        <Row justify="space-between" style={{display:'flex',margin:"20px 0px",alignItems:'center'}}>
                          <Col>
                          <h5 className="pageTitle" style={{ margin:"0px",fontSize:"14px" }}>
              Variation {subIndex+1}
            </h5>
                          </Col>
                          <Col>
                          <AiFillDelete style={{cursor:'pointer',fontSize:"18px",color:"#d5af68"}} onClick={() => handleDeleteVariation(subIndex)}/>
                         
                          </Col>
                        </Row>
                         
                          <Input
                            size="large"
                            placeholder="Enter Title"
                            value={subItem.title}
                            onChange={(e) => handleTitle(subIndex,e.target.value)}
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "10px 20px",
                              marginBottom:"20px"
                            }}
                          />
                          <br />
                          <Select
                            className="FormSelect"
                            size="large"
                            value={subItem.displayType}
                            onChange={(e) => handleDisplay(subIndex,e)}
                            style={{width:"100%", marginBottom:"20px"}}
                            placeholder="Select Display Type"
                          >
                            <Select.Option value="RADIO">Radio</Select.Option>
                            <Select.Option value="DROPDOWN">
                              Dropdown
                            </Select.Option>
                            <Select.Option value="MULTISELECT">
                              MultiSelect
                            </Select.Option>
                          </Select>
                         
                         

      {subItem.item.map((tag, index) => {
        
          return (
            <Tag key={tag} closable onClose={() => handleClose(subIndex,tag)} style={{ height:40,padding:'10px',marginBottom:"20px" ,background:"#f2f2f2",borderStyle: 'dashed',}}  onClick={() => showInput(subIndex)} >
            {tag}
          </Tag>
          );
      })}
    
    {subItem.inputVisible ? (
        <Input
          type="text"
          size="large"
          placeholder="Add Item"
          style={{width:"100px",marginBottom:"20px"}}
          value={inputValue}
          onChange={handleInputChange}
          // onBlur={handleInputConfirm}
          onPressEnter={() => handleInputConfirm(subIndex)}
        />
      ) : (
        <Tag style={{ height:40,padding:'10px' ,background:"#f2f2f2",borderStyle: 'dashed',marginBottom:"20px"}} icon={<PlusOutlined />} onClick={() => showInput(subIndex)} >
          Add Item
        </Tag>
      )}
                        </>
                      );
                    })}

                  <Row justify="">
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
                      onClick={() => addVariations()}
                    >
                      + Add Variation
                    </Button>
                  </Row>

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
                        Add Product
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
export default ProductAdd;
