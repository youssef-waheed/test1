import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages/ClassificationGeneral.css';
import Nums from '../Pages/Nums';

const ClassificationGeneral = () => {
    const [rules, setRules] = useState([]);
    const [newRule, setNewRule] = useState({});
    const [maleClassifiedStudents, setMaleClassifiedStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ofYear, setOfYear] = useState('');
    const [limit, setLimit] = useState(10);
    const [selectedRule, setSelectedRule] = useState(null); 
    const [ruleId, setRuleId] = useState('');
    const [formData, setFormData] = useState({
        forWho: '',
        housingType: '',
        natonality: '',
        oldOrNew: '',
        housingInLastYears: '',
        distanceRank: '',
        gradeRank: '',
        gradePercentageRank: '',
        HighSchoolGradeRank: '',
        housingInLastYearsRank: '',
        yearRank: ''
    });
    const [ignoreCriteria, setIgnoreCriteria] = useState({
      distanceRank: false,
        gradeRank: false,
        gradePercentageRank: false,
        HighSchoolGradeRank: false,
        housingInLastYearsRank: false,
        yearRank: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleIgnoreChange = (e) => {
      const { name, checked } = e.target;
      setIgnoreCriteria(prevState => ({
        ...prevState,
        [name]: checked
      }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                ...formData,
                ...ignoreCriteria
            };
            await axios.get('http://localhost:5000/classifyStudents/addClassificationRule', {
                data: requestData
            });
            fetchRules(); // Fetch rules again to update the rules list
        } catch (error) {
            console.error('Error adding rule:', error);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    const translations = {
        distanceRank: "البعد",
        gradeRank: "التقدير",
        gradePercentageRank: "نسبة التقدير",
        housingInLastYearsRank: "سكن العام الماضي",
        yearRank: "الفرقة الاكبر",
        HighSchoolGradeRank: "نسبة الثانوية العامة"
    };

    const fetchRules = async () => {
        try {
            const response = await axios.get('http://localhost:5000/classifyStudents/getRules');
            setRules(response.data.data.rules);
        } catch (error) {
            console.error('Error fetching rules:', error);
        }
    };

    const addRule = async () => {
      try {
          const response = await axios.post('http://localhost:5000/classifyStudents/addClassificationRule', {
              forWho: formData.forWho,
              natonality: formData.natonality,
              oldOrNew: formData.oldOrNew,
              housingType: formData.housingType,
              housingInLastYears: formData.housingInLastYears,
              distanceRank: formData.distanceRank,
              gradeRank: formData.gradeRank,
              gradePercentageRank: formData.gradePercentageRank,
              HighSchoolGradeRank: formData.HighSchoolGradeRank,
              housingInLastYearsRank: formData.housingInLastYearsRank,
              yearRank: formData.yearRank,
              ignoreCriteria: ignoreCriteria // Include ignoreCriteria data
          });
          fetchRules(); // Fetch rules again to update the rules list
      } catch (error) {
          console.error('Error adding rule:', error);
      }
  };
  

    const classifyStudents = async (ruleId) => { // Accept ruleId as parameter
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/classifyStudents/classifyFemale/${ruleId}?limit=${limit}&ofYear=${ofYear}`);
            const responseData = response.data.data;
            if (responseData) {
                const updatedStudents = responseData.updatedStudents || [];
                setMaleClassifiedStudents(updatedStudents);
            } else {
                console.error('Error: Response data is null or undefined');
            }
            setIsLoading(false);
            console.log(ofYear);
            console.log(limit);
            console.log(response);
        } catch (error) {
            console.error('Error classifying students:', error);
            setIsLoading(false);
        }
    };

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear - 6; i <= currentYear; i++) {
            years.push(i);
        }
        return years.map((year) => (
            <option key={year} value={`${year}-${year + 1}`}>{`${year}-${year + 1}`}</option>
        ));
    };

    return (
        <div className="two-column-wrapper">
            <div className='col'>
                <label htmlFor="ofYear">العام الاكاديمي :</label>
                <select id="ofYear" name="ofYear" value={ofYear} onChange={(e) => setOfYear(e.target.value)}>
                    {generateYearOptions()}
                </select>
                <label htmlFor="limit">عدد السطور :</label>
                <Nums value={limit} onChange={setLimit} />
                <section className="classification-rules">
                    <h2>قواعد التنسيق</h2>
                    <div className="rules-list">
                        {rules.map(rule => (
                            <div key={rule._id} className="rule" onClick={() => { setSelectedRule(rule); setRuleId(rule._id); }}>
                                <p>{rule.forWho}</p>
                            </div>
                        ))}
                    </div>
                    <div className="add-rule-form">
                        <h3>اضافة</h3>

                        <form >
                            <input type="text" name="forWho" value={formData.forWho} onChange={handleChange} placeholder="اسم القاعدة" />
                            <input type="text" name="housingType" value={formData.housingType} onChange={handleChange} placeholder="نوع السكن بالتفصيل" />
                            <p>الجنسية</p>
                            <select name="natonality" value={formData.natonality} onChange={handleChange}>
                            <option value="">_____ </option>
                                <option value="مصري">مصري </option>
                                <option value="وافد"> وافد</option>
                            </select>
                            <p>قدم الطالب</p>
                            <select name="oldOrNew" value={formData.oldOrNew} onChange={handleChange}>
                            <option value="">_____ </option>
 <option value="قديم">قديم </option>
                                <option value="جديد"> جديد</option>
                            </select>
                            <p>السكن في السنين الماضية</p>
                            <select name="housingInLastYears" value={formData.housingInLastYears} onChange={handleChange}>
                            <option value="">_____ </option>
 <option value="قديم">قديم </option>
                                <option value="مستجد"> مستجد </option>
                                <option value="منقطع"> منقطع </option>
                            </select>
                            <div>
    <input type="number" name="distanceRank" value={formData.distanceRank} onChange={handleChange} placeholder="البعد" disabled={ignoreCriteria.distanceRank} />
    <input type="checkbox" name="distanceRank" checked={ignoreCriteria.distanceRank} onChange={handleIgnoreChange} />
    {/* Repeat for other criteria */}
    <input type="number" name="yearRank" value={formData.yearRank} onChange={handleChange} placeholder="الفرقة الاكبر" disabled={ignoreCriteria.yearRank} />
    <input type="checkbox" name="yearRank" checked={ignoreCriteria.yearRank} onChange={handleIgnoreChange} />
  
    <input type="number" name="gradeRank" value={formData.gradeRank} onChange={handleChange} placeholder="التقدير" disabled={ignoreCriteria.gradeRank} />
    <input type="checkbox" name="gradeRank" checked={ignoreCriteria.gradeRank} onChange={handleIgnoreChange} />
  
    <input type="number" name="gradePercentageRank" value={formData.gradePercentageRank} onChange={handleChange} placeholder="نسبة التقدير" disabled={ignoreCriteria.gradePercentageRank} />
    <input type="checkbox" name="gradePercentageRank" checked={ignoreCriteria.gradePercentageRank} onChange={handleIgnoreChange} />
  
    <input type="number" name="housingInLastYearsRank" value={formData.housingInLastYearsRank} onChange={handleChange} placeholder="سكن العام الماضي" disabled={ignoreCriteria.housingInLastYearsRank} />
    <input type="checkbox" name="housingInLastYearsRank" checked={ignoreCriteria.housingInLastYearsRank} onChange={handleIgnoreChange} />
  
    <input type="number" name="HighSchoolGradeRank" value={formData.HighSchoolGradeRank} onChange={handleChange} placeholder="نسبة الثانوية العامة" disabled={ignoreCriteria.HighSchoolGradeRank} />
    <input type="checkbox" name="HighSchoolGradeRank" checked={ignoreCriteria.HighSchoolGradeRank} onChange={handleIgnoreChange} />
</div>



                        </form>

                        <button onClick={addRule}>Add Rule</button>
                    </div>
                </section>
            </div>
            <div className='coll'>
              <h1>عند اضافة علامة صحيح علي احد اساليب الحكم علي الافضلية في التنسيق عند اضافة قاعدة تنسيق جديدة اسفل الصفحة لن يتم الاخذ بتلك المعلم عليها ب الصحيح </h1>
<p>__________________________</p>                <section className="male-classification">

                    {selectedRule && (
                        <div>
                            <h2>الترتيب ب</h2>
                            <div>
                                {Object.entries(selectedRule)
                                    // Filter out properties that don't have a rank (number) and exclude '__v' property
                                    .filter(([key, value]) => typeof value === 'number' && key !== '__v')
                                    // Sort properties by their ranks
                                    .sort((a, b) => a[1] - b[1])
                                    // Map and render each property with its Arabic translation
                                    .map(([key, value], index, array) => (
                                        <span key={key}>
                                            {`${translations[key]}: ${value}`}
                                            {index < array.length - 1 && ' --> '} {/* Add arrow separator for all properties except the last one */}
                                        </span>
                                    ))}
                                <div>
                                    {maleClassifiedStudents.length > 0 && selectedRule && (
                                        <p>تم قبول عدد: {maleClassifiedStudents.length} طالب من {selectedRule.forWho}</p>
                                    )}

                                </div>
                            </div>



                            <div>
                                <button onClick={() => classifyStudents(selectedRule._id)}>ترتيب</button>
                            </div>


                        </div>
                    )}
                    <div className="classified-students">
                        {isLoading ? <p>Loading...</p> : (
                            <ul>
                                {maleClassifiedStudents.map(student => (
                                    <li key={student.id}>
                                        {/* Render details of classified male students */}
                                        <span>{student.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClassificationGeneral;
