import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({});

  const handleSubmit = async () => {
    await axios.post("https://expense-manager-mern-cwu6.onrender.com/api/register", form);
    alert("Registered");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})}/>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}