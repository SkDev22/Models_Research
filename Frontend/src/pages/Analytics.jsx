// import React, { useState } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
// import { motion } from "framer-motion";
// import { Bar, Line } from "react-chartjs-2";
// import "chart.js/auto";

// const Analytics = () => {
//   const [chartData, setChartData] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedDate) return alert("Please select a date.");

//     try {
//       const response = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           date: selectedDate,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setChartData(data);
//       } else {
//         console.error("API Error:", data.error);
//         alert("Failed to retrieve data. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error fetching predictions:", error);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div>
//       <Sidebar />
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="flex-1 ml-50 p-8 lg:p-12"
//       >
//         <div>
//           <div className="container mx-auto px-4">
//             <div className="bg-gray-800 p-6 rounded shadow-md w-[50%]">
//               <h2 className="text-xl font-bold mb-4 text-white">
//                 Future Booking Predictons
//               </h2>
//               <form onSubmit={handleSubmit}>
//                 <label className="block mb-2 font-medium text-white">
//                   Select Date:
//                 </label>
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="p-2 border border-gray-600 rounded w-full mb-4 bg-gray-700 text-white"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Show Predictions
//                 </button>
//               </form>
//             </div>

//             {chartData ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 mb-5 gap-8">
//                 <div className="bg-gray-800 p-6 rounded shadow-md">
//                   <h2 className="text-xl font-bold mb-4">
//                     Booking Predictions
//                   </h2>
//                   <Line
//                     data={{
//                       labels: chartData.map((d) =>
//                         new Date(d.Date).toLocaleDateString()
//                       ),
//                       datasets: [
//                         {
//                           label: "Predicted Bookings",
//                           data: chartData.map((d) => d.Prediction),
//                           borderColor: "#3b82f6",
//                           backgroundColor: "rgba(59, 130, 246, 0.2)",
//                           fill: false,
//                           tension: 0.1,
//                         },
//                       ],
//                     }}
//                     options={{
//                       responsive: true,
//                       plugins: {
//                         legend: { position: "top", labels: { color: "white" } },
//                       },
//                       scales: {
//                         x: {
//                           ticks: { color: "white" },
//                           grid: { color: "rgba(255, 255, 255, 0.1)" },
//                         },
//                         y: {
//                           ticks: { color: "white" },
//                           grid: { color: "rgba(255, 255, 255, 0.1)" },
//                         },
//                       },
//                     }}
//                   />
//                 </div>

//                 <div className="bg-gray-800 p-6 rounded shadow-md">
//                   <h2 className="text-xl font-bold mb-4">Projected Revenue</h2>
//                   <Bar
//                     data={{
//                       labels: chartData.map((d) =>
//                         new Date(d.Date).toLocaleDateString()
//                       ),
//                       datasets: [
//                         {
//                           label: "Projected Revenue",
//                           data: chartData.map((d) => d.Revenue),
//                           backgroundColor: "rgba(16, 185, 129, 0.5)",
//                           borderColor: "#10b981",
//                           borderWidth: 1,
//                           barThickness: 8,
//                         },
//                       ],
//                     }}
//                     options={{
//                       responsive: true,
//                       plugins: {
//                         legend: { position: "top", labels: { color: "white" } },
//                       },
//                       scales: {
//                         x: {
//                           ticks: { color: "white" },
//                           grid: { color: "rgba(255, 255, 255, 0.1)" },
//                         },
//                         y: {
//                           ticks: { color: "white" },
//                           grid: { color: "rgba(255, 255, 255, 0.1)" },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-400 mt-5">
//                 No data available. Please submit a date to see predictions.
//               </p>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Analytics;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
// import { motion } from "framer-motion";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Analytics = () => {
//   const [chartData, setChartData] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [initialData, setInitialData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch initial data on component mount
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/initial-data");
//         const data = await response.json();
//         if (response.ok) {
//           setInitialData(data);
//         } else {
//           console.error("Failed to fetch initial data:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedDate) return alert("Please select a date.");

