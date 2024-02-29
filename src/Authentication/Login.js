import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const App = () => {
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = {
      nationalID: nationalId,
      password: password
    };

    try {
      console.log(data);
      const response = await axios.post("http://localhost:5000/auth/signIn", data);
      if (response.status === 200) {
        console.log("Login successful!");
        console.log("Token:", response.data.token);
        setError(""); // Clear any previous error
        navigate('/Admin');
      } else {
        throw new Error("Login failed"); 
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid national ID or password");
    }
  };

  return (
    <div className="login-form">
      <div className="login-container">
        <div className="signup-container">
          <div className="header">الزهراء لادارة المدن الجامعية</div>
          <TextField 
            label="الرقم القومي"  
            value={nationalId} 
            onChange={(e) => setNationalId(e.target.value)} 
            variant="outlined" 
            fullWidth 
          />
          <TextField
            label="كلمة المرور"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <div className="center-stuff">
            <Button variant="contained" color="primary" onClick={handleLogin}>
              تسجيل الدخول
            </Button>
            {error && <div className="error-message">{error}</div>}
            <div>
              <Link to="/AppForm" className="link">التقدم للمدن الجامعية</Link>
            </div>
          </div>
        </div>

        <div className="footer">
          جميع الحقوق محفوظة لكلية الحاسبات والذكاء الاصطناعي - جامعة حلوان
        </div>
      </div>
    </div>
  );
};

export default App;
