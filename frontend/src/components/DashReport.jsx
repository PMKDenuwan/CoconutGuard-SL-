import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Card, 
  Table, 
  Button, 
  TextInput, 
  Select, 
  Badge, 
  Spinner,
  Modal 
} from "flowbite-react";
import { 
  HiDocumentReport, 
  HiOutlineExclamationCircle,
  HiTrash
} from "react-icons/hi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { TbPlant2 } from "react-icons/tb";
import { MdOutlineWarning } from "react-icons/md";
import { BiCut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Static Sri Lankan provinces and districts
const PROVINCES = [
  'Central Province', 
  'Eastern Province',
  'Northern Province',
  'Southern Province',
  'Western Province',
  'North Western Province',
  'North Central Province',
  'Uva Province',
  'Sabaragamuwa Province'
];

const DISTRICTS_BY_PROVINCE = {
  'Central Province': ['Kandy', 'Matale', 'Nuwara Eliya'],
  'Eastern Province': ['Ampara', 'Batticaloa', 'Trincomalee'],
  'Northern Province': ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
  'Southern Province': ['Galle', 'Hambantota', 'Matara'],
  'Western Province': ['Colombo', 'Gampaha', 'Kalutara'],
  'North Western Province': ['Kurunegala', 'Puttalam'],
  'North Central Province': ['Anuradhapura', 'Polonnaruwa'],
  'Uva Province': ['Badulla', 'Monaragala'],
  'Sabaragamuwa Province': ['Kegalle', 'Ratnapura']
};

export default function DashReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    province: "",
    district: "",
    regionalDivision: "",
    timeRange: "all"  
  });

  const [stats, setStats] = useState({
    totalInspected: 0,
    totalAffected: 0,
    affectedPercentage: 0
  });

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = {
        search: filters.search,
        province: filters.province,
        district: filters.district,
        regionalDivision: filters.regionalDivision,
        timeRange: filters.timeRange
      };

      const { data } = await axios.get("/api/reports", { params });
      setReports(Array.isArray(data.reports) ? data.reports : []);
      calculateStatistics(Array.isArray(data.reports) ? data.reports : []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load reports");
      setReports([]);  // Ensure reports is never undefined
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = (reports = []) => {
    if (!Array.isArray(reports) || reports.length === 0) {
        setStats({ totalInspected: 0, totalAffected: 0, affectedPercentage: 0 });
        return;
    }

    const totalInspected = reports.reduce((acc, report) => acc + (report.numberOfPlants || 0), 0);
    const totalAffected = reports.reduce((acc, report) => acc + (report.affectedPlants || 0), 0);
    const percentage = totalInspected > 0 ? ((totalAffected / totalInspected) * 100).toFixed(2) : 0;

    setStats({
        totalInspected,
        totalAffected,
        affectedPercentage: percentage
    });
  };


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    
    if (name === "province") {
      newFilters.district = "";
      newFilters.regionalDivision = "";
    }
    
    if (name === "district") {
      newFilters.regionalDivision = "";
    }

    setFilters(newFilters);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/reports/${selectedReport._id}`);
      setReports(prev => prev.filter(r => r._id !== selectedReport._id));
      toast.success("Report deleted successfully");
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Failed to delete report");
    }
  };

  const handleDownload = (reportId) => {
    window.open(`/api/reports/${reportId}/pdf`, "_blank");
  };

  const getDateRange = () => {
    const today = new Date();
    switch(filters.timeRange) {
      case 'today':
        return { 
          start: new Date(today.setHours(0,0,0,0)), 
          end: new Date(today.setHours(23,59,59,999))
        };
      case 'week':
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        return {
          start: startOfWeek,
          end: new Date(startOfWeek.getTime() + 6 * 86400000)
        };
      case 'month':
        return {
          start: new Date(today.getFullYear(), today.getMonth(), 1),
          end: new Date(today.getFullYear(), today.getMonth() + 1, 0)
        };
      case 'year':
        return {
          start: new Date(today.getFullYear(), 0, 1),
          end: new Date(today.getFullYear(), 11, 31)
        };
      default:
        return {
          start: new Date(0),
          end: new Date()
        };
    }
  };

  const getStatusColor = (percentage) => {
    if (percentage < 30) return "success";
    if (percentage < 50) return "warning";
    return "failure";
  };

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error: {error}. Please try reloading the page.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Coconut Disease Monitoring
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Inspected</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {stats.totalInspected.toLocaleString()}
              </h2>
            </div>
            <TbPlant2 className="text-4xl text-green-500" />
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Affected Trees</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {stats.totalAffected.toLocaleString()}
              </h2>
            </div>
            <MdOutlineWarning className="text-4xl text-yellow-500" />
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Affected Percentage</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {stats.affectedPercentage}%
              </h2>
            </div>
            <BiCut className="text-4xl text-red-500" />
          </div>
        </Card>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Province
            </label>
            <Select
              name="province"
              value={filters.province}
              onChange={handleFilterChange}
            >
              <option value="">All Provinces</option>
              {PROVINCES.map(province => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <Select
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              disabled={!filters.province}
            >
              <option value="">All Districts</option>
              {(DISTRICTS_BY_PROVINCE[filters.province] || []).map(district => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Regional Division
            </label>
            <TextInput
              name="regionalDivision"
              placeholder="Enter division"
              value={filters.regionalDivision}
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <Select
              name="timeRange"
              value={filters.timeRange}
              onChange={handleFilterChange}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </Select>
          </div>

          <div>
            <TextInput
              name="search"
              placeholder="Search reports..."
              rightIcon={AiOutlineSearch}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Link to="/createReport">
            <Button gradientMonochrome="info">
              <IoIosAddCircleOutline className="mr-2 text-lg" />
              New Report
            </Button>
          </Link>

          <Button gradientMonochrome="pink">
            <HiDocumentReport className="mr-2 text-lg" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Reports Table */}
      {loading ? (
        <div className="text-center py-12">
          <Spinner size="xl" aria-label="Loading reports..." />
          <p className="mt-3 text-gray-600">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <HiOutlineExclamationCircle className="mx-auto text-5xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Reports Found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or create a new report.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table hoverable className="min-w-[1200px]">
            <Table.Head>
              <Table.HeadCell>Report ID</Table.HeadCell>
              <Table.HeadCell>Submitted By</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Plants</Table.HeadCell>
              <Table.HeadCell>Incentive</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {reports.map((report) => (
                <Table.Row key={report._id} className="bg-white">
                  <Table.Cell className="font-semibold text-gray-900">
                    {report.uniqueId}
                  </Table.Cell>
                  
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="font-medium">{report.fullName}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex flex-col">
                      <span>{report.district}</span>
                      <span className="text-sm text-gray-500">
                        {report.regionalDivision}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <Badge
                      color={getStatusColor(report.affectedPercentage)}
                      className="w-fit px-3 py-1 rounded-full"
                    >
                      {report.affectedPercentage}% Affected
                    </Badge>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex flex-col">
                      <span>Total: {report.numberOfPlants}</span>
                      <span className="text-red-600">
                        Affected: {report.affectedPlants}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="font-semibold">
                    Rs. {(report.affectedPlants * 3000).toLocaleString()}
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        size="xs"
                        gradientMonochrome="info"
                        onClick={() => handleDownload(report._id)}
                      >
                        PDF
                      </Button>
                      <Button
                        size="xs"
                        gradientMonochrome="failure"
                        onClick={() => {
                          setSelectedReport(report);
                          setShowDeleteModal(true);
                        }}
                      >
                        <HiTrash className="mr-1" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        size="md"
        onClose={() => setShowDeleteModal(false)}
      >
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete report {selectedReport?.uniqueId}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, delete it
              </Button>
              <Button
                color="gray"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}