import React, { useEffect, useMemo, useState } from "react";

function UserDetails() {
  const [userList, setUserList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const itemsPerPage = 5;

  //================ Fetch API ==================

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("All fields are required");
      return;
    }
    if (isEdit) {
      const updatedUsers = userList.map((user) =>
        user.id === formData.id ? formData : user,
      );
      setUserList(updatedUsers);
      setIsEdit(false);
    } else {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: {
          name: "Custom Company",
        },
      };
      setUserList([...userList, newUser]);
    }
    setFormData({
      id: null,
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;
    const updatedUsers = userList.filter((user) => user.id !== id);
    setUserList(updatedUsers);
  };

  const getUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.log(error);
    }
  };

  //================ Search ==================

  const filteredUsers = useMemo(() => {
    return userList.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }, [userList, searchValue]);

  //================ Sorting ==================

  const sortedUsers = useMemo(() => {
    let data = [...filteredUsers];

    if (sortField) {
      data.sort((a, b) => {
        const valueA = String(a[sortField]).toLowerCase();
        const valueB = String(b[sortField]).toLowerCase();

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;

        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;

        return 0;
      });
    }

    return data;
  }, [filteredUsers, sortField, sortOrder]);

  //================ Pagination ==================

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const indexOfLastUser = currentPage * itemsPerPage;

  const indexOfFirstUser = indexOfLastUser - itemsPerPage;

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  //================ Reset Page ==================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, sortField, sortOrder]);

  //================ Sorting Function ==================

  const handleSorting = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  //================ Pagination ==================

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h2 className="text-center text-primary mb-4">User Management</h2>
      <div className="row">
        <div className="col-md-8 col-lg-8 col-12">
          {/* Search */}

          <input
            type="text"
            className="form-control mb-4"
            placeholder="Search Name, Email or Phone"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSorting("name")}
                >
                  Name{" "}
                  {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>

                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSorting("email")}
                >
                  Email{" "}
                  {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>

                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSorting("phone")}
                >
                  Phone{" "}
                  {sortField === "phone" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>

                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{indexOfFirstUser + index + 1}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.phone}</td>

                    <td>{user.company.name}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-danger">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}

          <div className="d-flex justify-content-center align-items-center">
            <button
              className="btn btn-primary me-2"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`btn mx-1 ${
                  currentPage === index + 1
                    ? "btn-success"
                    : "btn-outline-primary"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="btn btn-primary ms-2"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-12 py-2">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="text"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control mb-3"
            />

            <button className="btn btn-success">
              {isEdit ? "Update User" : "Add User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
