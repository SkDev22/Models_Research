import React, { useState } from "react";
import axios from "axios";
import {
  DatePicker,
  Button,
  Card,
  Table,
  message,
  Spin,
  Typography,
} from "antd";
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

const { Title, Paragraph } = Typography;

const PredictionDashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predicted, setPredicted] = useState(false);

  const handlePredict = async () => {
    if (!startDate) {
      message.warning("Please select a start date.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/predict", {
        start_date: startDate.format("YYYY-MM-DD"),
      });
      setForecastData(response.data.forecast);
      setPredicted(true);
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
    <div className="space-y-6">
      <Card title="📅 Forecast Future Bookings and Revenue">
        <div className="flex items-center gap-4 mb-4">
          <DatePicker onChange={setStartDate} className="w-60" />
          <Button type="primary" onClick={handlePredict} loading={loading}>
            Predict
          </Button>
        </div>

        {!predicted && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <Title level={4}>Welcome to the Booking Forecast Dashboard</Title>
            <Paragraph>
              This tool helps you forecast daily room bookings and expected
              revenue for the next 30 days, starting from a selected date. Use
              the date picker above to select a future date and click "Predict"
              to view visualized trends, revenue charts, and booking tables.
            </Paragraph>
            <Paragraph>
              Forecasts are generated using machine learning models trained on
              historical booking patterns, optimized for academic and seasonal
              cycles.
            </Paragraph>
          </div>
        )}

        {loading ? (
          <Spin tip="Generating forecast..." />
        ) : (
          forecastData.length > 0 && (
            <div className="space-y-8">
              <Card className="text-lg">
                <div className="flex justify-between gap-2">
                  <div className="bg-sky-100 w-[400px] py-5 rounded-md flex flex-col gap-2 justify-center text-center">
                    <h1 className="text-xl">Total Bookings</h1>
                    <h1 className="text-lg">
                      <strong>{totalBookings}</strong>
                    </h1>
                  </div>
                  <div className="bg-green-100 w-[400px] py-5 rounded-md flex flex-col gap-2 justify-center text-center">
                    <h1 className="text-xl">Total Revenue (LKR)</h1>
                    <h1 className="text-lg">
                      <strong>{totalRevenue.toLocaleString()}</strong>
                    </h1>
                  </div>
                  <div className="bg-red-100 w-[400px] py-5 rounded-md flex flex-col gap-2 justify-center text-center">
                    <h1 className="text-xl">Peak Booking Day</h1>
                    <h1 className="text-lg">
                      <strong>{peakDay.date}</strong>
                    </h1>
                    <h1 className="text-md">
                      ({peakDay.predicted_bookings} bookings)
                    </h1>
                  </div>
                </div>
              </Card>
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
            </div>
          )
        )}
      </Card>
    </div>
  );
};

export default PredictionDashboard;
