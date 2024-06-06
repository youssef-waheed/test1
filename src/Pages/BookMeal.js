import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [ofYear, setOfYear] = useState("");
  const [ofWhichMeal, setOfWhichMeal] = useState("");
  const [dateOfReceivingMeals, setDateOfReceivingMeals] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("ofYear", ofYear);
      formData.append("ofWhichMeal", ofWhichMeal);
      formData.append("dateOfReceivingMeals", dateOfReceivingMeals);

      const response = await axios.post(
        "http://localhost:5000/applications/bookMealExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file. Please try again.");
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 6; i <= currentYear + 1; i++) {
      years.push(i);
    }
    return years.map((year) => (
      <option key={year} value={`${year}-${year + 1}`}>{`${year}-${
        year + 1
      }`}</option>
    ));
  };

  return (
    <div>
      <div className="two-column-wrapper">
        <div className="col">
          {errorMessage && <p>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div>

              <label htmlFor="avatar">Select Excel file:</label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept=".xlsx"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label htmlFor="ofYear">Year Range:</label>
              <select
                id="ofYear"
                name="ofYear"
                value={ofYear}
                onChange={(e) => setOfYear(e.target.value)}
              >

                {generateYearOptions()}
              </select>
            </div>
            <div>

              <label htmlFor="ofWhichMeal">Meal Type:</label>
              <select
                id="ofWhichMeal"
                name="ofWhichMeal"
                value={ofWhichMeal}
                onChange={(e) => setOfWhichMeal(e.target.value)}
              >
                {/* <option value="breakfast">Breakfast</option> */}
                <option value="غداء"> غداء</option>
                <option value="عشاء"> عشاء</option>
                <option value="فطار"> فطار</option>
                <option value="سحور"> سحور</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateOfReceivingMeals">
                Date of Receiving Meals:
              </label>
              <input
                type="date"
                id="dateOfReceivingMeals"
                name="dateOfReceivingMeals"
                value={dateOfReceivingMeals}
                onChange={(e) => setDateOfReceivingMeals(e.target.value)}
              />

            </div>
            <br></br>
            <button
            style={{ backgroundColor: "green", color:"white", borderRadius:"5px"}}
            
            type="submit">رفع</button>
          </form>
        </div>

        <div className="coll">
          <p>يجب التاكد من تاريخ تسليم الوجبات</p>
          <p>يجب اختيار الوجبة الجاري تسليمها</p>
          <p>الامتداد المسموح به هو xlsx</p>
          <p>
            يجب ان يحتوي الملف علي الارقام القومية للطلاب في اول عمود في اول
            صفحة من الملف
          </p>
          <p>
            {" "}
            بعد رفع الملف يتم الضغط علي زر Upload ثم يظهر تقرير بعدد الطلاب
            المستحقين للوجبة و قد تم تسجيل استلامهم للوجبة و يظهر تقرير بالاخطاء
          </p>

        </div>
      </div>
    </div>
  );
}

export default FileUpload;
