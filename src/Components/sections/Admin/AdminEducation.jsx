import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../Api/Endpoints";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import useConfirmationModal from "./useConfirmationModal";
import { hasSuperAdminRole } from "../../../services/AuthService";
import "../Admin/css/card.css";
import ToastService from "../../../services/toastService";
import ReadMoreText from "./Redmore";
import { useNavigate } from "react-router-dom";

const AdminEducation = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { showConfirm } = useConfirmationModal();
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = hasSuperAdminRole() ? "SUPER_ADMIN_SPTECH" : "GUEST";
    setUserRole(role);
  }, []);

  const showDeleteConfirmation = (item) => {
    showConfirm({
      title: "Delete Confirmation",
      content: `Are you sure you want to delete "${item?.school}" with ID: ${item?._id}?`,
      onConfirm: () => deleteExperice(item?._id),
    });
  };

  const deleteExperice = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}delete-education`, { _id: id, },
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
      ToastService.error(response.data.message);
    }
  };

  return (
    <>
      <Button
        type="primary"
        disabled={!hasSuperAdminRole()}
        icon={<PlusOutlined />}
        onClick={() => navigate("/admin/education-form")}
        style={{ borderRadius: 5 }}
      >
        Education
      </Button>

      <div className="portfolio-container">
        <Row gutter={[16, 16]}>
          {portfolioData.education.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                className="project-card"
                cover={
                  <div className="image-wrapper">
                    <img
                      alt="project Imges"
                      src={card?.img}
                      className="project-image"
                    />
                  </div>
                }
                actions={[
                  <Button
                    type="primary"
                    disabled={!hasSuperAdminRole()}
                    icon={<EditOutlined />}
                    onClick={() =>
                      navigate(`/admin/education-form/${card._id}`, {
                        state: { project: card },
                      })
                    }
                    style={{ borderRadius: 5 }}
                  >
                    Edit
                  </Button>,
                  <Button
                    type="primary"
                    danger
                    disabled={!hasSuperAdminRole()}
                    icon={<DeleteOutlined />}
                    onClick={() => showDeleteConfirmation(card)}
                    style={{ borderRadius: 5 }}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={card.company}
                  description={<ReadMoreText text={card.desc} maxLength={70} />}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default AdminEducation;
