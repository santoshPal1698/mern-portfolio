import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Select } from "antd";
import { UserOutlined,LockOutlined,MailOutlined,PhoneOutlined} from "@ant-design/icons";
import "./LoginForm.css";
import { hideLoading, showLoading } from "../../../redux/rootSlice";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../Api/Endpoints";
import { useDispatch } from "react-redux";
const { Title, Text } = Typography;
import { useNavigate } from "react-router-dom";
import ToastService from "../../../services/toastService";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../../firebase";

// Three modes rendered in the same left-hand panel: "login" | "signup" | "forgot"
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");

  const [loginForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [forgotForm] = Form.useForm();

  useEffect(() => {
    if (!localStorage.getItem("USER")) navigate("/login");
  }, []);

  const getAllPortFoliobyName = async (name) => {
    dispatch(showLoading());
    try {
      const { data } = await axios.get(
        `${PORTFOLIOPOINTS.ApiBaseUrl}get-portfolio/${name}`
      );
      // dispatch(SetPortfolioData(data?.data || []));
      // dispatch(ReloadData(false));
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

  // ---------- LOGIN ----------
  const onFinishLogin = async (values) => {
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
        if (userDetails.roles == "SUPER_ADMIN_SPTECH") {
          navigate("/admin-dashboard");
        } else {
          getAllPortFoliobyName(userDetails.firstName);
          navigate(`/admin-dashboard/${userDetails.firstName}`);
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

  // ---------- SIGNUP ----------
  const onFinishSignup = async (values) => {
    try {
      setLoading(true);
      dispatch(showLoading());
      // payload: password, firstName, lastName, email, gender, phone_Number, roles
      // confirmPassword is only for client-side validation, strip it before sending
      const { confirmPassword, ...signupPayload } = values;
      const response = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}register`, {
        ...signupPayload,
      });
      dispatch(hideLoading());
      setLoading(false);
      if (response.data.success) {
        ToastService.success(
          response.data.message || "Account created. Please log in."
        );
        signupForm.resetFields();
        setMode("login");
      } else {
        ToastService.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      dispatch(hideLoading());
      setLoading(false);
      ToastService.error(
        error?.response?.data?.message || error.message || "Signup failed"
      );
    }
  };

  // ---------- FORGOT PASSWORD ----------
  const onFinishForgot = async (values) => {
    try {
      setLoading(true);
      dispatch(showLoading());
      const response = await axios.post(
        `${PORTFOLIOPOINTS.ApiBaseUrl}forgot-password`,
        { ...values }
      );
      dispatch(hideLoading());
      setLoading(false);
      if (response.data.success) {
        ToastService.success(
          response.data.message || "Reset link sent to your email."
        );
        forgotForm.resetFields();
        setMode("login");
      } else {
        ToastService.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      dispatch(hideLoading());
      setLoading(false);
      ToastService.error(
        error?.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    navigate("/not-access");
  };

  const switchMode = (nextMode) => setMode(nextMode);

  return (
    <div className="auth-page">
      {/* ---------------- LEFT: FORM PANEL ---------------- */}
      <div className="auth-panel-form">
        <div className="auth-form-wrap">
          <div className="auth-brand">
            <span className="auth-brand-mark">S.P</span>
            <span className="auth-brand-name">Portfolio Points</span>
          </div>

          {mode !== "forgot" && (
            <div className="auth-toggle" role="tablist">
              <button
                type="button"
                className={`auth-toggle-btn ${mode === "login" ? "is-active" : ""}`}
                onClick={() => switchMode("login")}
              >
                Log In
              </button>
              <button
                type="button"
                className={`auth-toggle-btn ${mode === "signup" ? "is-active" : ""}`}
                onClick={() => switchMode("signup")}
              >
                Sign Up
              </button>
              <span
                className="auth-toggle-slider"
                style={{
                  transform: mode === "signup" ? "translateX(100%)" : "translateX(0%)",
                }}
              />
            </div>
          )}

          <Title level={2} className="auth-title">
            {mode === "login" && "Welcome back"}
            {mode === "signup" && "Create your account"}
            {mode === "forgot" && "Reset your password"}
          </Title>
          <Text className="auth-subtitle">
            {mode === "login" && "Log in to manage your portfolio."}
            {mode === "signup" && "A few details and you're in."}
            {mode === "forgot" && "We'll email you a link to get back in."}
          </Text>

          {/* ---------------- LOGIN FORM ---------------- */}
          {mode === "login" && (
            <>
              <Form
                form={loginForm}
                name="login"
                onFinish={onFinishLogin}
                layout="vertical"
                className="auth-form"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email." },
                    { type: "email", message: "Please enter a valid email." },
                  ]}
                >
                  <Input
                    className="auth-input"
                    prefix={<UserOutlined />}
                    placeholder="you@example.com"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password." },
                  ]}
                >
                  <Input.Password
                    className="auth-input"
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>

                <div className="auth-links-row">
                  <Text className="auth-link" onClick={() => switchMode("forgot")}>
                    Forgot password?
                  </Text>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    className="auth-submit-btn"
                    htmlType="submit"
                    block
                    loading={loading}
                    disabled={loading}
                  >
                    Log In
                  </Button>
                </Form.Item>
              </Form>

              <div className="auth-switch-text">
                <Text>Don&apos;t have an account?</Text>{" "}
                <Text className="auth-link" onClick={() => switchMode("signup")}>
                  Sign up
                </Text>
              </div>
            </>
          )}

          {/* ---------------- SIGNUP FORM ---------------- */}
          {mode === "signup" && (
            <>
              <Form
                form={signupForm}
                name="signup"
                onFinish={onFinishSignup}
                layout="vertical"
                className="auth-form auth-form-scroll"
              >
                <div className="auth-form-grid">
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: "Required." }]}
                  >
                    <Input className="auth-input" placeholder="First Name" />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: "Required." }]}
                  >
                    <Input className="auth-input" placeholder="Last Name" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email." },
                    { type: "email", message: "Please enter a valid email." },
                  ]}
                >
                  <Input
                    className="auth-input"
                    prefix={<MailOutlined />}
                    placeholder="you@example.com"
                  />
                </Form.Item>

                <div className="auth-form-grid">
                  <Form.Item
                    name="phone_Number"
                    label="Phone Number"
                    rules={[
                      { required: true, message: "Required." },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit number.",
                      },
                    ]}
                  >
                    <Input
                      className="auth-input"
                      prefix={<PhoneOutlined />}
                      placeholder="Phone Number"
                    />
                  </Form.Item>

                  <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: "Required." }]}
                  >
                    <Select
                      className="auth-select"
                      placeholder="Select"
                      options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                        { value: "Other", label: "Other" },
                      ]}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="roles"
                  label="Role"
                  rules={[{ required: true, message: "Please select a role." }]}
                >
                  <Select
                    className="auth-select"
                    placeholder="Select Role"
                    options={[
                      { value: "USER", label: "User" },
                      { value: "SUPER_ADMIN_SPTECH", label: "Super Admin" },
                    ]}
                  />
                </Form.Item>

                <div className="auth-form-grid">
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please enter a password." },
                      { min: 6, message: "At least 6 characters." },
                    ]}
                  >
                    <Input.Password
                      className="auth-input"
                      prefix={<LockOutlined />}
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Please confirm your password." },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match.")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      className="auth-input"
                      prefix={<LockOutlined />}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    className="auth-submit-btn"
                    htmlType="submit"
                    block
                    loading={loading}
                    disabled={loading}
                  >
                    Create Account
                  </Button>
                </Form.Item>
              </Form>

              <div className="auth-switch-text">
                <Text>Already have an account?</Text>{" "}
                <Text className="auth-link" onClick={() => switchMode("login")}>
                  Log in
                </Text>
              </div>
            </>
          )}

          {/* ---------------- FORGOT PASSWORD FORM ---------------- */}
          {mode === "forgot" && (
            <>
              <Form
                form={forgotForm}
                name="forgot"
                onFinish={onFinishForgot}
                layout="vertical"
                className="auth-form"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email." },
                    { type: "email", message: "Please enter a valid email." },
                  ]}
                >
                  <Input
                    className="auth-input"
                    prefix={<MailOutlined />}
                    placeholder="you@example.com"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    className="auth-submit-btn"
                    htmlType="submit"
                    block
                    loading={loading}
                    disabled={loading}
                  >
                    Send Reset Link
                  </Button>
                </Form.Item>
              </Form>

              <div className="auth-switch-text">
                <Text className="auth-link" onClick={() => switchMode("login")}>
                  ← Back to log in
                </Text>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ---------------- WAVE DIVIDER ---------------- */}
      <svg
        className="auth-wave-divider"
        viewBox="0 0 200 800"
        preserveAspectRatio="none"
      >
        <path
          className="auth-wave-path auth-wave-path-back"
          d="M200,0 C120,90 160,180 110,270 C60,360 140,450 90,540 C40,630 130,720 90,800 L200,800 L200,0 Z"
        />
        <path
          className="auth-wave-path auth-wave-path-front"
          d="M200,0 C140,80 190,170 130,260 C70,350 160,440 110,540 C60,640 150,730 120,800 L200,800 L200,0 Z"
        />
      </svg>

      {/* ---------------- RIGHT: BANNER PANEL ---------------- */}
      <div className="auth-panel-banner">
        <div className="auth-banner-grid" />
        <svg className="auth-banner-constellation" viewBox="0 0 600 600" fill="none">
          <line x1="120" y1="140" x2="300" y2="220" className="auth-constellation-line" />
          <line x1="300" y1="220" x2="470" y2="150" className="auth-constellation-line" />
          <line x1="300" y1="220" x2="260" y2="380" className="auth-constellation-line" />
          <line x1="260" y1="380" x2="430" y2="430" className="auth-constellation-line" />
          <line x1="260" y1="380" x2="130" y2="440" className="auth-constellation-line" />
          <line x1="470" y1="150" x2="430" y2="430" className="auth-constellation-line" />
          <circle cx="120" cy="140" r="7" className="auth-constellation-dot" />
          <circle cx="300" cy="220" r="10" className="auth-constellation-dot auth-dot-accent" />
          <circle cx="470" cy="150" r="6" className="auth-constellation-dot" />
          <circle cx="260" cy="380" r="8" className="auth-constellation-dot" />
          <circle cx="430" cy="430" r="6" className="auth-constellation-dot" />
          <circle cx="130" cy="440" r="5" className="auth-constellation-dot" />
        </svg>

        <div className="auth-banner-content">
          <span className="auth-banner-eyebrow">Super Admin Portal</span>
          <h2 className="auth-banner-title">
            Every point,
            <br />
            perfectly tracked.
          </h2>
          <p className="auth-banner-copy">
            One dashboard to manage portfolios, review performance, and keep
            every point accounted for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;