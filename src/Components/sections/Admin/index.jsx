import React, { useEffect, useState } from "react";
import AdminIntro from "./AdminIntro";
import AdminExperince from "./AdminExperince";
import AdminSkills from "./AdminSkills";
import AdminProjects from "./AdminProjects";
import AdminEducation from "./AdminEducation";
import { useDispatch, useSelector } from "react-redux";
import { message, Tabs } from "antd";
import Spin_loader from "../../Spin-loader";
const { TabPane } = Tabs;
import { Layout, Button } from "antd";
const { Header } = Layout;
import { LockOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUserData, hasSuperAdminRole } from "../../../services/AuthService";
import AdminDashBoard from "./AdminDashBoard";
import "../../../../src/App.css";
import ToastService from "../../../services/toastService";

const Admin = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);
  
  const default_pic ="data:image/png;base64,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";
  const [tabPosition, setTabPosition] = useState("left");
  const navigate = useNavigate();

  const updateTabPosition = () => {
    if (window.innerWidth <= 768) {
      setTabPosition("top");
    } else {
      setTabPosition("left");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("USER")) navigate("/login");
    updateTabPosition();
    const role = getUserData();
    setUserRole(role?.userData?.data);
    window.addEventListener("resize", updateTabPosition);
    return () => window.removeEventListener("resize", updateTabPosition);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("USER");
    localStorage.clear();
    ToastService.error("Logout was Successful??");
    navigate("/");
  };

  return (
    <>
      <Layout>
        <Header className="header">
          <div className="title_gradient_text"> SP_ADMIN </div>
          <div className="welcome_box">
            <img
              src={
                portfolioData?.intro.profile_url
                  ? portfolioData?.intro.profile_url
                  : default_pic
              }
              alt="User Profile"
              className="profile_img"
            />
            <h2 className="welcome_text">
              Hi: {`${userRole?.firstName} ${userRole?.lastName}`}
            </h2>
          </div>
          <div className="logout">
            <Button
              type="primary"
              danger
              icon={<PoweroffOutlined />}
              onClick={handleLogout}
            ></Button>
          </div>
        </Header>
      </Layout>
      {loading ? <Spin_loader /> : null}

      <div style={{ float: "right" }}>
        {!hasSuperAdminRole() && (
          <Button type="default" icon={<LockOutlined />}>
            <span className="text-danger font-weight-bold">
              {" "}
              Super Admin Access Required For Action ?{" "}
            </span>
          </Button>
        )}
      </div>

      {portfolioData && (
        <div className="container-fluid py-5">
          <Tabs
            defaultActiveKey="1"
            tabPosition={tabPosition}
            size="large"
            animated
          >
            <TabPane tab="DashBoard" key="1">
              <AdminDashBoard />
            </TabPane>

            <TabPane tab="User Profile " key="2">
              <AdminIntro />
            </TabPane>

            <TabPane tab="Projects" key="3">
              <AdminProjects />
            </TabPane>

            <TabPane tab="Experiences" key="4">
              <AdminExperince />
            </TabPane>

            <TabPane tab="All Skills" key="5">
              <AdminSkills />
            </TabPane>

            <TabPane tab="Education" key="6">
              <AdminEducation />
            </TabPane>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Admin;
