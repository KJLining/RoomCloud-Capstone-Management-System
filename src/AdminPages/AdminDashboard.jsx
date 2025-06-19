import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#FFBB28", "#00C49F"];

function AdminDashboard() {
  const [counts, setCounts] = useState({
    files: 0,
    users: 0,
    pending: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost/roomcloud/getDashboardStats.php")
      .then((res) => {
        console.log("Stats:", res.data); // ✅ Log response
        setCounts(res.data);
      })
      .catch((err) => console.error("Dashboard stats fetch error:", err));
  }, []);

  const pieData = [
    { name: "Approved Files", value: counts.files },
    { name: "Pending Files", value: counts.pending },
  ].filter((entry) => entry.value > 0); // ✅ Only show non-zero entries

  const barData = [
    { name: "Users", value: counts.users },
    { name: "Files", value: counts.files },
    { name: "Pending", value: counts.pending },
  ];

  return (
    <>
      {/* Summary Cards */}
      <div className="d-flex flex-row m-5 gap-4">
        <div className="card bg-primary w-25">
          <div className="card-header">
            <h3 className="fw-bold text-white">Files</h3>
          </div>
          <div className="card-body">
            <h1 className="fw-bold text-white">{counts.files}</h1>
          </div>
        </div>
        <div className="card bg-success w-25">
          <div className="card-header">
            <h3 className="fw-bold text-white">Users</h3>
          </div>
          <div className="card-body">
            <h1 className="fw-bold text-white">{counts.users}</h1>
          </div>
        </div>
        <div className="card bg-warning w-25">
          <div className="card-header">
            <h3 className="fw-bold text-white">Pending</h3>
          </div>
          <div className="card-body">
            <h1 className="fw-bold text-white">{counts.pending}</h1>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row row-cols-2 px-5">
        <div className="col-6">
          <h4 className="mb-3">Document Summary (Pie Chart)</h4>
          <div style={{ width: "100%", height: 300 }}>
            {pieData.length === 0 ? (
              <p>No data to display</p>
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="col-6">
          <h4 className="mb-3">Analytics (Bar Graph)</h4>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
