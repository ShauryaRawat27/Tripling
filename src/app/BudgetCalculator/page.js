"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const BudgetCalculator = () => {
  const [budgetItems, setBudgetItems] = useState([]);
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const CATEGORIES = ["Food", "Transport", "Miscellaneous", "Entertainment", "Shopping"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

  const handleAddExpense = () => {
    if (!amount.trim()) return;

    const updatedBudget = [...budgetItems];
    const existingCategory = updatedBudget.find((item) => item.category === category);

    if (existingCategory) {
      // If category exists, update its amount
      existingCategory.amount += Number(amount);
    } else {
      // If category is new, add it to the array
      updatedBudget.push({ category, amount: Number(amount) });
    }

    setBudgetItems(updatedBudget);
    setAmount("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Budget Calculator</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Category Dropdown */}
        <select
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Add Expense Button */}
        <button 
          className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>

      {/* Pie Chart */}
      {budgetItems.length > 0 && (
        <div className="mt-8 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Budget Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetItems}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {budgetItems.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[CATEGORIES.indexOf(item.category) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;
