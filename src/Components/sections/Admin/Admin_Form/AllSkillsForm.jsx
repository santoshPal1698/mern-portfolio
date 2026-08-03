import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../../../Api/Endpoints";
import {
  hideLoading,
  ReloadData,
  showLoading,
} from "../../../../redux/rootSlice";
import ToastService from "../../../../services/toastService";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { PlusOneOutlined } from "@mui/icons-material";

const AllSkillsForm = () => {

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
    // console.log("user for data for add", values);
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
          `${PORTFOLIOPOINTS.ApiBaseUrl}update-skills`,
          { ...values, _id: id },
        );
      } else {
        response = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}add-skills`,values,
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
      <h2>{isEdit ? "Edit Skills" : "Add Skills"}</h2>
      <div>
            <Form
              onFinish={onFinish}
              form={form}
              layout="vertical"
              // initialValues={{ skills: [{}] }}
              initialValues={initialValues}
            >
              <Form.Item name="title" label="Skills Category Title" rules={[
             { required: true, message: "Please Enter Your Category Skills tiltle ." } ]}>
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
                              message: "Please upload an image Url",
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
                        icon={<PlusOneOutlined />}
                      >
                        Add Skill
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

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

export default AllSkillsForm;
