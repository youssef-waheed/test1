import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const AdminFees = ({ _id }) => {
  const [feeTypes, setFeeTypes] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedFeeType, setEditedFeeType] = useState("");
  const [editedPaymentType, setEditedPaymentType] = useState("");
  const [editedNationality, setEditedNationality] = useState("");
  const [editedUniversity, setEditedUniversity] = useState("");
  const [editedCollegeDepartment, setEditedCollegeDepartment] = useState("");
  const [editedGpa, setEditedGpa] = useState("");
  const [editedHighSchool, setEditedHighSchool] = useState("");
  const [editedApplying, setEditedApplying] = useState("");
  const [editedAdmission, setEditedAdmission] = useState("");
  const [editedHouseType, setEditedHouseType] = useState("");
  const [editedHouseWithFood, setEditedHouseWithFood] = useState("");
  const [editedHouseInPrevYears, setEditedHouseInPrevYears] = useState("");
  const [editedAmout, setEditedAmout] = useState("");
  const [editedType, setEditedType] = useState("");
  const [editedActive, setEditedActive] = useState("");
  const [editedNecessaryForFeeding, setEditedNecessaryForFeeding] =
    useState(false);
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
  });
  const [showAddForm, setShowAddForm] = useState(false); // State to control visibility of the add form
  const [showFeeOptions, setShowFeeOptions] = useState(false);
  const [feeOptions, setFeeOptions] = useState([]);
  const [editModeFeeOptions, setEditModeFeeOptions] = useState(false);
  const [editedFeeOptions, setEditedFeeOptions] = useState([]);

  useEffect(() => {
    fetchFeeTypes();
    fetchFeeOptions();
  }, [_id]); // Add _id as a dependency

  const fetchFeeTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fees/getFeeType");
      setFeeTypes(response.data.data.fees);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFeeOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/fees/getFeeOptions"
      );
      console.log(response);
      setFeeOptions(response.data.data.feesOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const showDetails = (feeType) => {
    setSelectedFee(feeType);
    setEditedFeeType(feeType.feeType);
    setEditedNecessaryForFeeding(feeType.necessaryForFeeding);
    setEditedPaymentType(feeType.paymentType);
    setEditedUniversity(feeType.out_inSideUniversity);
    setEditedNationality(feeType.natonality);
    setEditedCollegeDepartment(feeType.collageDepartment);
    setEditedGpa(feeType.GPA);
    setEditedHighSchool(feeType.HighSchoolDivision);
    setEditedApplying(feeType.applyingToWhome);
    setEditedAdmission(feeType.admissionsType);
    setEditedHouseType(feeType.housingType);
    setEditedHouseWithFood(feeType.housingWithFood);
    setEditedHouseInPrevYears(feeType.housingInPreviousYears);
    setEditedAmout(feeType.theAmount);
    setEditedType(feeType.feeType);
    setEditedActive(feeType.active);
    setEditMode(false); // Ensure edit mode is off when showing details
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset edited fields to original values
    setEditedFeeType(selectedFee.feeType);
    setEditedNecessaryForFeeding(selectedFee.necessaryForFeeding);
    setEditedPaymentType(selectedFee.paymentType);
    setEditedNationality(selectedFee.natonality);
    setEditedUniversity(selectedFee.out_inSideUniversity);
    setEditedCollegeDepartment(selectedFee.collageDepartment);
    setEditedGpa(selectedFee.GPA);
    setEditedHighSchool(selectedFee.HighSchoolDivision);
    setEditedApplying(selectedFee.applyingToWhome);
    setEditedAdmission(selectedFee.admissionsType);
    setEditedHouseType(selectedFee.housingType);
    setEditedHouseWithFood(selectedFee.housingWithFood);
    setEditedHouseInPrevYears(selectedFee.housingInPreviousYears);
    setEditedAmout(selectedFee.theAmount);
    setEditedType(selectedFee.feeType);
    setEditedActive(selectedFee.active);
  };

  const handleSave = async () => {
    try {
      const updatedFeeType = {
        feeType: editedFeeType,
        necessaryForFeeding: editedNecessaryForFeeding,
        paymentType: editedPaymentType,
        natonality: editedNationality,
        out_inSideUniversity: editedUniversity,
        collageDepartment: editedCollegeDepartment,
        GPA: editedGpa,
        HighSchoolDivision: editedHighSchool,
        applyingToWhome: editedApplying,
        admissionsType: editedAdmission,
        housingType: editedHouseType,
        housingWithFood: editedHouseWithFood,
        housingInPreviousYears: editedHouseInPrevYears,
        theAmount: editedAmout,
        active: editedActive,
      };

      const response = await axios.put(
        `http://localhost:5000/fees/updateFeeType/${selectedFee._id}`,
        updatedFeeType
      );

      console.log("Fee type updated successfully:", response.data);

      fetchFeeTypes();
      setSelectedFee(updatedFeeType);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddButtonClick = () => {
    setShowAddForm(true); // Show the add form when the button is clicked
  };
  const handleSettingsClick = () => {
    // Toggle the visibility of FeeOptions data
    setShowFeeOptions(!showFeeOptions);
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/fees/addFeeType",
        addFeeType
      );
      console.log("Fee type added successfully:", response.data);
      fetchFeeTypes();
      // Reset the add form and hide it
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
      });
      setShowAddForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditFeeOptions = () => {
    setEditModeFeeOptions(true);
  };
  const handleSaveFeeOptions = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/fees/updateFeeOptions/${_id}`,
        editedFeeOptions
      );
      console.log("Fee options updated successfully:", response.data);
      // Exit edit mode
      setEditModeFeeOptions(false);
    } catch (error) {
      console.error("Error updating fee options:", error);
      // Add additional error handling logic here, if needed
    }
  };

  const handleCancelEditFeeOptions = () => {
    // Reset edited fee options to their original values
    setEditedFeeOptions([...feeOptions]);
    setEditModeFeeOptions(false);
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div className="add"></div>
        <div style={{ display: "flex" }} className="button">
          <button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={handleSettingsClick}
          >
            إعدادات الرسوم
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              fontSize: "22px",
              color: "blue",
              fontWeight: "bold",
              textAlign: "left",
            }}
            onClick={handleAddButtonClick} // Same function for showing the add form
          >
            +
          </button>
        </div>

        <ul>
          {feeTypes.map((type, index) => (
            <li key={index} onClick={() => showDetails(type)}>
              {type.feeType}
            </li>
          ))}
        </ul>
      </div>
      <div className="coll">
        {/* Show FeeOptions only if showFeeOptions is true */}

        {showAddForm && (
          <form onSubmit={handleAddFormSubmit}>
            {/* Your form fields for adding a fee type */}
            {/* Example: */}
            <label>
              Fee Type:
              <input
                type="text"
                value={addFeeType.feeType}
                onChange={(e) =>
                  setAddFeeType({ ...addFeeType, feeType: e.target.value })
                }
              />
            </label>
            {/* Add other input fields for other fee type details */}
            <button type="submit">Add Fee Type</button>
          </form>
        )}
        {editMode ? (
          <>
            <textarea
              value={editedFeeType}
              onChange={(e) => setEditedFeeType(e.target.value)}
            />
            <textarea
              value={editedNecessaryForFeeding ? "نعم" : "لا"}
              onChange={(e) => setEditedNecessaryForFeeding(e.target.value)}
            />
            <textarea
              value={editedPaymentType}
              onChange={(e) => setEditedPaymentType(e.target.value)}
            />
            <textarea
              value={editedNationality}
              onChange={(e) => setEditedNationality(e.target.value)}
            />
            <textarea
              value={editedUniversity}
              onChange={(e) => setEditedUniversity(e.target.value)}
            />
            <textarea
              value={editedCollegeDepartment}
              onChange={(e) => setEditedCollegeDepartment(e.target.value)}
            />
            <textarea
              value={editedGpa}
              onChange={(e) => setEditedGpa(e.target.value)}
            />
            <textarea
              value={editedHighSchool}
              onChange={(e) => setEditedGpa(e.target.value)}
            />
            <textarea
              value={editedApplying}
              onChange={(e) => setEditedApplying(e.target.value)}
            />
            <textarea
              value={editedAdmission}
              onChange={(e) => setEditedAdmission(e.target.value)}
            />
            <textarea
              value={editedHouseType}
              onChange={(e) => setEditedHouseType(e.target.value)}
            />
            <textarea
              value={editedHouseWithFood}
              onChange={(e) => setEditedHouseWithFood(e.target.value)}
            />
            <textarea
              value={editedHouseInPrevYears}
              onChange={(e) => setEditedHouseInPrevYears(e.target.value)}
            />
            <textarea
              value={editedAmout}
              onChange={(e) => setEditedAmout(e.target.value)}
            />
            <textarea
              value={editedType}
              onChange={(e) => setEditedType(e.target.value)}
            />
            <textarea
              value={editedActive ? "نعم" : "لا"}
              onChange={(e) => setEditedActive(e.target.value)}
            />

            <button
              style={{
                backgroundColor: "green",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={handleSave}
            >
              حفظ
            </button>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={handleCancel}
            >
              إلغاء
            </button>
          </>
        ) : (
          <>
            <p>اسم الرسوم : {selectedFee?.feeType}</p>
            <p>
              إجباري للتغذية : {selectedFee?.necessaryForFeeding ? "نعم" : "لا"}
            </p>
            <p>نوع الدفع: {selectedFee?.paymentType}</p>
            <p>الجنسية: {selectedFee?.natonality}</p>
            <p>داخل/خارج الجامعة: {selectedFee?.out_inSideUniversity}</p>
            <p>اقسام الكلية : {selectedFee?.collageDepartment}</p>
            <p>التقدير للقدامى : {selectedFee?.GPA}</p>
            <p>شعبة الثانوية عامة الجدد: {selectedFee?.HighSchoolDivision}</p>
            <p>التقديم: {selectedFee?.applyingToWhome}</p>
            <p>نوع القبول: {selectedFee?.admissionsType}</p>
            <p>نوع السكن: {selectedFee?.housingType}</p>
            <p>سكن بتغذية: {selectedFee?.housingWithFood}</p>
            <p>
              السكن فى الأعوام السابقة: {selectedFee?.housingInPreviousYears}
            </p>
            <p>المبلغ: {selectedFee?.theAmount}</p>
            <p>نوع الرسوم: {selectedFee?.feeType}</p>
            <p>فعال : {selectedFee?.active ? "نعم" : "لا"}</p>

            <button
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "blue",
              }}
              onClick={handleEdit}
            >
              تعديل
            </button>
          </>
        )}
        <div className="a3dad">
          {showFeeOptions && (
            <div className="fee-options">
              {editModeFeeOptions ? (
                <>
                  {/* Render text areas for editing */}
                  {editedFeeOptions.map((fee, index) => (
                    <div key={index}>
                      <textarea
                        value={fee.startingDay}
                        onChange={(e) => {
                          const updatedFeeOptions = [...editedFeeOptions];
                          updatedFeeOptions[index].startingDay = e.target.value;
                          setEditedFeeOptions(updatedFeeOptions);
                        }}
                      />
                      <textarea
                        value={fee.delayWithoutFoodTillDay}
                        onChange={(e) => {
                          const updatedFeeOptions = [...editedFeeOptions];
                          updatedFeeOptions[index].delayWithoutFoodTillDay =
                            e.target.value;
                          setEditedFeeOptions(updatedFeeOptions);
                        }}
                      />
                      <textarea
                        value={fee.delayWithFoodTillDay}
                        onChange={(e) => {
                          const updatedFeeOptions = [...editedFeeOptions];
                          updatedFeeOptions[index].delayWithFoodTillDay =
                            e.target.value;
                          setEditedFeeOptions(updatedFeeOptions);
                        }}
                      />
                      <textarea
                        value={fee.maximumFeedingAllowanceRefund}
                        onChange={(e) => {
                          const updatedFeeOptions = [...editedFeeOptions];
                          updatedFeeOptions[
                            index
                          ].maximumFeedingAllowanceRefund = e.target.value;
                          setEditedFeeOptions(updatedFeeOptions);
                        }}
                      />
                      <textarea
                        value={fee.createdOrEditedBy}
                        onChange={(e) => {
                          const updatedFeeOptions = [...editedFeeOptions];
                          updatedFeeOptions[index].createdOrEditedBy =
                            e.target.value;
                          setEditedFeeOptions(updatedFeeOptions);
                        }}
                      />
                    </div>
                  ))}
                  <button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      fontWeight: "bold",
                      marginRight: "10px",
                    }}
                    onClick={handleSaveFeeOptions}
                  >
                    حفظ
                  </button>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onClick={handleCancelEditFeeOptions}
                  >
                    إلغاء
                  </button>
                </>
              ) : (
                <>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>بداية يوم الدفع</th>
                        <th>التأخير مع التغذية حتى اليوم</th>
                        <th>التأخير بدون التغذية حتى اليوم</th>
                        <th>إعادة التسكين مع غرامة حتى يوم</th>
                        <th>الحد الأقصى لاسترداد بدل التغذية</th>
                        <th>إضافة تعديل/</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeOptions.map((fee, index) => (
                        <tr key={index}>
                          <td>
                            <textarea value={fee.startingDay} readOnly />
                          </td>
                          <td>
                            <textarea
                              value={fee.delayWithFoodTillDay}
                              readOnly
                            />
                          </td>
                          <td>
                            <textarea
                              value={fee.delayWithoutFoodTillDay}
                              readOnly
                            />
                          </td>
                          <td>
                            <textarea
                              value={fee.maximumFeedingAllowanceRefund}
                              readOnly
                            />
                          </td>
                          <td>
                            <textarea value={fee.createdOrEditedBy} readOnly />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="t3deel">
                    <button
                      style={{ backgroundColor: "blue", color: "white" }}
                      onClick={handleEditFeeOptions}
                    >
                      تعديل
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFees;
