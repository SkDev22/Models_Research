import React, { useState } from "react";
import { Layout, Menu, Input, Card, Avatar, Spin, message } from "antd";
import {
  BarChart2,
  Calendar,
  MessageSquare,
  PieChart,
  User,
  Search,
} from "lucide-react";
import axios from "axios";
import { DatePicker, Button } from "antd";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "antd/dist/reset.css";
// import dayjs from 'dayjs';

const { Header, Content, Sider } = Layout;

const ModernDashboard = () => {
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
      const response = await axios.post("http://localhost:5000/api/predict", {
        start_date: startDate.format("YYYY-MM-DD"),
      });
      setForecastData(response.data.forecast);
    } catch (error) {
      message.error("Prediction failed.", error);
    } finally {
      setLoading(false);
    }
  };

  const totalBookings = forecastData.reduce(
    (sum, d) => sum + d.predicted_bookings,
    0
  );
  const totalRevenue = forecastData.reduce(
    (sum, d) => sum + d.predicted_revenue,
    0
  );

  return (
    <Layout className="min-h-screen">
      <Sider width={80} className="bg-white shadow-md">
        <div className="h-full flex flex-col items-center py-6 space-y-6">
          <BarChart2 className="text-blue-500" />
          <Calendar />
          <MessageSquare />
          <PieChart />
          <User />
        </div>
      </Sider>

      <Layout>
        <Header className="bg-white px-6 py-4 shadow-sm flex justify-between items-center">
          <div className="text-xl font-semibold">
            📊 Booking & Revenue Forecast
          </div>
          <div className="flex gap-4 items-center">
            <Input
              prefix={<Search />}
              placeholder="Search anything here"
              className="w-64"
            />
            <div className="flex items-center gap-2">
              <Avatar src={`https://i.pravatar.cc/150?img=12`} />
              <div className="text-sm">
                <div className="font-semibold">Cameron Williamson</div>
                <div className="text-gray-500 text-xs">Manager</div>
              </div>
            </div>
          </div>
        </Header>

        <Content className="p-8 bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
          <div className="mb-6">
            <Card className="rounded-2xl shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <DatePicker onChange={setStartDate} className="w-60" />
                <Button
                  type="primary"
                  onClick={handlePredict}
                  loading={loading}
                >
                  Predict Next 30 Days
                </Button>
              </div>
              <p className="mt-4 text-gray-500">
                Select a start date to forecast daily room bookings and
                projected revenue trends.
              </p>
            </Card>
          </div>

          {loading && <Spin tip="Loading forecast..." />}

          {forecastData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="rounded-2xl">
                <h3 className="text-sm text-gray-500">Total Bookings</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {totalBookings}
                </p>
              </Card>
              <Card className="rounded-2xl">
                <h3 className="text-sm text-gray-500">Total Revenue</h3>
                <p className="text-3xl font-bold text-green-600">
                  LKR {totalRevenue.toLocaleString()}
                </p>
              </Card>
              <Card className="rounded-2xl">
                <h3 className="text-sm text-gray-500">Peak Day</h3>
                <p className="text-3xl font-bold text-orange-500">
                  {
                    forecastData.reduce((max, curr) =>
                      curr.predicted_bookings > max.predicted_bookings
                        ? curr
                        : max
                    ).date
                  }
                </p>
              </Card>
            </div>
          )}

          {forecastData.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">
                  📈 Bookings Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={forecastData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="predicted_bookings"
                      stroke="#1890ff"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">
                  💰 Revenue Forecast
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={forecastData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predicted_revenue" fill="#52c41a" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ModernDashboard;
