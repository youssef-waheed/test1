import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAuthUser } from "../../helper/storage";
import Form from "react-bootstrap/Form";
var id;
var feeType_id;
const auth = getAuthUser();

const AdminFees = ({ _id }) => {
  const [feeTypes, setFeeTypes] = useState([]);
  const [showAddFeeTypeForm, setShowAddFeeTypeForm] = useState(false);
  const [showAddFeeOptionForm, setShowAddFeeOptionForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditFormOption, setShowEditFormOption] = useState(false);
  const [selectedFeeType, setSelectedFeeType] = useState(null);
  const [selectedFeeTypeData, setSelectedFeeTypeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [selectedFee, setSelectedFee] = useState(null);
  const [selectedFeeOption, setSelectedFeeOption] = useState(null);
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
  const [addFeeOption, setAddFeeOption] = useState({
    feeTypeId: "",
    startingDay: "",
    delayWithFoodTillDay: "",
    delayWithoutFoodTillDay: "",
    rehousingWithFineTillDay: "",
    maximumFeedingAllowanceRefund: "",
    createdOrEditedBy: "",
  });
  const [updateFeeOption, setUpdateFeeOption] = useState({
    feeTypeId: "",
    startingDay: "",
    delayWithFoodTillDay: "",
    delayWithoutFoodTillDay: "",
    rehousingWithFineTillDay: "",
    maximumFeedingAllowanceRefund: "",
    createdOrEditedBy: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editedFeeOption, setEditedFeeOption] = useState({});
  // END OF USE STATES**********************************************

  useEffect(() => {
    fetchFeeTypes();
    if (_id) {
      fetchFeeOptions(_id);
    }
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
      setShowAddFeeTypeForm(false);
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
  // FEETYPES**********************************
  const fetchFeeOptions = async (feeType_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/fees/getFeeOptions/${feeType_id}`
      );
      console.log(feeType_id);
      console.log(response);
      setFeeOptions(response.data.data.feesOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const addFeeOptionType = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/fees/addFeeOptions`,
        {
          feeTypeId: selectedFee._id,
          startingDay: addFeeOption.startingDay,
          delayWithFoodTillDay: addFeeOption.delayWithFoodTillDay,
          delayWithoutFoodTillDay: addFeeOption.delayWithoutFoodTillDay,
          rehousingWithFineTillDay: addFeeOption.rehousingWithFineTillDay,
          maximumFeedingAllowanceRefund:
            addFeeOption.maximumFeedingAllowanceRefund,
          createdOrEditedBy: auth.log.adminUserName,
        }
      );
      setAddFeeOption({
        feeTypeId: "",
        startingDay: "",
        delayWithFoodTillDay: "",
        delayWithoutFoodTillDay: "",
        rehousingWithFineTillDay: "",
        maximumFeedingAllowanceRefund: "",
        createdOrEditedBy: "",
      });
      fetchFeeOptions();
      setShowAddFeeOptionForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditFeeOption = async (_id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/fees/updateFeeOptions/${selectedFeeOption._id}`,
        {
          feeTypeId: selectedFee._id,
          startingDay: updateFeeOption.startingDay,
          delayWithFoodTillDay: updateFeeOption.delayWithFoodTillDay,
          delayWithoutFoodTillDay: updateFeeOption.delayWithoutFoodTillDay,
          rehousingWithFineTillDay: updateFeeOption.rehousingWithFineTillDay,
          maximumFeedingAllowanceRefund:
            updateFeeOption.maximumFeedingAllowanceRefund,
          createdOrEditedBy: auth.log.adminUserName,
        }
      );
      fetchFeeOptions(selectedFee._id); // Fetch updated fee options
      setShowEditFormOption(false); // Hide the edit form after updating
    } catch (error) {
      console.log(error);
    }
  };
  const showDetails = async (feeType) => {
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
    // console.log("====================================");
    // console.log(feeType._id);
    // console.log("====================================");
    // fetchFeeOptions(feeType._id);
    setSelectedFee(feeType);

    // Fetch fee options for the selected fee type
    fetchFeeOptions(feeType._id)
      .then((options) => {
        if (options && options.length > 0) {
          setSelectedFeeOption(options[0]); // Assuming you're selecting the first option
        } else {
          setSelectedFeeOption(null); // Set to null if no options are available
        }
      })
      .catch((error) => {
        console.error("Error fetching fee options:", error);
        setSelectedFeeOption(null); // Set to null on error
      });
  };

  const renderFeeOptions = () => {
    return feeOptions.map((option, index) => (
      <tr key={index}>
        <td>
          {editMode ? (
            <Form.Control
              type="text"
              value={editedFeeOption.startingDay || option.startingDay}
              onChange={(e) =>
                handleFeeOptionChange("startingDay", e.target.value)
              }
            />
          ) : (
            option.startingDay
          )}
        </td>
        {/* Other fields rendered similarly */}
      </tr>
    ));
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle change in edited fee option
  const handleFeeOptionChange = (key, value) => {
    setEditedFeeOption({ ...editedFeeOption, [key]: value });
  };

  const handleAddFeeTypeButtonClick = () => {
    setShowAddFeeTypeForm(true); // Show the add fee type form
    setShowAddFeeOptionForm(false); // Hide the add fee option form
  };

  const handleAddFeeOptionButtonClick = () => {
    setShowAddFeeTypeForm(false); // Hide the add fee type form
    setShowAddFeeOptionForm(true); // Show the add fee option form
  };
  const handleEditButtonClick = () => {
    setShowEditForm(true); // Show the edit form when the button is clicked
    setUpdateFeeType(selectedFeeType); // Populate the edit form with the selected fee type's data
  };
  const handleEditFeeOptionClick = (option) => {
    setSelectedFeeOption(option);
    setShowEditFormOption(true);
    setUpdateFeeOption({ ...option });
  };

  return (
    <div className="two-column-wrapper">
      <div className="col">
        <div className="add"></div>
        <div style={{ display: "flex" }} className="button"></div>

        <ul>
          {feeTypes.map((feeType, index) => (
            <li key={index}>
              <button onClick={() => showDetails(feeType)}>
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
          onClick={handleAddFeeTypeButtonClick} // Show add form
        >
          +
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            fontSize: "22px",
            color: "blue",
            fontWeight: "bold",
            textAlign: "left",
            border: "solid 1px",
          }}
          onClick={handleAddFeeOptionButtonClick} // Show add form
        >
          إضافة اختيارات رسوم
        </button>
      </div>
      <div className="coll">
        {showAddFeeTypeForm && (
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
            <Form.Label htmlFor="inputPassword5">نوع القبول</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({
                  ...addFeeType,
                  admissionsType: e.target.value,
                })
              }
            />
            <Form.Label htmlFor="inputPassword5"> نوع السكن</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, housingType: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5">سكن بمصاريف</Form.Label>
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
              سكن بمصاريف سنوات سابقة
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
            <Form.Label htmlFor="inputPassword5"> المبلغ</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, theAmount: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5"> نشط</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, active: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5"> بواسطة</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              onChange={(e) =>
                setAddFeeType({ ...addFeeType, createdBy: e.target.value })
              }
            />
            <button
              type="button"
              onClick={addAdminFeeType} // Function to add a new fee type
            >
              Add Fee Type
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
            <Form.Label htmlFor="inputPassword5">نوع القبول</Form.Label>
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
            <Form.Label htmlFor="inputPassword5"> نوع السكن</Form.Label>
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
            <Form.Label htmlFor="inputPassword5">سكن بمصاريف</Form.Label>
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
              سكن بمصاريف سنوات سابقة
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
            <Form.Label htmlFor="inputPassword5"> المبلغ</Form.Label>
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
            <Form.Label htmlFor="inputPassword5"> نشط</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.active}
              onChange={(e) =>
                setUpdateFeeType({ ...updateFeeType, active: e.target.value })
              }
            />
            <Form.Label htmlFor="inputPassword5"> بواسطة</Form.Label>
            <Form.Control
              type="text"
              className="Type"
              value={updateFeeType.createdBy}
              onChange={(e) =>
                setUpdateFeeType({
                  ...updateFeeType,
                  createdBy: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={updateAdminFeeType} // Function to update the fee type
            >
              Update Fee Type
            </button>
          </form>
        )}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>من يوم </th>
              <th>تاخر في الطعام حتي يوم </th>
              <th> تأخر من دون طعام حتي يوم </th>
              <th> إعادة تسكين برسوم </th>
              <th> طعاام </th>
            </tr>
          </thead>
          <tbody>{renderFeeOptions()}</tbody>

          <button
            style={{ backgroundColor: "white", color: "white" }}
            onClick={toggleEditMode}
          >
            {editMode && (
              <button
                style={{ backgroundColor: "blue", color: "white" }}
                onClick={handleEditFeeOption}
              >
                حفظ التعديلات
              </button>
            )}
            <button
              style={{ backgroundColor: "blue", color: "white" }}
              onClick={toggleEditMode}
            >
              {editMode ? "إنهاء التعديل" : "تعديل"}
            </button>
          </button>
        </Table>
        {showAddFeeOptionForm && (
          <form onSubmit={addFeeOptionType}>
            <>
              <Form.Label htmlFor="startingDay">بداية يوم الدفع</Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setAddFeeOption({
                    ...addFeeOption,
                    startingDay: e.target.value,
                  });
                }}
              />
              <Form.Label htmlFor="delayWithFoodTillDay">
                التأخير مع التغذية حتى اليوم
              </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setAddFeeOption({
                    ...addFeeOption,
                    delayWithFoodTillDay: e.target.value,
                  });
                }}
              />
              <Form.Label htmlFor="delayWithoutFoodTillDay">
                التأخير بدون التغذية حتى اليوم
              </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setAddFeeOption({
                    ...addFeeOption,
                    delayWithoutFoodTillDay: e.target.value,
                  });
                }}
              />
              <Form.Label htmlFor="rehousingWithFineTillDay">
                إعادة التسكين مع غرامة حتى يوم
              </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setAddFeeOption({
                    ...addFeeOption,
                    rehousingWithFineTillDay: e.target.value,
                  });
                }}
              />
              <Form.Label htmlFor="maximumFeedingAllowanceRefund">
                الحد الأقصى لاسترداد بدل التغذية
              </Form.Label>
              <Form.Control
                type="text"
                className="Type"
                onChange={(e) => {
                  setAddFeeOption({
                    ...addFeeOption,
                    maximumFeedingAllowanceRefund: e.target.value,
                  });
                }}
              />
            </>
            {showEditFormOption && (
              <form onSubmit={handleEditFeeOption}>
                <>
                  <button style={{ backgroundColor: "red" }} type="submit">
                    تحديث
                  </button>
                  {/* Form fields for editing a fee option */}
                  {/* Populate form fields with the current data */}
                  <Form.Label htmlFor="startingDay">بداية يوم الدفع</Form.Label>
                  <Form.Control
                    type="text"
                    className="Type"
                    value={updateFeeOption.startingDay}
                    onChange={(e) =>
                      setUpdateFeeOption({
                        ...updateFeeOption,
                        startingDay: e.target.value,
                      })
                    }
                  />
                  {/* Other form fields */}
                </>
              </form>
            )}

            <button
              style={{
                backgroundColor: "blue",
                fontSize: "22px",
                color: "white",
                fontWeight: "bold",
                textAlign: "left",
                border: "solid 1px",
              }}
              type="submit"
            >
              إضافة
            </button>
            <button
              style={{
                backgroundColor: "blue",
                fontSize: "22px",
                color: "white",
                fontWeight: "bold",
                textAlign: "left",
                border: "solid 1px",
              }}
              onClick={handleEditFeeOptionClick} // Show add form
            >
              تعديل
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default AdminFees;
