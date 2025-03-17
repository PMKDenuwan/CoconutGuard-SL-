import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashClient from "../components/DashClient";
import DashAppointment from "../components/DashAppointment";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormURL = urlParams.get("tab");
    if (tabFormURL) {
      setTab(tabFormURL);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/**Sidebar */}
        <DashSidebar />
      </div>

      {/**profile */}
      {tab === "client" && <DashClient />}
      {tab === "appointment" && <DashAppointment />}
    </div>
  );
}
