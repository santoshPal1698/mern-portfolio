import { useEffect, useState } from "react";
import { Button, Steps, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../Admin/Admin_Form/ProjectForm";
import AdminEducationForm from "../Admin/Admin_Form/EducationForm";
import AdminIntro from "../Admin/AdminIntro";
import Spin_loader from "../../Spin-loader";
import { useSelector } from "react-redux";
import ExperienceForm from "../Admin/Admin_Form/ExperienceForm";
import AdminAllSkillsForm from "../Admin/Admin_Form/AllSkillsForm";
import { getUserData, hasSuperAdminRole } from "../../../services/AuthService";
import { LockOutlined } from "@mui/icons-material";
import AdminNavbar from "../Admin/AdminNavbar";
const { TabPane } = Tabs;

export default function userDashboard() {
  const navigate = useNavigate();
  const { loading, portfolioData } = useSelector((state) => state.root);
  const [current, setCurrent] = useState(0);
  const [tabPosition, setTabPosition] = useState("left");
  const [userRole, setUserRole] = useState(null);

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

  return (
    <>
      <AdminNavbar />

      {loading ? <Spin_loader /> : null}

      <div style={{ float: "right" }}>
        {!hasSuperAdminRole() && (
          <Button type="default" icon={<LockOutlined />}>
            <span className="text-danger font-weight-bold">
              {" "}
              New User Profile DashBoards?{" "}
            </span>
          </Button>
        )}
      </div>

      <div className="container-fluid py-5">
        <Tabs
          defaultActiveKey="1"
          tabPosition={tabPosition}
          size="large"
          animated
        >
          <TabPane tab="Bio Profile" key="1">
            <AdminIntro />
          </TabPane>

          <TabPane tab="Add Project " key="2">
            <ProjectForm />
          </TabPane>


          <TabPane tab="Experiences" key="3">
            <ExperienceForm />
          </TabPane>

          <TabPane tab="All Skills" key="4">
            <AdminAllSkillsForm />
          </TabPane>

          <TabPane tab="Education" key="5">
            <AdminEducationForm />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
