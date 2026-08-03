import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../../Api/Endpoints";
import { hideLoading, ReloadData, showLoading } from "../../../../redux/rootSlice";
import ToastService from "../../../../services/toastService";

const ProjectForm = () => {
  const { id } = useParams(); // present only in edit mode
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const isEdit = Boolean(id);
  const [initialValues, setInitialValues] = useState(
    location.state?.project || null,
  );
  const [loading, setLoading] = useState(isEdit && !location.state?.project);

  // Get logged-in user from localStorage
  // const getUserId = () => {
  //   try {
  //     const raw = localStorage.getItem("USER");
  //     if (!raw) return null;
  //     const parsed = JSON.parse(raw);
  //     return parsed?.userData?.data?._id || null;
  //   } catch (error) {
  //     console.error("Failed to parse USER from localStorage", error);
  //     return null;
  //   }
  // };

  useEffect(() => {
    // const fetchProject = async () => {
    //   if (isEdit && !initialValues) {
    //     try {
    //       setLoading(true);
    //       const response = await axios.post(
    //         `${PORTFOLIOPOINTS.ApiBaseUrl}get-project`,
    //         { _id: id },
    //       );
    //       if (response.data.success) {
    //         setInitialValues(response.data.data);
    //         form.setFieldsValue(response.data.data);
    //       } else {
    //         ToastService.error(response.data.message);
    //         navigate("/admin/projects");
    //       }
    //     } catch (error) {
    //       ToastService.error(error.message);
    //       navigate("/admin/projects");
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    // };
    // fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFinish = async (values) => {
    // const userId  = getUserId();
    // console.log("user for data for add", values, id);
    // if (!isEdit && !userId) {
    //   ToastService.error("User not found. Please login again.");
    //   navigate("/login");
    //   return;
    // }

    try {
      dispatch(showLoading());
      let response;
      if (isEdit) {
        response = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}update-project`,
          { ...values, _id: id },
        );
      } else {
        response = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}add-project`, values,
        );
      }
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(ReloadData(true));
        ToastService.success(response.data.message);
        navigate("/admin-dashboard");
      } else {
        ToastService.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      ToastService.error(error.message);
    }
  };

  if (loading) return <div>Loading project...</div>;

  return (
    <div style={{ maxWidth: "90%", margin: "0 auto", padding: 24 }}>
      <h2>{isEdit ? "Edit Project" : "Add Project"}</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label="Project Title"
          rules={[
            { required: true, message: "Please Enter Your Project title." },
          ]}
        >
          <Input placeholder="Project Title" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Project Logo Pic"
          rules={[{ required: true, message: "Please Enter Your Logo Url." }]}
        >
          <Input placeholder="Project profile" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please Select Your Date" }]}
        >
          <Input placeholder="Date" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please Enter Your Description." },
          ]}
        >
          <TextArea
            placeholder="Enter your text here..."
            autoSize={{ minRows: 5, maxRows: 15 }}
            style={{ width: "100%", resize: "none" }}
          />
        </Form.Item>

        <Form.Item
          name="github"
          label="Github"
          rules={[{ required: true, message: "Please Enter Your Github Url." }]}
        >
          <Input placeholder="Github" />
        </Form.Item>

        <Form.Item
          name="webapp"
          label="Project Url"
          rules={[
            { required: true, message: "Please Enter Your Project Url." },
          ]}
        >
          <Input placeholder="Project Url" />
        </Form.Item>

        <Form.Item
          name="tags"
          label="Tags Profile"
          rules={[
            { required: true, message: "Please Enter Your Tags Profile." },
          ]}
        >
          <Input placeholder="Tags Profile" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Update" : "Add"}
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => navigate("/admin-dashboard")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProjectForm;
