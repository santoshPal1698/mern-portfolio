import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../Api/Endpoints";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Row, Col,Button, Form } from "antd";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import useConfirmationModal from "./useConfirmationModal";
import { hasSuperAdminRole } from "../../../services/AuthService";
import "../Admin/css/card.css";
import ToastService from "../../../services/toastService";
import ReadMoreText from "./Redmore";

const AdminProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolioData } = useSelector((state) => state.root);
  const { showConfirm } = useConfirmationModal();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = hasSuperAdminRole() ? "SUPER_ADMIN_SPTECH" : "GUEST";
    setUserRole(role);
  }, []);

  const showDeleteConfirm = (item) => {
    showConfirm({
      title: `Are you sure you want to delete this Project "${item?.title}" ?`,
      content: `This action will permanently delete this Project:`,
      onConfirm: () => deleteExperice(item?._id),
    });
  };

  const deleteExperice = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${PORTFOLIOPOINTS.ApiBaseUrl}delete-project`,
        { _id: id }
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
        onClick={() => navigate("/admin/project-form")}
        style={{ borderRadius: 10 }}
      >
        Project
      </Button>

      <div className="portfolio-container">
        <Row gutter={[16, 16]}>
          {portfolioData.projects.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="project-card"
                cover={
                  <div className="image-wrapper">
                    <img alt="project" src={card?.image} className="project-image" />
                  </div>
                }
                actions={[
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    disabled={!hasSuperAdminRole()}
                    onClick={() =>
                    navigate(`/admin/project-form/${card._id}`, {
                      state: { project: card },
                    })
                  }
                  >
                    Edit
                  </Button>,
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    disabled={!hasSuperAdminRole()}
                    onClick={() => showDeleteConfirm(card)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={card.Project}
                  description={<ReadMoreText text={card.description} maxLength={70} />}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default AdminProjects;