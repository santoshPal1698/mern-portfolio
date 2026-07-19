import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined, LoginOutlined } from "@ant-design/icons";
import "./LoginForm.css";
import { hideLoading, showLoading } from "../../../redux/rootSlice";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../Api/Endpoints";
import { useDispatch } from "react-redux";
const { Title } = Typography;
import { useNavigate } from "react-router-dom";
import HeroBgAnimation from "../../HeroBgAnimation";
import StyledStarsCanvas from "../../canvas/Stars";
import { useState } from "react";
import ToastService from "../../../services/toastService";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getAllPortFoliobyName = async (name) => {
    dispatch(showLoading());
    try {
      const { data } = await axios.get(`${PORTFOLIOPOINTS.ApiBaseUrl}get-portfolio/${name}`);
      dispatch(SetPortfolioData(data?.data || []));
      dispatch(ReloadData(false));
      ToastService.success(data.message);
    } catch (error) {
      const status = error?.response?.status;
      if (status == 429 || status == 404) {
        navigate("/429");
        ToastService.error(
          error?.response?.data?.message || "Something went wrong"
        );
      }
    } finally {
      dispatch(hideLoading());
    }
  };


  const onFinish = async (values) => {
    try {
      setLoading(true);
      dispatch(showLoading());
      const response = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}login`, {
        ...values,
      });
      dispatch(hideLoading());
      setLoading(false);
      if (response.data.success) {
        localStorage.setItem("USER", JSON.stringify(response.data));
        const userDetails = response?.data.userData.data;
        console.log("user data", userDetails)
        if (userDetails.roles == "SUPER_ADMIN_SPTECH") {
          // alert("by defualt super admin")
          navigate("/admin-dashboard");
        }
        else {
          // alert("getby username")
          // getAllPortFoliobyName(userDetails.firstName)
          // navigate(`/admin-dashboard/${userDetails.firstName}`);
        }
        ToastService.success(response.data.message);
      } else {
        ToastService.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      setLoading(false);
      ToastService.error(error.message || "Invalid User Name & Password ?");
    }

  };

  const handleGoogleLogin =async () => {
    const result = await signInWithPopup(auth,googleProvider);
    // console.log("goolge login",result)
    navigate("/not-access");
    // const token =await result.user.getIdToken();
    // localStorage.setItem("USER", JSON.stringify(result.user));    // await login(token)
 };



  return (
    <>
      <div className="login-container">
        <StyledStarsCanvas />
        {/* <HeroBgAnimation /> */}
        <Card className="login-card">
          <Title level={2} className="title_gradient_text">
            Super Admin Login
          </Title>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="btn_login"
                htmlType="submit"
                block
                loading={loading}
                disabled={loading}
                icon={<LoginOutlined />}
              >
                Log In
              </Button>
        
             <Button
                className="btn_login mt-4"
                block
                color="default" variant="outlined"
                onClick={handleGoogleLogin}
                icon={<GoogleOutlined />}
              >
                Login with Google
                </Button> 
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
