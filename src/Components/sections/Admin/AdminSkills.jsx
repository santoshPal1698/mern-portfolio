import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Image, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../Api/Endpoints";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";
import { Modal } from "antd";
const { confirm } = Modal;
const { Title } = Typography;
import { Card, Row, Col, message } from "antd";
import { EditOutlined,DeleteOutlined, PlusOutlined,MinusCircleOutlined,LockOutlined} from "@ant-design/icons";
import useConfirmationModal from "./useConfirmationModal";
import { hasSuperAdminRole } from "../../../services/AuthService";
import ToastService from "../../../services/toastService";
import { useNavigate } from "react-router-dom";

const AdminSkills = () => {
  const { showConfirm } = useConfirmationModal();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();


  const showDeleteConfirm = (item) => {
    showConfirm({
      title: `Are you sure you want to delete this Skills Name ${item?.title}? with id ${item?._id}`,
      content: `This action will permanently delete the Skills:`,
      onConfirm: () => deleteSkills(item?._id),
    });
  };

  useEffect(() => {
    const role = hasSuperAdminRole() ? "SUPER_ADMIN_SPTECH" : "GUEST";
    setUserRole(role);
  }, []);

  const deleteSkills = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${PORTFOLIOPOINTS.ApiBaseUrl}delete-skills`,
        {
          _id: id,
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(ReloadData(true));
        ToastService.success(response.data.message);
      } else {
        ToastService.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      ToastService.error(error.message);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        disabled={!hasSuperAdminRole()}
        onClick={() => navigate("/admin/all-skills-form")}
        style={{ borderRadius: 5 }}
      >
        Skills
      </Button>

      <div className="portfolio-container">
        {portfolioData?.skills.map((category, index) => (
          <Card
            key={index}
            title={category?.title}
            hoverable
            className="project-card"
          >
            {userRole === "SUPER_ADMIN_SPTECH" ? (
              <Row className="skills_box" justify="end" gutter={8}>
                <Col>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() =>
                      navigate(`/admin/all-skills-form/${category?._id}`, {
                        state: { project: category },
                      })
                    }
                  >
                    Edit
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => showDeleteConfirm(category)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ) : ('')
            }
            <br />
            <Row gutter={[16, 16]}>
              {category.skills?.map((skill, skillIndex) => (
                <Col xs={24} sm={12} md={8} lg={6} key={skillIndex}>
                  <Card
                    hoverable
                    style={{
                      textAlign: "center",
                      borderRadius: "8px",
                      background: "#fff",
                    }}
                  >
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      preview={false}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginBottom: "10px",
                      }}
                    />
                    <Title level={5}>{skill.name}</Title>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AdminSkills;