//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           date: selectedDate,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setChartData(data);
//       } else {
//         console.error("API Error:", data.error);
//         alert("Failed to retrieve data. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error fetching predictions:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div>
//       <Sidebar />
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="flex-1 ml-50 p-8 lg:p-12"
//       >
//         <div className="container mx-auto px-4">
//           {/* Interactive Welcome Message */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg mb-8"
//           >
//             <h2 className="text-2xl font-bold text-white mb-4">
//               Welcome to Analytics Dashboard
//             </h2>
//             <p className="text-gray-200">
//               Explore future booking predictions and revenue projections. Select
//               a date to see detailed insights.
//             </p>
//           </motion.div>

//           {/* Date Selection Form */}
//           <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-1/2 mb-8">
//             <h2 className="text-xl font-bold mb-4 text-white">
//               Future Booking Predictions
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <label className="block mb-2 font-medium text-white">
//                 Select Date:
//               </label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="p-2 border border-gray-600 rounded w-full mb-4 bg-gray-700 text-white"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Loading..." : "Show Predictions"}
//               </button>
//             </form>
//           </div>

//           {/* Initial Data Charts */}
//           {initialData && !chartData && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
//             >
//               <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold mb-4 text-white">
//                   Recent Booking Trends
//                 </h2>
//                 <Line
//                   data={{
//                     labels: initialData.recentBookings.map((d) =>
//                       new Date(d.Date).toLocaleDateString()
//                     ),
//                     datasets: [
//                       {
//                         label: "Bookings",
//                         data: initialData.recentBookings.map((d) => d.Bookings),
//                         borderColor: "#3b82f6",
//                         backgroundColor: "rgba(59, 130, 246, 0.2)",
//                         fill: false,
//                         tension: 0.1,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top", labels: { color: "white" } },
//                     },
//                     scales: {
//                       x: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                       y: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                     },
//                   }}
//                 />
//               </div>

//               <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold mb-4 text-white">
//                   Recent Revenue Trends
//                 </h2>
//                 <Bar
//                   data={{
//                     labels: initialData.recentRevenue.map((d) =>
//                       new Date(d.Date).toLocaleDateString()
//                     ),
//                     datasets: [
//                       {
//                         label: "Revenue",
//                         data: initialData.recentRevenue.map((d) => d.Revenue),
//                         backgroundColor: "rgba(16, 185, 129, 0.5)",
//                         borderColor: "#10b981",
//                         borderWidth: 1,
//                         barThickness: 8,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top", labels: { color: "white" } },
//                     },
//                     scales: {
//                       x: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                       y: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </motion.div>
//           )}

//           {/* Prediction Charts */}
//           {chartData && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
//             >
//               <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold mb-4 text-white">
//                   Booking Predictions
//                 </h2>
//                 <Line
//                   data={{
//                     labels: chartData.map((d) =>
//                       new Date(d.Date).toLocaleDateString()
//                     ),
//                     datasets: [
//                       {
//                         label: "Predicted Bookings",
//                         data: chartData.map((d) => d.Prediction),
//                         borderColor: "#3b82f6",
//                         backgroundColor: "rgba(59, 130, 246, 0.2)",
//                         fill: false,
//                         tension: 0.1,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top", labels: { color: "white" } },
//                     },
//                     scales: {
//                       x: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                       y: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                     },
//                   }}
//                 />
//               </div>

//               <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold mb-4 text-white">
//                   Projected Revenue
//                 </h2>
//                 <Bar
//                   data={{
//                     labels: chartData.map((d) =>
//                       new Date(d.Date).toLocaleDateString()
//                     ),
//                     datasets: [
//                       {
//                         label: "Projected Revenue",
//                         data: chartData.map((d) => d.Revenue),
//                         backgroundColor: "rgba(16, 185, 129, 0.5)",
//                         borderColor: "#10b981",
//                         borderWidth: 1,
//                         barThickness: 8,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top", labels: { color: "white" } },
//                     },
//                     scales: {
//                       x: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                       y: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </motion.div>
//           )}

