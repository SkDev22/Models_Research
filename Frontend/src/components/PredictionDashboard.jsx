import React, { useState } from "react";
import axios from "axios";
import { DatePicker, Button, Card, Table, message, Spin } from "antd";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import dayjs from 'dayjs';

const PredictionDashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!startDate) {
      message.warning("Please select a start date.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/predict", {
        start_date: startDate.format("YYYY-MM-DD"),
      });
      setForecastData(response.data.forecast);
    } catch (error) {
      message.error("Failed to fetch prediction data.", error);
    } finally {
      setLoading(false);
    }
  };

  const totalBookings = forecastData.reduce(
    (acc, cur) => acc + cur.predicted_bookings,
    0
  );
  const totalRevenue = forecastData.reduce(
    (acc, cur) => acc + cur.predicted_revenue,
    0
  );
  const peakDay = forecastData.reduce(
    (prev, current) =>
      current.predicted_bookings > prev.predicted_bookings ? current : prev,
    { predicted_bookings: 0 }
  );

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Bookings", dataIndex: "predicted_bookings", key: "bookings" },
    { title: "Revenue (LKR)", dataIndex: "predicted_revenue", key: "revenue" },
  ];

  return (
    <div className="p-6 space-y-6">
      <Card title="📅 Forecast Future Bookings and Revenue">
        <div className="flex items-center gap-4 mb-4">
          <DatePicker onChange={setStartDate} className="w-60" />
          <Button type="primary" onClick={handlePredict} loading={loading}>
            Predict
          </Button>
        </div>
        {loading ? (
          <Spin tip="Generating forecast..." />
        ) : (
          forecastData.length > 0 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="📈 Forecasted Bookings">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={forecastData}>
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="predicted_bookings"
                        stroke="#1890ff"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card title="💰 Forecasted Revenue">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={forecastData}>
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="predicted_revenue" fill="#52c41a" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              <Card title="📋 Forecast Table">
                <Table
                  dataSource={forecastData}
                  columns={columns}
                  pagination={{ pageSize: 10 }}
                  rowKey="date"
                />
              </Card>

              <Card title="📊 Summary" className="text-lg">
                <p>
                  Total Bookings: <strong>{totalBookings}</strong>
                </p>
                <p>
                  Total Revenue (LKR):{" "}
                  <strong>{totalRevenue.toLocaleString()}</strong>
                </p>
                <p>
                  📌 Peak Booking Day: <strong>{peakDay.date}</strong> (
                  {peakDay.predicted_bookings} bookings)
                </p>
              </Card>
            </div>
          )
        )}
      </Card>
    </div>
  );
};

export default PredictionDashboard;
