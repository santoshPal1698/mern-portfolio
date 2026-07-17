import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../Api/Endpoints";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";
import TextArea from "antd/es/input/TextArea";
import { hasSuperAdminRole } from "../../../services/AuthService";
import ToastService from "../../../services/toastService";

const AdminIntro = () => {

  const { loading, portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  console.log("portfolio",portfolioData);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const role = hasSuperAdminRole() ? "SUPER_ADMIN_SPTECH" : "GUEST";
    setUserRole(role);
  }, []);

 const  onFinish = async (values) =>{
    try {
      dispatch(showLoading());
       const response = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}update-intro`,{
        ...values,
        _id:portfolioData.intro._id
       });
      dispatch(hideLoading());
      dispatch(ReloadData(true));
      if(response.data.success){
       ToastService.success(response.data.message);
      }
      else{
       ToastService.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
       ToastService.error(response.data.message);
    }
  }

  return (
    <>
      <div>
        <Form onFinish={onFinish} layout="vertical" initialValues={portfolioData.intro} >
        {/* <Form onFinish={onFinish} layout="vertical" > */}

          <Form.Item name="name" label="Username">
            <input placeholder="UserName" />
          </Form.Item>
          <Form.Item name="profile_url" label="User profile">
            <input placeholder="User profile" />
          </Form.Item>

          <Form.Item name="resume" label="Resume">
            <input placeholder="Resume" />
          </Form.Item>

          <Form.Item name="description" label="Description">
                <TextArea
                  placeholder="Enter your text here..."
                  autoSize={{ minRows: 5, maxRows: 15 }} 
                  style={{
                    width: "100%",
                    height: "100%",
                    resize: "none", 
                  }}
                />
              </Form.Item>

          <Form.Item name="github" label="Github Profile">
            <input placeholder="Github Profile" disabled readOnly />
          </Form.Item>

          <Form.Item name="linkedin" label="Linkdin Profile">
            <input placeholder="Linkdin Profile" disabled readOnly  />
          </Form.Item>

          <Form.Item name="roles" label="Roles">
            <input placeholder="Roles" disabled readOnly  />
          </Form.Item>

          <Form.Item >
          <Button type="primary" 
          disabled={!hasSuperAdminRole()}
          htmlType="submit">
          update
        </Button>
        </Form.Item>
        </Form>
      </div>

    </>
  );
};

export default AdminIntro;
