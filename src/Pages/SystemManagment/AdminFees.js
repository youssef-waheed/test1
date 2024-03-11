import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAuthUser } from "../../helper/storage";
import Form from "react-bootstrap/Form";
var id;
const auth = getAuthUser();
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
    createdBy: "",
  });
  const [showAddForm, setShowAddForm] = useState(false); // State to control visibility of the add form
  const [showAddOptionForm, setShowAddOptionForm] = useState(false); // State to control visibility of the add form
  const [showFeeOptions, setShowFeeOptions] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [feeOptions, setFeeOptions] = useState([]);
  const [selectedFeeOption, setSelectedFeeOption] = useState(null);

  const [editModeFeeOptions, setEditModeFeeOptions] = useState(false);
  const [editedFeeOptions, setEditedFeeOptions] = useState([]);
  const [showAddFeeOptionForm, setShowAddFeeOptionForm] = useState(false);

  const [addingFeeOption, setAddingFeeOption] = useState({
    feeTypeId: "",
    startingDay: "",
    delayWithFoodTillDay: "",
    delayWithoutFoodTillDay: "",
    rehousingWithFineTillDay: "",
    maximumFeedingAllowanceRefund: "",
    createdOrEditedBy: "",
  });
  useEffect(() => {
    fetchFeeTypes();
    if (_id) {
      fetchFeeOptions(_id);
    }
  }, [_id]);

  const fetchFeeTypes = async (_id) => {
    try {
      const response = await axios.get("http://localhost:5000/fees/getFeeType");
      setFeeTypes(response.data.data.fees);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFeeOptions = async (_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/fees/getFeeOptions/${_id}`
      );
      console.log(_id);
      console.log(response);
      setFeeOptions(response.data.data.feesOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const addFeeTypeAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        ` http://localhost:5000/fees/addFeeType`,
        {
          feeType: addFeeType.feeType,
          necessaryForFeeding:
            addFeeType.necessaryForFeeding === "نعم" ? true : false,
          paymentType: addFeeType.paymentType,
          natonality: addFeeType.natonality,
          out_inSideUniversity: addFeeType.out_inSideUniversity,
          collageDepartment: addFeeType.collageDepartment,
          GPA: addFeeType.GPA,
          HighSchoolDivision: addFeeType.HighSchoolDivision,
          applyingToWhome: addFeeType.applyingToWhome,
          admissionsType: addFeeType.admissionsType,
          housingType: addFeeType.housingType,
          housingWithFood: addFeeType.housingWithFood,
          housingInPreviousYears: addFeeType.housingInPreviousYears,
          theAmount: addFeeType.theAmount,
          active: addFeeType.active === "نعم" ? true : false,
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
      // fetchFeeStatment(_id);
    } catch (error) {
      console.log("NJBANSKJDNA");
      console.log(addFeeType);
      console.log("NJBANSKJDNA");
      console.log(error);
    }
  };
  const deleteFeeType = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/fees/deleteFeeType/${selectedFee._id}`
      );
      id = selectedFee._id;
      console.log(response);
    } catch (error) {
      console.log("DEKDEKDELE");
      console.log(_id);
      console.log("DEKDEKDELE");
      console.log(error);
    }
  };

  const addFeeOptionAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        ` http://localhost:5000/fees/addFeeOptions`,
        {
          feeTypeId: selectedFee._id,
          startingDay: addingFeeOption.startingDay,
          delayWithFoodTillDay: addingFeeOption.delayWithFoodTillDay,
          delayWithoutFoodTillDay: addingFeeOption.delayWithoutFoodTillDay,
          rehousingWithFineTillDay: addingFeeOption.rehousingWithFineTillDay,
          maximumFeedingAllowanceRefund:
            addingFeeOption.maximumFeedingAllowanceRefund,
          createdOrEditedBy: auth.log.adminUserName,
        }
      );
      setAddFeeType({
        feeTypeId: "",
        startingDay: "",
        delayWithFoodTillDay: "",
        delayWithoutFoodTillDay: "",
        rehousingWithFineTillDay: "",
        maximumFeedingAllowanceRefund: "",
        createdOrEditedBy: "",
      });
      // fetchFeeTypes();
      // fetchFeeStatment(_id);
      fetchFeeOptions(id);
    } catch (error) {
      console.log("NJBANSKJDNA");
      console.log(addFeeType);
      console.log("NJBANSKJDNA");
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

    // Fetch fee options for the selected fee type
    fetchFeeOptions(feeType._id);
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
  const handleAddButtonOption = () => {
    setShowAddOptionForm(true); // Show the add form when the button is clicked
  };
  const handleSettingsClick = () => {
    // Toggle the visibility of FeeOptions data
    setShowFeeOptions(!showFeeOptions);
  };
  const handleSettingsClickOption = () => {
    // Toggle the visibility of FeeOptions data
    setShowOptions(!showOptions);
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
        {showAddForm && (
          <form>
            {/* Your form fields for adding a fee type */}
            {/* Example: */}
            <Form.Label htmlFor="inputPassword5">نوع رسوم </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({ ...addFeeType, feeType: e.target.value });
              }}
            />
            <Form.Label htmlFor="inputPassword5">إجباري للتغذية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({
                  ...addFeeType,
                  necessaryForFeeding: e.target.value,
                });
              }}
            />
            <Form.Label htmlFor="inputPassword5"> نوع الدفع:</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({ ...addFeeType, paymentType: e.target.value });
              }}
            />
            <Form.Label htmlFor="inputPassword5">الجنسية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({ ...addFeeType, natonality: e.target.value });
              }}
            />
            <Form.Label htmlFor="inputPassword5">داخل/خارج الجامعة </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({
                  ...addFeeType,
                  out_inSideUniversity: e.target.value,
                });
              }}
            />
            <Form.Label htmlFor="inputPassword5">اقسام الكلية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({
                  ...addFeeType,
                  collageDepartment: e.target.value,
                });
              }}
            />
            <Form.Label htmlFor="inputPassword5"> التقدير للقدامى </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({ ...addFeeType, GPA: e.target.value });
              }}
            />
            <Form.Label htmlFor="inputPassword5">
              شعبة الثانوية عامة الجدد{" "}
            </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({
                  ...addFeeType,
                  HighSchoolDivision: e.target.value,
                });
              }}
            />
            <Form.Label htmlFor="inputPassword5">التقديم </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({
                  ...addFeeType,
                  applyingToWhome: e.target.value,
                });
              }}
            />
            <Form.Label htmlFor="inputPassword5">نوع القبول </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({
                  ...addFeeType,
                  admissionsType: e.target.value,
                });
              }}
            />
            <Form.Label htmlFor="inputPassword5">نوع السكن </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({ ...addFeeType, housingType: e.target.value });
              }}
            />
            <Form.Label htmlFor="inputPassword5">سكن بتغذية </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({
                  ...addFeeType,
                  housingWithFood: e.target.value,
                });
              }}
            />
            <Form.Label htmlFor="inputPassword5">
              السكن فى الأعوام السابقة{" "}
            </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({
                  ...addFeeType,
                  housingInPreviousYears: e.target.value,
                });
              }}
            />
            <Form.Label htmlFor="inputPassword5">المبلغ </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({ ...addFeeType, theAmount: e.target.value });
              }}
            />
            <Form.Label htmlFor="inputPassword5">فعال </Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) => {
                setAddFeeType({ ...addFeeType, active: e.target.value });
              }}
            />
            <button
              style={{
                margin: "20px",
                backgroundColor: "green",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={addFeeTypeAdmin}
            >
              إضافة نوع رسوم
            </button>
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
            <p>
              نوع الدفع:
              {selectedFee?.paymentType}
            </p>
            <p>الجنسية: {selectedFee?.natonality}</p>
            <p>
              داخل/خارج الجامعة:
              {selectedFee?.out_inSideUniversity}
            </p>
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
            <button
              style={{
                marginRight: "20px",
                color: "white",
                fontWeight: "bold",
                backgroundColor: "red",
              }}
              onClick={deleteFeeType}
            >
              حذف
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
                        value={fee.rehousingWithFineTillDay}
                        onChange={(e) => {
                          const updatedFeeOptions = [...editedFeeOptions];
                          updatedFeeOptions[index].rehousingWithFineTillDay =
                            e.target.value;
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
                  >
                    حفظ
                  </button>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                    }}
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
                            <textarea
                              value={fee.rehousingWithFineTillDay}
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
                    <button style={{ backgroundColor: "blue", color: "white" }}>
                      تعديل
                    </button>
                  </div>
                  <div className="coll">
                    {/* <button
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                      onClick={handleAddButtonOption}
                    >
                      Add Fee Option
                    </button> */}
                    {/* Render the add fee option form if showAddFeeOptionForm is true */}
                    <form>
                      <Form.Label htmlFor="inputPassword5">
                        بداية يوم الدفع{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="Type"
                        onChange={(e) => {
                          setAddingFeeOption({
                            ...addingFeeOption,
                            startingDay: e.target.value,
                          });
                        }}
                      />
                      <Form.Label htmlFor="inputPassword5">
                        التأخير مع التغذية حتى اليوم{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="Type"
                        onChange={(e) => {
                          setAddingFeeOption({
                            ...addingFeeOption,
                            delayWithFoodTillDay: e.target.value,
                          });
                        }}
                      />
                      <Form.Label htmlFor="inputPassword5">
                        لتأخير بدون التغذية حتى اليوم
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="Type"
                        onChange={(e) => {
                          setAddingFeeOption({
                            ...addingFeeOption,
                            delayWithoutFoodTillDay: e.target.value,
                          });
                        }}
                      />
                      <Form.Label htmlFor="inputPassword5">
                        إعادة التسكين مع غرامة حتى يوم
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="Type"
                        onChange={(e) => {
                          setAddingFeeOption({
                            ...addingFeeOption,
                            rehousingWithFineTillDay: e.target.value,
                          });
                        }}
                      />
                      <Form.Label htmlFor="inputPassword5">
                        الحد الأقصى لاسترداد بدل التغذية{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="Type"
                        onChange={(e) => {
                          setAddingFeeOption({
                            ...addingFeeOption,
                            maximumFeedingAllowanceRefund: e.target.value,
                          });
                        }}
                      />
                    </form>
                  </div>
                </>
              )}
              <button
                style={{
                  margin: "20px",
                  backgroundColor: "green",
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={addFeeOptionAdmin}
              >
                إضافة نوع رسوم
              </button>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFees;
