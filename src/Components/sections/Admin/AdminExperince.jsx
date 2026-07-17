import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../Api/Endpoints";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import { Modal } from "antd";
import useConfirmationModal from "./useConfirmationModal";
import TextArea from "antd/es/input/TextArea";
import { hasSuperAdminRole } from "../../../services/AuthService";
import "../Admin/css/card.css";
import ToastService from "../../../services/toastService";

const AdminExperince = () => {
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
          `${PORTFOLIOPOINTS.ApiBaseUrl}update-experience`,
          {
            ...values,
            _id: selectedItemEdit._id,
          }
        );
      } else {
        response = await axios.post(
          `${PORTFOLIOPOINTS.ApiBaseUrl}add-experience`,
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

  const showDeleteConfirmation = (item) => {
    showConfirm({
      title: 'Delete Confirmation',
      content: `Are you sure you want to delete "${item.company}" with ID: ${item._id}?`,
      onConfirm: () => deleteExperice(item?._id),
    });
  };

  const deleteExperice = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}delete-experience`,{
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
        onClick={() => {
          setSelectedItemEdit(null);
          setIsModalOpen(true);
        }}
        style={{ borderRadius: 5}}
      >
        Experince
      </Button>

      {(type == "add" || selectedItemEdit) && (
        <Modal
          title={selectedItemEdit ? "Edit Experince" : "Add Experince"}
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
              <Form.Item name="company" label="Company Name">
                <input placeholder="Company Name" />
              </Form.Item>

              <Form.Item name="img" label="Company Logo Pic">
                <input placeholder="Company profile" />
              </Form.Item>

              <Form.Item name="date" label="Date">
                <input placeholder="Date" />
              </Form.Item>

              <Form.Item name="desc" label="Description">
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

              <Form.Item name="role" label="Role">
                <input placeholder="Role " />
              </Form.Item>

              <Form.Item name="doc" label="Doc Profile">
                <input placeholder="Doc Profile" />
              </Form.Item>

              <Form.Item name="skills" label="skills Profile">
                <input placeholder="skills Profile" />
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
          {portfolioData.experience.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                className="project-card"
                hoverable
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
                    icon={<EditOutlined />}
                    disabled={!hasSuperAdminRole()}
                    onClick={() => {
                      setSelectedItemEdit(card);
                      setIsModalOpen(true);
                      setType("edit");
                    }}
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
                  description={card.desc?.slice(0, 70) + "..."}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default AdminExperince;
