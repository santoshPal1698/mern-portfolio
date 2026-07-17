import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../Api/Endpoints";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import useConfirmationModal from "./useConfirmationModal";
import { hasSuperAdminRole } from "../../../services/AuthService";
import "../Admin/css/card.css";
import ToastService from "../../../services/toastService";

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = React.useState(null);
  const [type, setType] = React.useState("add");
  const { showConfirm } = useConfirmationModal();
  const [userRole, setUserRole] = useState(null);
  

  useEffect(() => {
    const role = hasSuperAdminRole() ? "SUPER_ADMIN_SPTECH" : "GUEST";
    setUserRole(role);
  }, []);


  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response;
      if (selectedItemEdit) {
        response = await axios.post(
          `${PORTFOLIOPOINTS.ApiBaseUrl}update-project`,
          {
            ...values,
            _id: selectedItemEdit._id,
          }
        );
      } else {
        response = await axios.post(
          `${PORTFOLIOPOINTS.ApiBaseUrl}add-project`,
          values
        );
      }
      setIsModalOpen(false);
      if (response.data.success) {
        dispatch(hideLoading());
        dispatch(ReloadData(true));
        ToastService.success(response.data.message);
      } else {
        ToastService.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      setIsModalOpen(false);
      ToastService.error(error.message);
    }
  };

  const showDeleteConfirm = (item) => {
    showConfirm({
      title: `Are you sure you want to delete this Project "${item?.title}" ?`,
      content: `This action will permanently delete this Project:`,
      onConfirm: () => deleteExperice(item?._id),
    });
  }


  const deleteExperice = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${PORTFOLIOPOINTS.ApiBaseUrl}delete-project`,
        {
          _id:id,
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
        onClick={() => {
          setSelectedItemEdit(null);
          setIsModalOpen(true);
        }}
        style={{ borderRadius:10 }}
      >
        Project
      </Button>

      {(type == "add" || selectedItemEdit) && (
        <Modal
          title={selectedItemEdit ? "Edit Projects" : "Add Project"}
          open={isModalOpen}
          footer={null}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedItemEdit(null);
          }}
        >
          <div>
            <Form
              onFinish={onFinish}
              layout="vertical"
              initialValues={selectedItemEdit}
            >
              <Form.Item name="title" label="Project Title">
                <input placeholder="Project Title" />
              </Form.Item>

              <Form.Item name="image" label="Project Logo Pic">
                <input placeholder="Project profile" />
              </Form.Item>

              <Form.Item name="date" label="Date">
                <input placeholder="Date" />
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

              <Form.Item name="github" label="Github">
                <input placeholder="Github " />
              </Form.Item>

              <Form.Item name="webapp" label="Project Url">
                <input placeholder="Project Url" />
              </Form.Item>

              <Form.Item name="tags" label="Tags Profile">
                <input placeholder="Tags Profile" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {selectedItemEdit ? "Update" : "Add"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )}

<div className="portfolio-container">
  <Row gutter={[16, 16]}>
    {portfolioData.projects.map((card, index) => (
      <Col key={index} xs={24} sm={12} md={8} lg={6}>
        <Card
          hoverable
          className="project-card"
          cover={
            <div className="image-wrapper">
              <img
                alt="project"
                src={card?.image}
                className="project-image"
              />
            </div>
          }
          actions={[
            <Button
              type="primary"
              icon={<EditOutlined />}
              disabled={!hasSuperAdminRole()}
              onClick={() => {
                setSelectedItemEdit(card);
                setIsModalOpen(true);
                setType("edit");
              }}
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
            description={card.description?.slice(0, 70) + "..."}
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