//           {/* No Data Message */}
//           {!initialData && !chartData && (
//             <p className="text-gray-400 mt-5">
//               Loading initial data. Please wait...
//             </p>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Analytics;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
// import { motion } from "framer-motion";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Analytics = () => {
//   const [chartData, setChartData] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [initialData, setInitialData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch initial data on component mount
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/initial-data");
//         const data = await response.json();
//         if (response.ok) {
//           setInitialData(data);
//         } else {
//           console.error("Failed to fetch initial data:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedDate) return alert("Please select a date.");

//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           date: selectedDate,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setChartData(data);
//       } else {
//         console.error("API Error:", data.error);
//         alert("Failed to retrieve data. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error fetching predictions:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div>
//       <Sidebar />
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="flex-1 ml-50 p-8 lg:p-12"
//       >
//         <div className="container mx-auto px-4">
//           {/* Interactive Welcome Message */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg mb-8"
//           >
//             <h2 className="text-2xl font-bold text-white mb-4">
//               Welcome to Analytics Dashboard
//             </h2>
//             <p className="text-gray-200">
//               Explore future booking predictions and revenue projections. Select
//               a date to see detailed insights.
//             </p>
//           </motion.div>

//           {/* Date Selection Form */}
//           <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-1/2 mb-8">
//             <h2 className="text-xl font-bold mb-4 text-white">
//               Future Booking Predictions
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <label className="block mb-2 font-medium text-white">
//                 Select Date:
//               </label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="p-2 border border-gray-600 rounded w-full mb-4 bg-gray-700 text-white"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Loading..." : "Show Predictions"}
//               </button>
//             </form>
//           </div>

//           {/* Default Data Charts */}
//           {initialData && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
//             >
//               {/* Recent Bookings Chart */}
//               <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold mb-4 text-white">
//                   Recent Booking Trends
//                 </h2>
//                 <Line
//                   data={{
//                     labels: initialData.recentBookings.map((d) =>
//                       new Date(d.Date).toLocaleDateString()
//                     ),
//                     datasets: [
//                       {
//                         label: "Bookings",
//                         data: initialData.recentBookings.map((d) => d.Bookings),
//                         borderColor: "#3b82f6",
//                         backgroundColor: "rgba(59, 130, 246, 0.2)",
//                         fill: false,
//                         tension: 0.1,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top", labels: { color: "white" } },
//                     },
//                     scales: {
//                       x: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                       y: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                     },
//                   }}
//                 />
//               </div>

//               {/* Recent Revenue Chart */}
//               <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold mb-4 text-white">
//                   Recent Revenue Trends
//                 </h2>
//                 <Bar
//                   data={{
//                     labels: initialData.recentRevenue.map((d) =>
//                       new Date(d.Date).toLocaleDateString()
//                     ),
//                     datasets: [
//                       {
//                         label: "Revenue",
//                         data: initialData.recentRevenue.map((d) => d.Revenue),
//                         backgroundColor: "rgba(16, 185, 129, 0.5)",
//                         borderColor: "#10b981",
//                         borderWidth: 1,
//                         barThickness: 8,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top", labels: { color: "white" } },
//                     },
//                     scales: {
//                       x: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                       y: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </motion.div>
//           )}

//           {/* Prediction Charts */}
//           {chartData && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
//             >
//               {/* Booking Predictions Chart */}
//               <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold mb-4 text-white">
//                   Booking Predictions
//                 </h2>
//                 <Line
//                   data={{
//                     labels: chartData.map((d) =>
//                       new Date(d.Date).toLocaleDateString()
//                     ),
//                     datasets: [
//                       {
//                         label: "Predicted Bookings",
//                         data: chartData.map((d) => d.Prediction),
//                         borderColor: "#3b82f6",
//                         backgroundColor: "rgba(59, 130, 246, 0.2)",
//                         fill: false,
//                         tension: 0.1,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top", labels: { color: "white" } },
//                     },
//                     scales: {
//                       x: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                       y: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                     },
//                   }}
//                 />
//               </div>

