import React, { useState } from "react";
import Checkbox from "../Shared/Checkbox";
import { TextField, Button } from '@material-ui/core';
import "./Button.css";
import axios from "axios";
import Nav from "../Shared/UserNav";

const App = () => {
  // const [checkbox3Checked, setCheckbox3Checked] = useState(false);
  // const [checkbox4Checked, setCheckbox4Checked] = useState(false);
  // const [checkbox5Checked, setCheckbox5Checked] = useState(false);
  // const [checkbox6Checked, setCheckbox6Checked] = useState(false);
// const [dropdownValue5, setDropdown5Value] = useState("");
  // const [dropdownValue2, setDropdown2Value] = useState("");  
  // const [dropdownValue, setDropdownValue] = useState("");
  // const [dropdownValue3, setDropdown3Value] = useState("");
  // const [dropdownValue4, setDropdown4Value] = useState("");
     
  const [newExpartriates, setNewExpartriates] = useState(false);
  const [oldExpartriates, setOldExpartriates] = useState(false);
  const [newEgyption, setNewEgyption] = useState(false);
  const [oldEgyption, setOldEgyption] = useState(false);
//  const handleCheckbox3Change = () => {
//     setCheckbox3Checked(!checkbox3Checked);
//   };
//   const handleCheckbox4Change = () => {
//     setCheckbox4Checked(!checkbox4Checked);
//   };
//   const handleCheckbox5Change = () => {
//     setCheckbox5Checked(!checkbox5Checked);
//   };
//   const handleCheckbox6Change = () => {
//     setCheckbox6Checked(!checkbox6Checked);
//   };
//     const handleDropdown5Change = (event) => {
  //   setDropdown5Value(event.target.value);
  // };
  // const handleDropdown2Change = (event) => {
  //   setDropdown2Value(event.target.value);
  // };
const [policy, setPolicy] = useState(false);
      // const [residence, setResidence] = useState("");
// const [contextOfInquiry, setContextOfInquiry] = useState("");
  // const [confirmEmail, setConfirmEmail] = useState(false);
  // const [blocked, setBlocked] = useState(false);
  // const [image, setImage] = useState("");
  // const [DOB, setDOB] = useState("");
  // const handleDropdownChange = (event) => {
  //   setDropdownValue(event.target.value);
  // };
  // const handleDropdown3Change = (event) => {
  //   setDropdown3Value(event.target.value);
  // };
  // const handleDropdown4Change = (event) => {
  //   setDropdown4Value(event.target.value);
  // };
  const [NewSt, setNewSt] = useState(true);
  const [oldSt, setOldSt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkbox1Checked, setCheckbox1Checked] = useState(true);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [checkbox7Checked, setCheckbox7Checked] = useState(false);
  const [nationalID, setNationalID] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [birthDate, setBirthDate] = useState("2001-01-01");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [email, setEmail] = useState("");
  const [landLinePhone, setLandLinePhone] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherNationalId, setFatherNationalId] = useState("");
  const [fatherJop, setFatherJop] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianRelation, setGuardianRelation] = useState("");
  const [guardianNationalId, setGuardianNationalId] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [AsituationRelatedToTheParents, setAsituationRelatedToTheParents] = useState("");
  const [college, setCollege] = useState("");
  const [grade, setGrade] = useState("");
  const [gradeOfLastYear, setGradeOfLastYear] = useState("");
  const [gradePercentage, setGradePercentage] = useState("");
  const [housingInLastYears, setHousingInLastYears] = useState("");
  const [HighSchoolDivision, setHighSchoolDivision] = useState("");
  const [HighSchoolFromAbroad, setHighSchoolFromAbroad] = useState(false);
  const [HighSchoolGrade, setHighSchoolGrade] = useState("");
  const [HighSchoolPercentage, setHighSchoolPercentage] = useState("");
  const [HousingType, setHousingType] = useState("");
  const [HousingWithoutFood, setHousingWithoutFood] = useState(false);
  const [withSpecialNeeds, setWithSpecialNeeds] = useState(false);
  const [ThefamilyIsOutside, setThefamilyIsOutside] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [PassportNumber, setPassportNumber] = useState("");
  const [IssuingAuthority, setIssuingAuthority] = useState("");
  const [nationality, setNationality] = useState("");
  const [displayDiv, setDisplayDiv] = useState(false);

  const handleButtonClick = () => {
    setDisplayDiv(!displayDiv);
    setNewSt(!NewSt);
    setOldSt(!oldSt);
  };

  const handleCheckbox1Change = () => {
    setCheckbox1Checked(!checkbox1Checked);
    setCheckbox2Checked(!checkbox2Checked);
  };

  const handleCheckbox2Change = () => {
    setCheckbox2Checked(!checkbox2Checked);
    setCheckbox1Checked(!checkbox1Checked);
  };
  
  

  

   const handleCheckbox7Change = () => {
     setCheckbox7Checked(!checkbox7Checked);
   };

  const handleSubmit = async () => {
    const url = "http://localhost:5000/registration/registerEgy";
    const Surl = "http://localhost:5000/registration/registerExp";

    const NEformData = {
      policy,
      newEgyption : true,
      oldEgyption : false, 
      newExpartriates: false,
      oldExpartriates: false,
      nationalID,
      studentCode,
      studentName,
      birthDate,
      placeOfBirth,
      gender,
      religion,
      detailedAddress,
      email,
      landLinePhone,
      phoneNumber,
      fatherName,
      fatherNationalId,
      fatherJop,
      fatherPhone,
      guardianName,
      guardianRelation,
      guardianNationalId,
      guardianPhone,
      AsituationRelatedToTheParents,
      college,
      grade,
      HighSchoolDivision,
      HighSchoolFromAbroad,
      HighSchoolGrade,
      HighSchoolPercentage,
      HousingType,
      password,
      confirmPassword,
     };
    const OEformData = {
      policy,
      newEgyption : false,
      oldEgyption : true,
      newExpartriates : false,
      oldExpartriates : false,
      nationalID,
      studentCode,
      studentName,
      birthDate,
      placeOfBirth,
      gender,
      religion,
      detailedAddress,
      email,
      landLinePhone,
      phoneNumber,
      fatherName,
      fatherNationalId,
      fatherJop,
      fatherPhone,
      guardianName,
      guardianRelation,
      guardianNationalId,
      guardianPhone,
      AsituationRelatedToTheParents,
      college,
      grade,
      gradeOfLastYear,
      gradePercentage,
      housingInLastYears,
      HousingType,
      password,
      confirmPassword,
     };
    const NNEformData = {
      policy,
      newEgyption : false,
      oldEgyption : false,
      newExpartriates : true,
      oldExpartriates : false,
      studentCode,
      studentName,
      birthDate,
      placeOfBirth,
      gender,
      religion,
      detailedAddress,
      email,
      landLinePhone,
      phoneNumber,
      college,
      grade,
      HighSchoolDivision,
      HighSchoolFromAbroad,
      HighSchoolGrade,
      HighSchoolPercentage,
      HousingType,
      password,
      confirmPassword,
      PassportNumber,
      nationality,
    };
    const ONEformData = {
      policy,
      newEgyption : false,
      oldEgyption : false,
      newExpartriates : false,
      oldExpartriates : true,
      studentCode,
      studentName,
      birthDate,
      placeOfBirth,
      gender,
      religion,
      detailedAddress,
      email,
      landLinePhone,
      phoneNumber,
      college,
      grade,
      gradeOfLastYear,
      gradePercentage,
      housingInLastYears,
      HousingType,
      password,
      confirmPassword,
      PassportNumber,
      nationality,
    };

     if(checkbox1Checked && NewSt){
      // setNewEgyption(true);
      // setOldExpartriates(false);
      // setOldEgyption(false);
      // setNewExpartriates(false);
      if (  // Add more conditions for other required fields
      
      !nationalID ||
      !studentCode ||
    !studentName||
    !birthDate||
    !placeOfBirth||
    !policy ||
    !detailedAddress||
    !email||
    !landLinePhone||
    !phoneNumber||
    !fatherName||
    !fatherNationalId||
    !fatherJop||
    !fatherPhone||
    !guardianName||
    !guardianRelation||
    !guardianNationalId||
    !guardianPhone||
    !college||
    !grade||
    
    !HighSchoolGrade||
    !HighSchoolPercentage||
    !HousingType||
    !password||
    !confirmPassword
      ) {
      setErrorMessage("يرجى ملء جميع الحقول الإلزامية");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

 else {  try {
    

    const response = await axios.post(url, NEformData);
   console.log(response);
   
 
      // Handle success
      console.log("Form data submitted successfully");
      setErrorMessage("تم التسجيل بنجاح");
      window.scrollTo({ top: 0, behavior: 'smooth' });
   
  } catch (error) {
    // Log detailed error information
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    console.error("Error during form submission", error);
  }    }

     }
    else if (checkbox1Checked && oldSt){
  //     setOldEgyption(true);
  // setOldExpartriates(false);
  // setNewEgyption(false);
  // setNewExpartriates(false);
      if (  // Add more conditions for other required fields
      ! nationalID||
    !studentCode||
    !studentName||
    !birthDate||
   ! placeOfBirth||
   !policy ||
   ! detailedAddress||
    !email||
    !landLinePhone||
    !phoneNumber||
    !fatherName||
    !fatherNationalId||
    !fatherJop||
    !fatherPhone||
    !guardianName||
   ! guardianRelation||
    !guardianNationalId||
    !guardianPhone||
    !college||
    !grade||
    !gradePercentage||
    !housingInLastYears||
    !HousingType||
    !password||
    !confirmPassword
      ) {
      setErrorMessage("يرجى ملء جميع الحقول الإلزامية");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

 else {  try {
  

  const response = await axios.post(url, OEformData);
    console.log(response);
   
  
      // Handle success
      console.log("Form data submitted successfully");
      setErrorMessage("تم التسجيل بنجاح");
      window.scrollTo({ top: 0, behavior: 'smooth' });
  
  } catch (error) {
    // Log detailed error information
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    console.error("Error during form submission", error);
  }    }
    }
    else if (checkbox2Checked && NewSt){
  //     setNewExpartriates(true);
  // setOldExpartriates(false);
  // setOldEgyption(false);
  // setNewEgyption(false);
      if (  // Add more conditions for other required fields
      !studentCode||
      !studentName||
      !birthDate||
      ! placeOfBirth||
      !policy ||

     ! detailedAddress||
      !email||
      !landLinePhone||
      !phoneNumber||
      !college||
      !grade||
      ! HighSchoolGrade||
     ! HighSchoolPercentage||
      !HousingType||
      !password||
      !confirmPassword||
      !PassportNumber||
      !nationality
      ) {
      setErrorMessage("يرجى ملء جميع الحقول الإلزامية");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(
          gender,
          checkbox1Checked, checkbox2Checked , NewSt,oldSt);
      }

 else {  try {
  
  
  const response = await axios.post(Surl, NNEformData);
   
   
    
      // Handle success
      console.log("Form data submitted successfully");
      setErrorMessage("تم التسجيل بنجاح");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    
  } catch (error) {
    // Log detailed error information
    
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      console.log(
        gender,
        religion,
       
        checkbox1Checked, checkbox2Checked , NewSt,oldSt);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    console.error("Error during form submission", error);
  }    }
    }
    else if (checkbox2Checked && oldSt){
      // setOldExpartriates(true);
      // setOldEgyption(false);
      // setNewEgyption(false);
      // setNewExpartriates(false);
      if (  // Add more conditions for other required fields
    !studentCode||
    !studentName||
    !birthDate||
   ! placeOfBirth||
   !policy ||

   ! detailedAddress||
    !email||
    !landLinePhone||
    !phoneNumber||
    !college||
    !grade||
   ! gradePercentage||
    !housingInLastYears||
    !HousingType||
    !password||
    !confirmPassword||
    !PassportNumber||
    !nationality
      ) {
      setErrorMessage("يرجى ملء جميع الحقول الإلزامية");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

 else {  try {
 

    const response = await axios.post(Surl, ONEformData);
   
    console.log(response);
      // Handle success
      console.log("Form data submitted successfully");
      setErrorMessage("تم التسجيل بنجاح");
      window.scrollTo({ top: 0, behavior: 'smooth' });
   
  } catch (error) {
    // Log detailed error information
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    console.error("Error during form submission", error);
  }    }
    }


    else{
      console.log("Sorry but something unexpected happened");
    }
  };
   
  return (
    
    <div style={{ marginTop: "10px" , marginBottom:"10px"}} id="Form">
      
      <button className={displayDiv ? 'toggle-button active' : 'toggle-button'} onClick={handleButtonClick }>طلاب قدامي / مستجدين</button>
      
      {/* <form onSubmit={handleSubmit}>    </form> */}

      {errorMessage && <h3 style={{ color: "gray" }}>{errorMessage}</h3>}

      {displayDiv &&      <div style={{ marginTop: "10px" , marginBottom:"20px"}}  className="container">
      {/* <button className={displayDiv ? 'toggle-button active' : 'toggle-button'} onClick={handleButtonClick}>طلاب قدامي / مستجدين</button> */}

      
      <h1>طلاب قدامي</h1>
      <p style={{ textAlign: 'right' }}>قم باختيار (قدامى/مستجدين) وملء بياناتك ثم الموافقة على الإقرار بالأسفل<br/>
مع ملاحظة ان الطلاب المستجدين هم طلاب الفرق الأولى أو الاعدادية، الطلاب القدامى هم طلاب مابعد الفرق الأولى أو الاعدادية</p>

      <div className="input-group">
        <Checkbox  
          label="مصري"
          checked={checkbox1Checked}
          onChange={handleCheckbox1Change}
        />
        <Checkbox  
          label="وافد"
          checked={checkbox2Checked}
          onChange={handleCheckbox2Change}
        />
      </div>

      {checkbox2Checked && ( <div className="input-group">
                                <p style={{ marginLeft: "10px" }}> رقم جواز السفر</p>

                            <TextField  required label="الرقم " variant="outlined"size="small" value={PassportNumber}
    onChange={(e) => setPassportNumber(e.target.value)} />
                            <p style={{ marginLeft: "10px" }}>جهة الصدور</p>

                      <TextField  required label="الدولة" variant="outlined"size="small" value={IssuingAuthority}
    onChange={(e) => setIssuingAuthority(e.target.value)} />                  
                      <p style={{ marginLeft: "10px" }}>الجنسية</p>

                      <TextField  required label="الجنسية" variant="outlined"size="small" value={nationality}
    onChange={(e) => setNationality(e.target.value)} />
      </div>)}

      {checkbox1Checked && ( <div className="input-group">
      <p style={{ marginLeft: "10px" }}>الرقم القومي</p>

                            <TextField  required label="الرقم القومي" variant="outlined"size="small" value={nationalID}
    onChange={(e) => setNationalID(e.target.value)} />
                         

      </div>)}

      <div className="input-group">
                            <p style={{ marginLeft: "10px"  }}>كود الطالب</p>
                            <TextField  required label="كود الطالب" variant="outlined" size="small" value={studentCode}
    onChange={(e) => setStudentCode(e.target.value)} />

      </div>
        
      <div className="input-group">
        <TextField  required label="الاسم رباعي" variant="outlined" fullWidth value={studentName}
    onChange={(e) => setStudentName(e.target.value)} />
        
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>تاريخ الميلاد</p>
        <TextField
  required
  label="التاريخ"
  variant="outlined"
  size="small"
  type="date"  // Set the input type to "date"
  value={birthDate}
  onChange={(e) => setBirthDate(e.target.value)}
  InputLabelProps={{
    shrink: true, // Ensure the label doesn't overlap with the input field
  }}
/>

        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>محل الميلاد</p>
                            <TextField  required label="محل الميلاد" variant="outlined" size="small" value={placeOfBirth}
    onChange={(e) => setPlaceOfBirth(e.target.value)}/>
         
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>النوع</p>
        <select  required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
           
           <option value=".">  </option>
          <option value="ذكر">ذكر</option>
          <option value="أنثي">أنثي</option>
        </select>

        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>الديانة</p>
        <select  required
          value={religion}
    onChange={(e) => setReligion(e.target.value)}
        >
           
           <option value=".">  </option>
          <option value="مسلم">مسلم</option>
          <option value="مسيحي">مسيحي</option>
          <option value="أخري">اخري</option>

        </select>

      </div>

      <div className="input-group">
        <TextField  required label="محل الاقامة 'العنوان بالتفصيل' " variant="outlined" fullWidth  value={detailedAddress}
    onChange={(e) => setDetailedAddress(e.target.value)}/>
        
      </div>

      <div className="input-group">
        <TextField  required label="البريد الالكتروني" variant="outlined" fullWidth  value={email}
    onChange={(e) => setEmail(e.target.value)}/>
        
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>التليفون الارضي</p>
        <TextField  required label="الرقم " variant="outlined"size="small" value={landLinePhone}
    onChange={(e) => setLandLinePhone(e.target.value)} />
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>الهاتف المحمول</p>
                            <TextField  required label="الرقم" variant="outlined" size="small" value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)} />
         
      </div>
      {checkbox1Checked && ( <div className="input-group">
        <TextField  required label="اسم الاب رباعي" variant="outlined" fullWidth value={fatherName}
    onChange={(e) => setFatherName(e.target.value)} />
        
      </div>)}

      {checkbox1Checked && ( <div className="input-group">
      <p style={{ marginLeft: "10px" }}>الرقم القومي للاب</p>

                            <TextField  required label="الرقم القومي" variant="outlined"size="small"  value={fatherNationalId}
    onChange={(e) => setFatherNationalId(e.target.value)}/>
                            <p style={{ marginLeft: "10px" , marginRight: "40px" }}>وظيفة الاب</p>
                            <TextField  required label="الوظيفة " variant="outlined" size="small" value={fatherJop}
    onChange={(e) => setFatherJop(e.target.value)}/>
                            <p style={{ marginLeft: "10px" , marginRight: "40px" }}>تليفون الاب</p>
                            <TextField  required label=" الرقم" variant="outlined" size="small" value={fatherPhone}
    onChange={(e) => setFatherPhone(e.target.value)}/>

      </div>)}

      {checkbox1Checked && (<div className="input-group">
        <TextField  required label="اسم ولي الامر رباعي" variant="outlined" fullWidth  value={guardianName}
    onChange={(e) => setGuardianName(e.target.value)}/>
        <p style={{ marginLeft: "10px" }}>رقم ولي الامر</p>
        <TextField  required label="الرقم " variant="outlined"size="small" value={guardianPhone}
    onChange={(e) => setGuardianPhone(e.target.value)} />
      </div>)}

      {checkbox1Checked && (  <div className="input-group">
        <p style={{ marginLeft: "10px" }}>رقم القومي لولي الامر</p>
        <TextField  required label="الرقم " variant="outlined"size="small" value={guardianNationalId}
    onChange={(e) => setGuardianNationalId(e.target.value)} />
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>صلة ولي الامر</p>
                            <TextField  required label="الصلة" variant="outlined" size="small" value={guardianRelation}
    onChange={(e) => setGuardianRelation(e.target.value)} />
         
      </div>
      )}

{checkbox1Checked && (  <div className="input-group">
        <p style={{ marginLeft: "10px" }}>حالة تخص الوالدين</p>
        <select  required
          value={AsituationRelatedToTheParents}
          
    onChange={(e) => setAsituationRelatedToTheParents(e.target.value)}
        >
           
           <option value="option1">-----</option>
          <option value="وفاة الوالد">وفاة الوالد</option>
          <option value="وفاة الوالدين">وفاة الوالدين</option>
          <option value="انفصال الوالدين">انفصال الوالدين</option>
        </select> 
        </div>  )}

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>الكلية</p>
        <TextField  required label="الكلية " variant="outlined"size="small"  value={college}
    onChange={(e) => setCollege(e.target.value)}/>
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>الفرقة</p>
                            <TextField  required label="الفرقة" variant="outlined" size="small" value={grade}
    onChange={(e) => setGrade(e.target.value)}/>
         
      </div>
      <div className="input-group">
       
        <p style={{ marginLeft: "10px" }}>تقدير العام الماضي</p>
        <select  required
          value={gradeOfLastYear}
    onChange={(e) => setGradeOfLastYear(e.target.value)}
        >
           
           <option value=".">  </option>
          <option value="مقبول">مقبول</option>
          <option value="محمل بمواد">محمل بمواد</option>
          <option value="غياب بعذر"> غياب بعذر</option>
          <option value="منقول بمادة و بمادة ثانوية">منقول بمادة و بمادة ثانوية</option>
          <option value="ناجح">ناجح </option>
          <option value="جيد">جيد </option>
          <option value="جيد جدا">جيد جدا</option>
          <option value="ممتاز">ممتاز </option>
          <option value="منقول بمادة">منقول بمادة</option>
          <option value="منقول بمادتين">منقول بمادتين</option>
          <option value="راسب">راسب </option>
          <option value="دور تاني">دور تاني </option>
          <option value="منقول بمادتين و مادة فرعية">منقول بمادتين و مادة فرعية</option>

        </select>
        
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>نسبة التقدير</p>
                            <TextField  required label="النسبة %" variant="outlined" size="small" value={gradePercentage}
    onChange={(e) => setGradePercentage(e.target.value)}/>

      </div>
      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>السكن في الاعوام السابقة</p>
        <TextField  required label="قديم/مستجد/منقطع " variant="outlined"size="small"  value={housingInLastYears}
    onChange={(e) => setHousingInLastYears(e.target.value)}/>
        <p style={{ marginLeft: "10px" , marginRight: "100px" }}>نوع السكن</p>
                            <TextField  required label="قديم/مستجد/منقطع" variant="outlined" size="small" value={HousingType}
    onChange={(e) => setHousingType(e.target.value)}/>
                            <p style={{ marginLeft: "10px" , marginRight: "100px" }}> </p>
          <Checkbox  required 
          label="سكن بدون تغدية"
          checked={HousingWithoutFood}
          onChange={() => setHousingWithoutFood(!HousingWithoutFood)}
        />
      </div>
      {checkbox1Checked && ( <div className="input-group">
       
        <Checkbox  required style={{ marginLeft: "100px" , marginRight: "170px"}}
          label="الاسرة بالخارج"
          checked={ThefamilyIsOutside}
          onChange={() => setThefamilyIsOutside(!ThefamilyIsOutside)}
        /> <p style={{ marginLeft: "10px" , marginRight: "170px" }}/>
        <Checkbox  required style={{ marginLeft: "100px" , marginRight: "170px"}}
          label="ذوي احتياجات خاصة"
          checked={withSpecialNeeds}
          onChange={() => setWithSpecialNeeds(!withSpecialNeeds)}
        />
      </div>)}
      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>كلمة المرور</p>
        <TextField  required label="password" variant="outlined"size="small"   value={password}
    onChange={(e) => setPassword(e.target.value)}  />
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>تاكيد كلمة المرور</p>
                            <TextField  required label="Re enter password" variant="outlined" size="small"   value={confirmPassword}
    onChange={(e) => setConfirmPassword (e.target.value)}/>
         
      </div>
      
    </div>}


    {!displayDiv && <div style={{ marginTop: "10px" , marginBottom:"20px"}}  className="container">
    {/* <button className={displayDiv ? 'toggle-button active' : 'toggle-button'} onClick={handleButtonClick}>طلاب قدامي / مستجدين</button> */}

     
    <h1>طلاب مستجدين</h1>
    <p style={{ textAlign: 'right' }}>قم باختيار (قدامى/مستجدين) وملء بياناتك ثم الموافقة على الإقرار بالأسفل<br/>
مع ملاحظة ان الطلاب المستجدين هم طلاب الفرق الأولى أو الاعدادية، الطلاب القدامى هم طلاب مابعد الفرق الأولى أو الاعدادية</p>
     
      <div className="input-group">
        <Checkbox 
          label="مصري"
          checked={checkbox1Checked}
          onChange={handleCheckbox1Change}
        />
        <Checkbox 
          label="وافد"
          checked={checkbox2Checked}
          onChange={handleCheckbox2Change}
        />
      </div>

      {checkbox2Checked && ( <div className="input-group">
                                <p style={{ marginLeft: "10px" }}> رقم جواز السفر</p>

                            <TextField  required label="الرقم " variant="outlined"size="small" value={PassportNumber}
    onChange={(e) => setPassportNumber(e.target.value)} />
                            <p style={{ marginLeft: "10px" }}>جهة الصدور</p>

                      <TextField  required label="الدولة" variant="outlined"size="small" value={IssuingAuthority}
    onChange={(e) => setIssuingAuthority(e.target.value)} />                  
                      <p style={{ marginLeft: "10px" }}>الجنسية</p>

                      <TextField  required label="الجنسية" variant="outlined"size="small" value={nationality}
    onChange={(e) => setNationality(e.target.value)} />
      </div>)}

      {checkbox1Checked && ( <div className="input-group">
      <p style={{ marginLeft: "10px" }}>الرقم القومي</p>

                            <TextField  required label="الرقم القومي" variant="outlined"size="small" value={nationalID}
    onChange={(e) => setNationalID(e.target.value)} />
                         

      </div>)}

      <div className="input-group">
                            <p style={{ marginLeft: "10px"  }}>كود الطالب</p>
                            <TextField  required label="كود الطالب" variant="outlined" size="small" value={studentCode}
    onChange={(e) => setStudentCode(e.target.value)} />

      </div>
        
      <div className="input-group">
        <TextField  required label="الاسم رباعي" variant="outlined" fullWidth value={studentName}
    onChange={(e) => setStudentName(e.target.value)} />
        
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>تاريخ الميلاد</p>
        <TextField
  required
  label="التاريخ"
  variant="outlined"
  size="small"
  type="date"  // Set the input type to "date"
  value={birthDate}
  onChange={(e) => setBirthDate(e.target.value)}
  InputLabelProps={{
    shrink: true, // Ensure the label doesn't overlap with the input field
  }}
/>

        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>محل الميلاد</p>
                            <TextField  required label="محل الميلاد" variant="outlined" size="small" value={placeOfBirth}
    onChange={(e) => setPlaceOfBirth(e.target.value)}/>
         
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>النوع</p>
        <select  required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
           
           <option value=".">  </option>
          <option value="ذكر">ذكر</option>
          <option value="أنثي">أنثي</option>
        </select>

        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>الديانة</p>
        <select  required
          value={religion}
    onChange={(e) => setReligion(e.target.value)}
        >
           
           <option value=".">  </option>
          <option value="مسلم">مسلم</option>
          <option value="مسيحي">مسيحي</option>
          <option value="أخري">اخري</option>

        </select>

      </div>

      <div className="input-group">
        <TextField  required label="محل الاقامة 'العنوان بالتفصيل' " variant="outlined" fullWidth  value={detailedAddress}
    onChange={(e) => setDetailedAddress(e.target.value)}/>
        
      </div>

      <div className="input-group">
        <TextField  required label="البريد الالكتروني" variant="outlined" fullWidth  value={email}
    onChange={(e) => setEmail(e.target.value)}/>
        
      </div>

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>التليفون الارضي</p>
        <TextField  required label="الرقم " variant="outlined"size="small" value={landLinePhone}
    onChange={(e) => setLandLinePhone(e.target.value)} />
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>الهاتف المحمول</p>
                            <TextField  required label="الرقم" variant="outlined" size="small" value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)} />
         
      </div>
      {checkbox1Checked && ( <div className="input-group">
        <TextField  required label="اسم الاب رباعي" variant="outlined" fullWidth value={fatherName}
    onChange={(e) => setFatherName(e.target.value)} />
        
      </div>)}

      {checkbox1Checked && ( <div className="input-group">
      <p style={{ marginLeft: "10px" }}>الرقم القومي للاب</p>

                            <TextField  required label="الرقم القومي" variant="outlined"size="small"  value={fatherNationalId}
    onChange={(e) => setFatherNationalId(e.target.value)}/>
                            <p style={{ marginLeft: "10px" , marginRight: "40px" }}>وظيفة الاب</p>
                            <TextField  required label="الوظيفة " variant="outlined" size="small" value={fatherJop}
    onChange={(e) => setFatherJop(e.target.value)}/>
                            <p style={{ marginLeft: "10px" , marginRight: "40px" }}>تليفون الاب</p>
                            <TextField  required label=" الرقم" variant="outlined" size="small" value={fatherPhone}
    onChange={(e) => setFatherPhone(e.target.value)}/>

      </div>)}

      {checkbox1Checked && (<div className="input-group">
        <TextField  required label="اسم ولي الامر رباعي" variant="outlined" fullWidth  value={guardianName}
    onChange={(e) => setGuardianName(e.target.value)}/>
        <p style={{ marginLeft: "10px" }}>رقم ولي الامر</p>
        <TextField  required label="الرقم " variant="outlined"size="small" value={guardianPhone}
    onChange={(e) => setGuardianPhone(e.target.value)} />
      </div>)}

      {checkbox1Checked && (  <div className="input-group">
        <p style={{ marginLeft: "10px" }}>رقم القومي لولي الامر</p>
        <TextField  required label="الرقم " variant="outlined"size="small" value={guardianNationalId}
    onChange={(e) => setGuardianNationalId(e.target.value)} />
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>صلة ولي الامر</p>
                            <TextField  required label="الصلة" variant="outlined" size="small" value={guardianRelation}
    onChange={(e) => setGuardianRelation(e.target.value)} />
         
      </div>
      )}

{checkbox1Checked && (  <div className="input-group">
        <p style={{ marginLeft: "10px" }}>حالة تخص الوالدين</p>
        <select  required
          value={AsituationRelatedToTheParents}
          
    onChange={(e) => setAsituationRelatedToTheParents(e.target.value)}
        >
           
           <option value=".">-----</option>
          <option value="وفاة الوالد">وفاة الوالد</option>
          <option value="وفاة الوالدين">وفاة الوالدين</option>
          <option value="انفصال الوالدين">انفصال الوالدين</option>
        </select> 
        </div>  )}

      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>الكلية</p>
        <TextField  required label="الكلية " variant="outlined"size="small"  value={college}
    onChange={(e) => setCollege(e.target.value)}/>
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>الفرقة</p>
                            <TextField  required label="الفرقة" variant="outlined" size="small" value={grade}
    onChange={(e) => setGrade(e.target.value)}/>
         
      </div>

      <div  className="input-group">
        <p style={{ marginLeft: "10px"  }}>شعبة الثانوية العامة</p>
        <select required
          value={HighSchoolDivision}
          onChange={(e) => setHighSchoolDivision(e.target.value)}
        >
          <option value=".">  </option>
          <option value="علمي علوم">علمي علوم</option>
          <option value="علمي رياضة">علمي رياضة</option>
          <option value="ادبي">  ادبي</option>
          <option value="أزهري علمي">أزهري علمي</option>
          <option value="أزهري ادبي ">أزهري ادبي </option>
          <option value="معاهد فنية ثلاث سنوات ">معاهد فنية ثلاث سنوات </option>
          <option value="معاهد فنية اربع سنوات ">معاهد فنية اربع سنوات </option>
          <option value="معاهد فنية خمس سنوات ">معاهد فنية خمس سنوات </option>
          <option value="دبلومة فنية">دبلومة فنية</option>
          <option value="شهادات معادلة">شهادات معادلة</option>
          <option value="مدارس STEM للعلوم و التكنولوجيا ">مدارس STEM للعلوم و التكنولوجيا </option>
          <option value="مدارس النيل للعلوم و التكنولوجيا ">مدارس النيل للعلوم و التكنولوجيا </option>
          <option value="تحويل ورقي">تحويل ورقي</option>

        </select>
        {checkbox1Checked && (<div> <p style={{ marginLeft: "10px", marginRight :"170px"  }}/>
        <Checkbox  required
          label="الثانوية العامة من الخارج"
          checked={HighSchoolFromAbroad}
          onChange={() => setHighSchoolFromAbroad(!HighSchoolFromAbroad)}
        /> </div>)}
        </div>

      
        <div className="input-group">
        <p style={{ marginLeft: "10px" }}>مجموع الثانوية العامة</p>
                            <TextField required label="المجموع" variant="outlined" size="small"  value={HighSchoolGrade}
          onChange={(e) => setHighSchoolGrade(e.target.value)}/>
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>نسبة التقدير</p>
                            <TextField required label="النسبة %" variant="outlined" size="small"  value={HighSchoolPercentage}
          onChange={(e) => setHighSchoolPercentage(e.target.value)}/>

      </div>
      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>نوع السكن</p>
        <TextField  required label="قديم/مستجد/منقطع" variant="outlined" size="small" value={HousingType}
    onChange={(e) => setHousingType(e.target.value)}/>
                            <p style={{ marginLeft: "10px" , marginRight: "100px" }}> </p>
          <Checkbox  required 
          label="سكن بدون تغدية"
          checked={HousingWithoutFood}
          onChange={() => setHousingWithoutFood(!HousingWithoutFood)}
        />
      </div>
      {checkbox1Checked && ( <div className="input-group">
       
        <Checkbox  required style={{ marginLeft: "100px" , marginRight: "170px"}}
          label="الاسرة بالخارج"
          checked={ThefamilyIsOutside}
          onChange={() => setThefamilyIsOutside(!ThefamilyIsOutside)}
        /> <p style={{ marginLeft: "10px" , marginRight: "170px" }}/>
        <Checkbox  required style={{ marginLeft: "100px" , marginRight: "170px"}}
          label="ذوي احتياجات خاصة"
          checked={withSpecialNeeds}
          onChange={() => setWithSpecialNeeds(!withSpecialNeeds)}
        />
      </div>)}
      <div className="input-group">
        <p style={{ marginLeft: "10px" }}>كلمة المرور</p>
        <TextField  required label="password" variant="outlined"size="small"   value={password}
    onChange={(e) => setPassword(e.target.value)}  />
        <p style={{ marginLeft: "10px" , marginRight: "170px" }}>تاكيد كلمة المرور</p>
                            <TextField  required label="Re enter password" variant="outlined" size="small"   value={confirmPassword}
    onChange={(e) => setConfirmPassword (e.target.value)}/>
         
      </div>
      
    </div>}
    <div style={{textAlign:"right" , backgroundColor:"#FFEBA4",border:"solid 1px" ,margin:"auto", padding:"30px" ,borderRadius: "25px",width:"auto"}}>
      <h5>ملحوظات هامة</h5>
      <ul>
        <li>التقدم للمدن الجامعية من خلال استمارة التقديم الالكترونى مجانى بالكامل</li>
        <li>يجب الاحتفاظ بكلمة المرور لأهميتها فى تعديل بياناتك كما سيتم استخدامها لاحقا عند إقامتك بالمدينة</li>
        <li>لوحظ أن العديد من الطلاب يختارون السكن المميز ويجب الإشارة بأن السكن المميز له تكلفة عالية بالنسبة للسكن العادى</li>
        <li>ذوى الاحتياجات الخاصة لا يدخل فى التنسيق</li>
      </ul>
    </div>

       <div style={{ marginTop:"20px" ,margin:"auto" , marginBottom:"20px"}}>
       <Checkbox 
       required
          label="أقر بأن البيانات (محل الإقامة - التقدير - الفرقة/الكلية) صحيحة طبقاً للأوراق الرسمية على أن أقدم هذه الأوراق عند حضوري للمدينة في حالة القبول وإذا ثبت أي خطأ في البيانات يتم تحويلي للشئون القانونية وفصلي نهائياً من المدينة"
          checked={policy}
          onChange={() => setPolicy(!policy)}
          />
       </div>



    <div style={{marginTop:"20px" , margin: 'auto', width: '40%' }}>
                    <Button  onClick={handleSubmit}  type="submit" variant="contained" color="primary" >التقديم للمدن</Button></div>

    </div>
  );
};

export default App;
