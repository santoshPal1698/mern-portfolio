import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../Api/Endpoints";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";
import TextArea from "antd/es/input/TextArea";
import { hasSuperAdminRole } from "../../../services/AuthService";
import ToastService from "../../../services/toastService";

const AdminIntro = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const location = useLocation();
  const isUserDashboard = location.pathname === "/user-dashboard";
  const [form] = Form.useForm();
  const isEdit = !isUserDashboard;

  useEffect(() => {
    if (isUserDashboard) {
      form.resetFields();
    } else if (portfolioData?.intro) {
      form.setFieldsValue(portfolioData.intro);
    } else {
      form.resetFields();
    }
  }, [location.pathname, portfolioData, isUserDashboard, form]);

  const onFinish = async (values) => {
    try {
      let response;
      dispatch(showLoading());

      if (!isUserDashboard) {
        response = await axios.post(
          `${PORTFOLIOPOINTS.ApiBaseUrl}update-intro`,
          {
            ...values,
            _id: portfolioData?.intro?._id,
          },
        );
      } else {
        response = await axios.post(
          `${PORTFOLIOPOINTS.ApiBaseUrl}add-intro`,
          values,
        );
      }

      dispatch(hideLoading());
      dispatch(ReloadData(true));

      if (response.data.success) {
        ToastService.success(response.data.message);
        if (!isEdit) {
          form.resetFields(); 
        }
      } else {
        ToastService.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      ToastService.error(
        error?.response?.data?.message || "Something went wrong",
      );
    }
  };

  return (
    <div style={{ maxWidth: "90%", margin: "0 auto", padding: 24 }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Username"
          rules={[{ required: true, message: "Please Enter your Username." }]}
        >
          <Input placeholder="UserName" />
        </Form.Item>

        <Form.Item
          name="profile_url"
          label="User profile"
          rules={[
            { required: true, message: "Please Enter your Profile Url." },
          ]}
        >
          <Input placeholder="User profile Url" />
        </Form.Item>

        <Form.Item
          name="resume"
          label="Resume"
          rules={[
            { required: true, message: "Please Enter your Resume Link." },
          ]}
        >
          <Input placeholder="Resume" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please Enter your Description Link." },
          ]}
        >
          <TextArea
            placeholder="Enter your text here..."
            autoSize={{ minRows: 5, maxRows: 15 }}
            style={{ width: "100%", height: "100%", resize: "none" }}
          />
        </Form.Item>

        <Form.Item
          name="github"
          label="Github Profile"
          rules={[{ required: true, message: "Please Enter Github Url." }]}
        >
          <Input
            placeholder="Github Profile"
            disabled={!isUserDashboard}
            readOnly={!isUserDashboard}
          />
        </Form.Item>

        <Form.Item
          name="linkedin"
          label="Linkdin Profile"
          rules={[
            { required: true, message: "Please Enter your Linkdin Url." },
          ]}
        >
          <Input
            placeholder="Linkdin Profile"
            disabled={!isUserDashboard}
            readOnly={!isUserDashboard}
          />
        </Form.Item>

        <Form.Item
          name="roles"
          label="Roles"
          rules={[{ required: true, message: "Please Enter your Roles." }]}
        >
          <Input
            placeholder="Roles"
            disabled={!isUserDashboard}
            readOnly={!isUserDashboard}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            disabled={!hasSuperAdminRole() && !isUserDashboard}
            htmlType="submit"
          >
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminIntro;
