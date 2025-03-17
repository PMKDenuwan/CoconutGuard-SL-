import axios from "axios";
import { Button, Table, Card, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiNotePencilBold } from "react-icons/pi";
import { IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";

export default function DashClient() {
  const [clients, setClients] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get(`/api/client?name=${searchQuery}`);
        setClients(data.client);
        setTotalCount(data.totalClients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, [searchQuery]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this course?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`/api/client/${id}`);
        setClients((currentClients) =>
          currentClients.filter((p) => p._id !== id)
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log(clients);
  return (
    <div className="overflow-x-auto mx-auto w-full mr-2 mt-6 ml-2">
      <h1 className="text-4xl">Clients</h1>
      <div className="flex justify-between">
        <div></div>
        <div className="mr-5">
          <Link to="/client">
            <Button color="blue">
              <IoIosAddCircleOutline className="mr-2 text-xl " />
              New Client
            </Button>
          </Link>
        </div>
      </div>

      <Card href="#" className="max-w-sm mb-5">
        <div className="flex gap-5">
          <p className="text-lg  text-gray-700 dark:text-gray-400">Clients</p>
          <HiMiniUserGroup className="ml-48 text-6xl" />
        </div>
        <h1 className="text-4xl">{totalCount}</h1>
      </Card>

      <div className="mb-3 w-96">
        <form>
          <TextInput
            type="text"
            placeholder="Search By Client Name..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <Table>
        <Table.Head>
          <Table.HeadCell>ProjectID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Company Name</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Contact Number</Table.HeadCell>
          <Table.HeadCell>Duration of Contract</Table.HeadCell>
          
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {clients.map((client, index) => (
            <Table.Row key={index} className="bg-slate-200">
              <Table.Cell>{client.projectID}</Table.Cell>
              <Table.Cell>{client.name}</Table.Cell>
              <Table.Cell>{client.companyname}</Table.Cell>
              <Table.Cell>{client.address}</Table.Cell>
              <Table.Cell>{client.phone}</Table.Cell>
              <Table.Cell>{client.duration}</Table.Cell>

              
              <Table.Cell>
                <div className="flex flex-row gap-4">
                  <a
                    href={`/update-client/${client._id}`}
                    className="font-medium text-cyan-600 hover:underline"
                  >
                    <PiNotePencilBold className="text-2xl" />
                  </a>

                  <a
                    onClick={() => {
                      handleDelete(client._id);
                    }}
                    className="font-medium text-red-600 hover:underline ml-7 cursor-pointer"
                  >
                    <IoTrashBinOutline className="text-2xl" />
                  </a>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
