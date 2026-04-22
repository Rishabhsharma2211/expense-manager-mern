import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  // Fetch expenses
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      console.log(res.data); // 👈 check data
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add expense
  const addExpense = async () => {
    try {
      await axios.post("http://localhost:5000/api/expense", form, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      alert("Expense Added");
      fetchData(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* ✅ Add Expense Form */}
      <input
        placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Amount"
        type="number"
        onChange={e => setForm({ ...form, amount: e.target.value })}
      />
      <input
        placeholder="Category"
        onChange={e => setForm({ ...form, category: e.target.value })}
      />
      <button onClick={addExpense}>Add</button>

      {/* ✅ Expense List */}
      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        expenses.map(e => (
          <div key={e._id}>
            {e.title} - ₹{e.amount} ({e.category})
          </div>
        ))
      )}
    </div>
  );
}