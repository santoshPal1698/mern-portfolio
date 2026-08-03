import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../../Api/Endpoints";
import { hideLoading,ReloadData,showLoading} from "../../../../redux/rootSlice";
import ToastService from "../../../../services/toastService";

const ExperienceForm = () => {
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
    debugger;
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
        response = await axios.post(
          `${PORTFOLIOPOINTS.ApiBaseUrl}update-experience`,
          { ...values, _id: id },
        );
      } else {
        response = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}add-experience`, values,
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
      <h2>{isEdit ? "Edit Experience" : "Add Experience"}</h2>
      <div>
        <Form
          onFinish={onFinish}
          layout="vertical"
          initialValues={initialValues}
        >
          <Form.Item name="company" label="Company Name" rules={[
            { required: true, message: "Please Enter Company Name." }]}>
            <input placeholder="Company Name" />
          </Form.Item>

          <Form.Item name="img" label="Company Logo Pic" rules={[
            { required: true, message: "Please Enter Your Company Logo Url." }]}>
            <input placeholder="Company profile" />
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[
            { required: true, message: "Please Enter Your Date." }]}>
            <input placeholder="Date" />
          </Form.Item>

          <Form.Item name="desc" label="Description" rules={[
            { required: true, message: "Please Enter Your Description." }]}>
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

          <Form.Item name="role" label="Role" rules={[
            { required: true, message: "Please Enter Your Role." }]}>
            <input placeholder="Role " />
          </Form.Item>

          <Form.Item name="doc" label="Doc Profile">
            <input placeholder="Doc Profile" />
          </Form.Item>

          <Form.Item name="skills" label="skills Profile" rules={[
            { required: true, message: "Please Enter Your Skils." }]}>
            <input placeholder="skills Profile Like [Html,Css, Javascript]" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEdit ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ExperienceForm;
