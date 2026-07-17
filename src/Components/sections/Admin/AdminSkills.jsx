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
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import useConfirmationModal from "./useConfirmationModal";
import { hasSuperAdminRole } from "../../../services/AuthService";
import ToastService from "../../../services/toastService";
// import "../Admin/css/card.css";

const AdminSkills = () => {
  const { showConfirm } = useConfirmationModal();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = React.useState(null);
  const [type, setType] = React.useState("add");
  const [userRole, setUserRole] = useState(null);


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

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response;
      if (selectedItemEdit) {
        response = await axios.post(
          `${PORTFOLIOPOINTS.ApiBaseUrl}update-skills`,
          {
            ...values,
            _id: selectedItemEdit._id,
          }
        );
      } else {
        response = await axios.post(
          `${PORTFOLIOPOINTS.ApiBaseUrl}add-skills`,
          values
        );
      }
      setIsModalOpen(false);
      if (response.data.success) {
        dispatch(hideLoading());
        dispatch(ReloadData(true));
        form.resetFields();
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
        onClick={() => {
          setSelectedItemEdit(null);
          setIsModalOpen(true);
        }}
        style={{ borderRadius: 5 }}
      >
        Skills
      </Button>

      {(type == "add" || selectedItemEdit) && (
        <Modal
          title={selectedItemEdit ? "Edit Skills" : "Add Skills"}
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
              form={form}
              layout="vertical"
              // initialValues={{ skills: [{}] }}
              initialValues={selectedItemEdit}
            >
              <Form.Item name="title" label="Skills Category Title">
                <input placeholder="Skills Category Title" />
              </Form.Item>

              <Form.List name="skills">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        align="baseline"
                        style={{ display: "flex", marginBottom: 8 }}
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "Please enter skill name!",
                            },
                          ]}
                        >
                          <Input placeholder="Skill Name (e.g., HTML)" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "image"]}
                          rules={[
                            {
                              required: true,
                              message: "Please upload an image!",
                            },
                          ]}
                        >
                          <Input placeholder="Image URL" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Skill
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

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
                    onClick={() => {
                      setSelectedItemEdit(category);
                      setIsModalOpen(true);
                      setType("edit");
                    }}
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
            ) :('')
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
