import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAuthUser } from "../../helper/storage";
import Form from "react-bootstrap/Form";
var _id;
const auth = getAuthUser();

const AdminFees = ({ _id }) => {
  console.log("====================================");
  console.log(_id);

  console.log("====================================");
  const [feeTypes, setFeeTypes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedFeeType, setSelectedFeeType] = useState(null);
  const [selectedFeeTypeData, setSelectedFeeTypeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [addFeeType, setAddFeeType] = useState({
    feeType: "",
    necessaryForFeeding: "",
    paymentType: "",
    natonality: "",
    out_inSideUniversity: "",
    collageDepartment: "",
    GPA: "",
    HighSchoolDivision: "",
    applyingToWhome: "",
    admissionsType: "",
    housingType: "",
    housingWithFood: "",
    housingInPreviousYears: "",
    theAmount: "",
    active: "",
    createdBy: "",
  });
  const [updateFeeType, setUpdateFeeType] = useState({
    feeType: "",
    necessaryForFeeding: "",
    paymentType: "",
    natonality: "",
    out_inSideUniversity: "",
    collageDepartment: "",
    GPA: "",
    HighSchoolDivision: "",
    applyingToWhome: "",
    admissionsType: "",
    housingType: "",
    housingWithFood: "",
    housingInPreviousYears: "",
    theAmount: "",
    active: "",
    createdBy: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [feeOptions, setFeeOptions] = useState([]);
  // END OF USE STATES**********************************************

  useEffect(() => {
    fetchFeeTypes();

    fetchFeeOptionsTypes(_id);
  }, [_id]);
  const fetchFeeTypes = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get("http://localhost:5000/fees/getFeeType");
      setFeeTypes(response.data.data.fees);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addAdminFeeType = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/fees/addFeeType`,
        {
          ...addFeeType,
          necessaryForFeeding: addFeeType.necessaryForFeeding === "نعم",
          active: addFeeType.active === "نعم",
          createdBy: auth.log.adminUserName,
        }
      );
      setAddFeeType({
        feeType: "",
        necessaryForFeeding: "",
        paymentType: "",
        natonality: "",
        out_inSideUniversity: "",
        collageDepartment: "",
        GPA: "",
        HighSchoolDivision: "",
        applyingToWhome: "",
        admissionsType: "",
        housingType: "",
        housingWithFood: "",
        housingInPreviousYears: "",
        theAmount: "",
        active: "",
        createdBy: "",
      });
      fetchFeeTypes();
      setShowAddForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAdminFeeType = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/fees/updateFeeType/${selectedFeeType._id}`,
        {
          ...updateFeeType,
          necessaryForFeeding: updateFeeType.necessaryForFeeding === "نعم",
          active: updateFeeType.active === "نعم",
          createdBy: auth.log.adminUserName,
        }
      );
      fetchFeeTypes();
      setShowEditForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  // FEETYPES**********************************
  const fetchFeeOptionsTypes = async (_id) => {
    if (!_id) {
      console.log("Invalid ID: _id is null or undefined");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/fees/getFeeOptions/${_id}`
      );
      console.log(response);
      // setFeeOptions(response.data.data.feesOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFeeTypeClick = async (feeType) => {
    setSelectedFeeType(feeType);
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/fees/getFeeType`);
      setSelectedFeeTypeData(response.data.data.fees);
      console.log(response);
    } catch (error) {
      console.log(error);
      setSelectedFeeTypeData([]);
      setIsLoading(false);
    }
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true); // Show the add form when the button is clicked
  };

  const handleEditButtonClick = () => {
    setShowEditForm(true); // Show the edit form when the button is clicked
    setUpdateFeeType(selectedFeeType); // Populate the edit form with the selected fee type's data
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div className="add"></div>
        <div style={{ display: "flex" }} className="button"></div>

        <ul>
          {feeTypes.map((feeType, index) => (
            <li key={index}>
              <button onClick={() => handleFeeTypeClick(feeType)}>
                {feeType.feeType}
              </button>
            </li>
          ))}
        </ul>
        <button
          style={{
            backgroundColor: "transparent",
            fontSize: "22px",
            color: "blue",
            fontWeight: "bold",
            textAlign: "left",
          }}
          onClick={handleAddButtonClick} // Show add form
        >
          +
        </button>
      </div>
      <div className="coll">
        {showAddForm && (
          <form>
            {/* Form fields for adding a fee type */}
            <Form.Label htmlFor="inputPassword5">نوع رسوم </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, feeType: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">إجباري للتغذية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({
                  ...addFeeType,
                  necessaryForFeeding: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5"> نوع الدفع:</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, paymentType: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">الجنسية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, natonality: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">داخل/خارج الجامعة </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({
                  ...addFeeType,
                  out_inSideUniversity: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">اقسام الكلية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({
                  ...addFeeType,
                  collageDepartment: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5"> التقدير للقدامى </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, GPA: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">
              شعبة الثانوية عامة الجدد{" "}
            </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({
                  ...addFeeType,
                  HighSchoolDivision: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">التقديم </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({
                  ...addFeeType,
                  applyingToWhome: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">نوع القبول </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, admissionsType: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">نوع السكن </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, housingType: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">سكن بتغذية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({
                  ...addFeeType,
                  housingWithFood: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">
              السكن فى الأعوام السابقة{" "}
            </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({
                  ...addFeeType,
                  housingInPreviousYears: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">المبلغ </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, theAmount: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">فعال </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, active: e.target.value })
              }
            />
            <button
              style={{
                margin: "20px",
                backgroundColor: "green",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={addAdminFeeType}
            >
              إضافة نوع رسوم
            </button>
          </form>
        )}
        {selectedFeeType && !showEditForm && (
          <div>
            <h3>نوع الرسوم: {selectedFeeType.feeType}</h3>
            <h3>التقدير : {selectedFeeType.GPA}</h3>
            <h3>نوع الدفع : {selectedFeeType.paymentType}</h3>
            <h3>الجنسية : {selectedFeeType.natonality}</h3>
            <button
              style={{ color: "white", background: "blue" }}
              onClick={handleEditButtonClick} // Show edit form
            >
              تعديل
            </button>
          </div>
        )}
        {showEditForm && (
          <form>
            {/* Form fields for editing a fee type */}
            <Form.Label htmlFor="inputPassword5">نوع رسوم </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.feeType}
              onChange={(e) =>
                setUpdateFeeType({ ...updateFeeType, feeType: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">إجباري للتغذية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.necessaryForFeeding}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  necessaryForFeeding: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5"> نوع الدفع:</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.paymentType}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  paymentType: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">الجنسية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.natonality}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  natonality: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">داخل/خارج الجامعة </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.out_inSideUniversity}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  out_inSideUniversity: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">اقسام الكلية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.collageDepartment}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  collageDepartment: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5"> التقدير للقدامى </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.GPA}
              onChange={(e) =>
                setUpdateFeeType({ ...updateFeeType, GPA: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">
              شعبة الثانوية عامة الجدد{" "}
            </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.HighSchoolDivision}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  HighSchoolDivision: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">التقديم </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.applyingToWhome}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  applyingToWhome: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">نوع القبول </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.admissionsType}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  admissionsType: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">نوع السكن </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.housingType}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  housingType: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">سكن بتغذية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.housingWithFood}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  housingWithFood: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">
              السكن فى الأعوام السابقة{" "}
            </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.housingInPreviousYears}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  housingInPreviousYears: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">المبلغ </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.theAmount}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  theAmount: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5">فعال </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.active}
              onChange={(e) =>
                setUpdateFeeType({ ...updateFeeType, active: e.target.value })
              }
            />
            <button
              style={{
                margin: "20px",
                backgroundColor: "blue",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={updateAdminFeeType}
            >
              تعديل نوع رسوم
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminFees;