//               {/* Projected Revenue Chart */}
//               <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold mb-4 text-white">
//                   Projected Revenue
//                 </h2>
//                 <Bar
//                   data={{
//                     labels: chartData.map((d) =>
//                       new Date(d.Date).toLocaleDateString()
//                     ),
//                     datasets: [
//                       {
//                         label: "Projected Revenue",
//                         data: chartData.map((d) => d.Revenue),
//                         backgroundColor: "rgba(16, 185, 129, 0.5)",
//                         borderColor: "#10b981",
//                         borderWidth: 1,
//                         barThickness: 8,
//                       },
//                     ],
//                   }}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top", labels: { color: "white" } },
//                     },
//                     scales: {
//                       x: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                       y: {
//                         ticks: { color: "white" },
//                         grid: { color: "rgba(255, 255, 255, 0.1)" },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </motion.div>
//           )}

//           {/* No Data Message */}
//           {!initialData && !chartData && (
//             <p className="text-gray-400 mt-5">
//               Loading initial data. Please wait...
//             </p>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Analytics;

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { motion } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js"; // Import Chart from chart.js for cleanup
import "chart.js/auto";

const Analytics = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  // Refs to store chart instances
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) return alert("Please select a date.");

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setChartData(data);
      } else {
        console.error("API Error:", data.error);
        alert("Failed to retrieve data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  // Cleanup chart instances on component unmount or data change
  useEffect(() => {
    return () => {
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
        lineChartRef.current = null;
      }
      if (barChartRef.current) {
        barChartRef.current.destroy();
        barChartRef.current = null;
      }
    };
  }, [chartData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      <Sidebar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 ml-50 p-8 lg:p-12"
      >
        <div>
          <div className="container mx-auto px-4">
            <div className="bg-gray-800 p-6 rounded shadow-md w-[50%]">
              <h2 className="text-xl font-bold mb-4 text-white">
                Future Booking Predictions
              </h2>
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-medium text-white">
                  Select Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="p-2 border border-gray-600 rounded w-full mb-4 bg-gray-700 text-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Show Predictions
                </button>
              </form>
            </div>

            {chartData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 mb-5 gap-8">
                <div className="bg-gray-800 p-6 rounded shadow-md">
                  <h2 className="text-xl font-bold mb-4">
                    Booking Predictions
                  </h2>
                  <Line
                    data={{
                      labels: chartData.map((d) =>
                        new Date(d.Date).toLocaleDateString()
                      ),
                      datasets: [
                        {
                          label: "Predicted Bookings",
                          data: chartData.map((d) => d.Prediction),
                          borderColor: "#3b82f6",
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          fill: false,
                          tension: 0.1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top", labels: { color: "white" } },
                      },
                      scales: {
                        x: {
                          ticks: { color: "white" },
                          grid: { color: "rgba(255, 255, 255, 0.1)" },
                        },
                        y: {
                          ticks: { color: "white" },
                          grid: { color: "rgba(255, 255, 255, 0.1)" },
                        },
                      },
                    }}
                    ref={(node) => {
                      if (node) {
                        if (lineChartRef.current) {
                          lineChartRef.current.destroy(); // Destroy previous instance
                        }
                        lineChartRef.current = node; // Store new instance
                      }
                    }}
                  />
                </div>

                <div className="bg-gray-800 p-6 rounded shadow-md">
                  <h2 className="text-xl font-bold mb-4">Projected Revenue</h2>
                  <Bar
                    data={{
                      labels: chartData.map((d) =>
                        new Date(d.Date).toLocaleDateString()
                      ),
                      datasets: [
                        {
                          label: "Projected Revenue",
                          data: chartData.map((d) => d.Revenue),
                          backgroundColor: "rgba(16, 185, 129, 0.5)",
                          borderColor: "#10b981",
                          borderWidth: 1,
                          barThickness: 8,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top", labels: { color: "white" } },
                      },
                      scales: {
                        x: {
                          ticks: { color: "white" },
                          grid: { color: "rgba(255, 255, 255, 0.1)" },
                        },
                        y: {
                          ticks: { color: "white" },
                          grid: { color: "rgba(255, 255, 255, 0.1)" },
                        },
                      },
                    }}
                    ref={(node) => {
                      if (node) {
                        if (barChartRef.current) {
                          barChartRef.current.destroy(); // Destroy previous instance
                        }
                        barChartRef.current = node; // Store new instance
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-400 mt-5">
                No data available. Please submit a date to see predictions.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
