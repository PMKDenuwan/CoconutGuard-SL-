 import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";

export default function DashSideBar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items className=" ">
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=client">
            <Sidebar.Item active={tab === "client"} labelColor="dark" as="div">
              Cilent
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=appointment">
            <Sidebar.Item active={tab === "appointment"} as="div">
              Appointment
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
