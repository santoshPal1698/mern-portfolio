import React, { useEffect, useState } from "react";
import AdvancedHighChart from "./AdvancedHighChart";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Card, Row, Col } from "antd";

const AdminDashBoard = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const [eduCategories, setEduCategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [expCategories, setExperince] = useState([]);
  const [dofJoin, setDateOfJoin] = useState([]);
  const project = portfolioData.projects;

  useEffect(() => {
    const data = portfolioData;
    const educationLevels = data.education.map(
      (edu) => edu.degree || edu.school
    );
    const grades = data.education.map((edu) => parseFloat(edu.grade));
    setEduCategories(educationLevels);
    setSeries([{ name: "Grade Percentage", data: grades }]);
    const experience = data.experience.map((item) => item.company);
    setExperince(experience);
    const formatData = data.experience.map((exp) => ({
      name: exp.role,
      y: calculateMonths(exp.date),
      company: exp.company,
    }));
    setDateOfJoin(formatData);
  }, []);

  const calculateMonths = (dateRange) => {
    if (!dateRange) return 6;
    const [start, end] = dateRange.split(" - ");
    const startDate = dayjs(start, "MMM YYYY");
    const endDate = end ? dayjs(end, "MMM YYYY") : dayjs();
    return endDate.diff(startDate, "month") || 6;
  };

  const Expoptions = {
    chart: { type: "bar" },
    title: { text: "Work Experience Duration" },
    xAxis: { type: "category", title: { text: "Job Roles" } },
    yAxis: { title: { text: "Months Worked" } },
    series: [{ name: "Experience", data: portfolioData.experience }],
    tooltip: {
      formatter: function () {
        return `<b>${this.point.name}</b><br>Company: ${this.point.company}<br>Duration: ${this.y} months`;
      },
    },
  };

  
  const intrOptions = [
    {
      data: portfolioData.intro.roles.map((role) => ({
        name: role,
        y: 100 / portfolioData.intro.roles.length, // Distribute roles equally
        link: portfolioData.intro.linkedin, // Open LinkedIn on click
      })),
    },
  ];

  return (
    <div>
      <h5 className="text-primary font-weight-bold py-2">
        Crm Super Admin DashBoard
      </h5>
      <div className="container-fluid">
        <Row
          gutter={[16, 16]}
          style={{
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Black Card */}
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              bordered={false}
              style={{
                background: "#000000",
                color: "#ffffff",
                textAlign: "center",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2>Projects</h2>
              <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
                {portfolioData.projects?.length || 0}
              </h1>
            </Card>
          </Col>

          {/* Blue Card */}
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              bordered={false}
              style={{
                background: "#007bff",
                color: "#ffffff",
                textAlign: "center",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2>Experiences</h2>
              <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
                {portfolioData.experience?.length || 0}.5+ Years
              </h1>
            </Card>
          </Col>

          {/* Green Card */}
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              bordered={false}
              style={{
                background: "green",
                color: "#ffffff",
                textAlign: "center",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2>Skills</h2>
              <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
                {portfolioData.skills?.[0]?.skills.length || 0}
              </h1>
            </Card>
          </Col>

          {/* Orange Card */}
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              bordered={false}
              style={{
                background: "orange",
                color: "#ffffff",
                textAlign: "center",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2>Education</h2>
              <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
                {portfolioData.education?.length || 0}
              </h1>
            </Card>
          </Col>
        </Row>

        <div className="row">
          <div className="col-md-4 col-lg-4">
            <div className="card">
              <AdvancedHighChart
                title="Bio Profile"
                chartType="pie"
                series={intrOptions}
              />
            </div>
          </div>

          <div className="col-md-4 col-lg-4">
            <div className="card">
              <AdvancedHighChart
                chartType="spline"
                title="Education Performance Over Time"
                categories={eduCategories}
                series={series}
              />
            </div>
          </div>

          <div className="col-md-4 col-lg-4">
            <div className="card">
              <AdvancedHighChart
                chartType="bar"
                options={Expoptions}
                title="Experinces Performance Over Time"
                categories={expCategories}
              />
            </div>
          </div>
        </div>
       <div className="row py-4">
          <div className="col-md-4 col-lg-4">
            <div className="card">
              <AdvancedHighChart
                chartType="column"
                title="Skills Performance Over Time"
                categories={eduCategories}
                series={series}
              />
            </div>
          </div>

          <div className="col-md-4 col-lg-4">
            <div className="card">
                 <AdvancedHighChart
                chartType="area"
                title="Projects Performance Over Time"
                categories={eduCategories}
                series={series}
              />
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default AdminDashBoard;
