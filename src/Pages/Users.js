import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

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

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/getAdmins");
      setAdmins(response.data.data.admins);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
  };

  const renderPassword = (password) => {
    return "*".repeat(password.length); // Replace password characters with stars
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTempAdminData({ ...selectedAdmin });
  };

  const handleSaveClick = async () => {
    try {
      const { name, userName, athurity } = updateAdmin;
      const { nationalID } = selectedAdmin;

      console.log("Updating Data: ", {
        name,
        userName,
        athurity,
        nationalID,
      });

      const response = await axios.put(
        `http://localhost:5000/auth/updateAdmin/${nationalID}`,
        {
          name,
          userName,
          athurity,
        }
      );

      console.log("Admin updated successfully:", response.data);

      setUpdateAdmin({
        name: "",
        userName: "",
        athurity: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating admin:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdateAdmin({ ...tempAdminData });
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        {/* Your select and admins list */}
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
                <button onClick={handleSaveClick}>حفظ</button>
                <button onClick={handleCancelClick}>إلغاء</button>
              </>
            ) : (
              <button onClick={handleEditClick}>تعديل</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
