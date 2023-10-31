import { useEffect, useState } from "react";
import { Col, Row, Layout, Avatar,  Image, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { POST, UPLOADS_URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostBox from "../../components/PostBox";
import SocialBox from "../../components/SocialBox";
import SocialBoxLoading from "../../components/SocialBox/loading";
import { Get } from "../../config/api/get";

function NonmasonicCommunity() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [editMode,setEditMode] = useState(false)
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [hasMore,setHasMore] = useState(true)

useEffect(() => {
  getAllPosts()
}, [])


  const getAllPosts = async (pageNumber) => {
    setLoading(true);
    const response = await Get(`${POST.getAllNonMemberPosts}`, token,{
      page: pageNumber ? pageNumber.toString() :  "1",
      limit: "2",
    });

    if (response?.status) {
      console.log(">>>>>",response?.data?.posts)

   
      if(pageNumber && pageNumber > 1){
        setPosts([...posts,...response?.data?.posts]);
       
      }else{
        setPosts(response.data.posts);
      }

      if(response?.data?.totalCount == posts.length || response?.data?.posts.length == 0 ) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      
    } else {
      console.log("error====>", response);
    }
    setLoading(false);
  };

  const handleScroll = (event) => {
    console.log(event)
    const target = event.target;
    const isScrolledToBottom = target.scrollHeight - target.scrollTop == target.clientHeight;

    if (isScrolledToBottom) {
      if(hasMore && !loading){
        getAllPosts(page+1);

      //   const scrollOffset = 50; // Adjust this value to control how much you want to scroll up
      // target.scrollTo({
      //   top: target.scrollTop - scrollOffset,
      //   behavior: 'smooth', // Use 'auto' for instant scrolling
      // });


        setPage(page+1);
      }
    }
  };


  return (
    <Layout className="configuration"  >
      <div className="boxDetails" onScroll={(e)=>handleScroll(e)}
    style={{ minHeight: "80vh", overflowY: "auto" }} >
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle" style={{ margin: 0 }}>
            Non Member Community / Articles
            </h1>
          </Col>
        </Row>
        <br />
        <>
        <Row style={{justifyContent:"center"}} >
            <Col xs={24} md={19}>
                <PostBox isMasonic={false} getAllPosts={getAllPosts}/>
                {loading && < SocialBoxLoading/>}
                {posts.length > 0 && posts.map(item => { return(
                   <SocialBox post={item}/>
                )})}

{!loading && posts.length == 0 && <div className="social-post-box" style={{minHeight:"50vh",display:'flex',justifyContent:'center',alignItems:"center"}}>
<h1 className="pageTitle" style={{ margin: 0 }}>
            No Posts Found
            </h1>
  </div>}
               
            </Col>
        </Row>
        </>
      </div>

    </Layout>
  );
}
export default NonmasonicCommunity;
