import React from "react";
import SidebarLayout from "./components/SidebarLayout";
import PredictionDashboard from "./components/PredictionDashboard";

const App = () => {
  return (
    <div>
      <SidebarLayout>
        <PredictionDashboard />
      </SidebarLayout>
    </div>
  );
};

export default App;
