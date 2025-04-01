"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Home } from "lucide-react";
import Image from "next/image";

const BudgetCalculator = () => {
  const router = useRouter();
  const goHome = () => router.push('/');

  const [budgetItems, setBudgetItems] = useState([]);
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [totalBudget, setTotalBudget] = useState(0);

  const CATEGORIES = ["Food", "Transport", "Miscellaneous", "Entertainment", "Shopping"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

  const handleAddExpense = () => {
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) return;

    const updatedBudget = [...budgetItems];
    const existingCategory = updatedBudget.find((item) => item.category === category);
    const amountNumber = Number(amount);

    if (existingCategory) {
      existingCategory.amount += amountNumber;
    } else {
      updatedBudget.push({ category, amount: amountNumber });
    }

    setBudgetItems(updatedBudget);
    setAmount("");
    setTotalBudget(prevTotal => prevTotal + amountNumber);
  };

  const handleDeleteItem = (categoryToDelete) => {
    const itemToDelete = budgetItems.find(item => item.category === categoryToDelete);
    const newTotal = totalBudget - itemToDelete.amount;

    setBudgetItems(budgetItems.filter(item => item.category !== categoryToDelete));
    setTotalBudget(newTotal);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.amount / totalBudget) * 100).toFixed(1);

      return (
        <div className="bg-gray-800 p-3 rounded shadow-lg border border-gray-700">
          <p className="font-semibold">{data.category}</p>
          <p className="text-sm">₹{data.amount.toFixed(2)}</p>
          <p className="text-xs text-gray-300">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-transparent text-white p-6 relative">
      <Image
        src="/one.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="z-[-40] bg-black opacity-40"
      />
      <div className="w-full max-w-4xl my-auto z-10">
        <h1 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Budget Calculator
        </h1>
        <p className="text-gray-400 text-center mb-8">Track and visualize your expenses</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Input Form */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                <select
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddExpense();
                  }}
                />
              </div>

              <button
                className="w-full bg-blue-600 p-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition"
                onClick={handleAddExpense}
              >
                Add Expense
              </button>
            </div>
          </div>

          {/* Chart and Summary */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 md:col-span-2">
            {budgetItems.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Budget Breakdown</h2>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Budget</p>
                    <p className="text-2xl font-bold">₹{totalBudget.toFixed(2)}</p>
                  </div>
                </div>
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
                      labelLine={false}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                        return percent > 0.05 ? (
                          <text
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={12}
                            fontWeight="bold"
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        ) : null;
                      }}
                    >
                      {budgetItems.map((item, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[CATEGORIES.indexOf(item.category) % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-400">No expenses yet</h3>
                <p className="text-gray-500 mt-2">Add an expense to see your budget breakdown</p>
              </div>
            )}
          </div>
        </div>

        {/* Expense Table */}
        {budgetItems.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Expense Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 px-4">Category</th>
                    <th className="text-right py-2 px-4">Amount</th>
                    <th className="text-right py-2 px-4">Percentage</th>
                    <th className="text-right py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4 flex items-center">
                        <span
                          className="inline-block w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor:
                              COLORS[CATEGORIES.indexOf(item.category) % COLORS.length],
                          }}
                        ></span>
                        {item.category}
                      </td>
                      <td className="text-right py-3 px-4">₹{item.amount.toFixed(2)}</td>
                      <td className="text-right py-3 px-4">
                        {((item.amount / totalBudget) * 100).toFixed(1)}%
                      </td>
                      <td className="text-right py-3 px-4">
                        <button
                          onClick={() => handleDeleteItem(item.category)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ✅ Home Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={goHome}
            className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
