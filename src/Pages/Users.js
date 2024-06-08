import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { getAuthUser } from "../helper/storage";
const auth = getAuthUser();

const Users = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [updateAdmin, setUpdateAdmin] = useState({
    name: "",
    userName: "",
    athurity: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempAdminData, setTempAdminData] = useState(null);
  const [addAdmin, setAddAdmin] = useState({
    superAdminNationalId: auth ? auth.nationalID : "", // Read superAdminNationalId from local storage
    name: "",
    nationalID: "",
    password: "",
    userName: "",
    athurity: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/getAdmins", {
        headers: {
          authorization: `Bearer__${auth.token}`,
          "Content-Type": "application/json",
        },
      });
      setAdmins(response.data.data.admins || []); // Ensure admins is an array
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTempAdminData({ ...selectedAdmin });
    setUpdateAdmin({ ...selectedAdmin });
  };

  const incremented = async () => {
    try {
      await axios.put(
        `http://localhost:5000/logs/increment/${auth.log.adminID}`,
        {
          type: "add",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createLogs = async () => {
    try {
      await axios.post("http://localhost:5000/logs/createLogs", {
        adminID: auth.log.adminID,
        adminUserName: auth.log.adminUserName,
        action: "تعديل الادمن",
        objectName: `للطالب ${selectedAdmin.studentName},برقم الطالب ${selectedAdmin.nationalID}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const { name, userName, athurity } = updateAdmin;
      const { nationalID } = selectedAdmin;

      const response = await axios.put(
        `http://localhost:5000/auth/updateAdmin/${nationalID}`,
        {
          name,
          userName,
          athurity,
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUpdateAdmin({
        name: "",
        userName: "",
        athurity: "",
      });
      createLogs();
      incremented();
      setIsEditing(false);
      fetchAdmins(); // Refresh the admins list after update
    } catch (error) {
      console.log("Error updating admin:", error);
    }
  };

  const handleAddAdmin = async () => {
    const {
      superAdminNationalId,
      name,
      nationalID,
      password,
      userName,
      athurity,
    } = addAdmin;
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/signUpAdmin`,
        {
          superAdminNationalId,
          name,
          nationalID,
          password,
          userName,
          athurity,
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAddAdmin({
        superAdminNationalId: "",
        name: "",
        nationalID: "",
        password: "",
        userName: "",
        athurity: "",
      });
      fetchAdmins(); // Refresh the admins list after adding
    } catch (error) {
      console.log("Error adding admin:", error);
    }
  };

  const handleDelete = async (nationalID) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/auth/deleteAdmin/${nationalID}`,
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchAdmins(); // Refresh the admins list after deletion
    } catch (error) {
      console.log("Error deleting admin:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdateAdmin({ ...tempAdminData });
  };
  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div className="admins-list">
          <h3>Admins</h3>
          <ul>
            {admins && admins.length > 0 ? (
              admins.map((admin, index) => (
                <li
                  key={index}
                  onClick={() => handleAdminClick(admin)}
                  style={{ color: selectedAdmin === admin ? "red" : "black" }}
                >
                  {admin.name}
                </li>
              ))
            ) : (
              <li>No admins available</li>
            )}
          </ul>
        </div>
      </div>
      <div className="coll">
        {selectedAdmin && (
          <div style={{ fontWeight: "bold" }}>
            <p>
              الاسم:{" "}
              {isEditing ? (
                <input
                  value={updateAdmin.name}
                  onChange={(e) =>
                    setUpdateAdmin({ ...updateAdmin, name: e.target.value })
                  }
                />
              ) : (
                selectedAdmin.name
              )}
            </p>
            <p>
              اسم المستخدم:{" "}
              {isEditing ? (
                <input
                  value={updateAdmin.userName}
                  onChange={(e) =>
                    setUpdateAdmin({ ...updateAdmin, userName: e.target.value })
                  }
                />
              ) : (
                selectedAdmin.userName
              )}
            </p>
            <p>
              الصلاحية:{" "}
              {isEditing ? (
                <input
                  value={updateAdmin.athurity}
                  onChange={(e) =>
                    setUpdateAdmin({ ...updateAdmin, athurity: e.target.value })
                  }
                />
              ) : (
                selectedAdmin.athurity
              )}
            </p>
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveClick}
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  حفظ
                </button>
                <button
                  onClick={handleCancelClick}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  إلغاء
                </button>
              </>
            ) : (
              auth &&
              (auth.athurity === "الكل" || auth.athurity === "تعديل") && (
                <button
                  onClick={handleEditClick}
                  style={{ backgroundColor: "blue", color: "white" }}
                >
                  تعديل
                </button>
              )
            )}
            {auth && (auth.athurity === "الكل" || auth.athurity === "حذف") && (
              <button
                onClick={() => handleDelete(selectedAdmin.nationalID)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                حذف
              </button>
            )}
          </div>
        )}
      </div>
      <div className="add-admin-form">
        <h3 style={{ fontWeight: " bold", fontSize: "22px", color: "darkred" }}>
          إضافة ادمن جديد
        </h3>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>رقم الهوية الرئيسى</Form.Label>
            <Form.Control
              type="text"
              value={addAdmin.superAdminNationalId}
              onChange={(e) =>
                setAddAdmin({
                  ...addAdmin,
                  superAdminNationalId: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>الاسم</Form.Label>
            <Form.Control
              type="text"
              value={addAdmin.name}
              onChange={(e) =>
                setAddAdmin({ ...addAdmin, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formNationalID">
            <Form.Label>رقم الهوية</Form.Label>
            <Form.Control
              type="text"
              value={addAdmin.nationalID}
              onChange={(e) =>
                setAddAdmin({ ...addAdmin, nationalID: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formNationalID">
            <Form.Label>الرقم السري </Form.Label>
            <Form.Control
              type="text"
              value={addAdmin.password}
              onChange={(e) =>
                setAddAdmin({ ...addAdmin, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formUserName">
            <Form.Label>اسم المستخدم</Form.Label>
            <Form.Control
              type="text"
              value={addAdmin.userName}
              onChange={(e) =>
                setAddAdmin({ ...addAdmin, userName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formAthurity">
            <Form.Label>الصلاحية</Form.Label>
            <Form.Control
              type="text"
              value={addAdmin.athurity}
              onChange={(e) =>
                setAddAdmin({ ...addAdmin, athurity: e.target.value })
              }
            />
          </Form.Group>
          <button
            type="button"
            onClick={handleAddAdmin}
            style={{ backgroundColor: "green", color: "white" }}
          >
            إضافة
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Users;
