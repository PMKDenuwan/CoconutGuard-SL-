import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaFileDownload } from 'react-icons/fa';
import JsPDF from 'jspdf';

export default function Profile() {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`/api/appointment?userId=${currentUser._id}`);
        setAppointments(data.appointment); // Assuming response data has 'appointment' field
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, [currentUser._id]);

  const generatePDF = (name, company, date, time) => {
    const pdf = new JsPDF();

    pdf.setFontSize(18);
    pdf.text("SHAN Construction", 105, 30, { align: "center" });

    pdf.setLineWidth(1);
    pdf.rect(20, 35, pdf.internal.pageSize.getWidth() - 40, pdf.internal.pageSize.getHeight() - 50);

    pdf.setFontSize(14);
    pdf.text(`Subject: Appointment Confirmation of ${company}`, 25, 45);

    pdf.text(`Dear ${name},`, 25, 60);

    const introText = "We are pleased to confirm your appointment with us. Below are the details of your scheduled appointment:";
    const introTextLines = pdf.splitTextToSize(introText, 160);
    pdf.text(introTextLines, 25, 75);

    pdf.text(`Date: ${date}`, 45, 100);
    pdf.text(`Time: ${time}`, 45, 110);

    const outroText = "If you have any questions or need to make changes to your appointment, please feel free to contact us. We look forward to seeing you soon!";
    const outroTextLines = pdf.splitTextToSize(outroText, 160);
    pdf.text(outroTextLines, 25, 125);

    pdf.text("Best regards,", 25, 165);
    pdf.text("The Client Manager", 25, 175);
    pdf.text("Shan Construction", 25, 185);
    pdf.text("+94 1123079", 25, 195);

    pdf.save("booking-confirmation.pdf");
  };

  return (
    <div className="overflow-x-auto mx-auto w-full mr-2 mt-6 ml-2 mb-6 h-screen">
      <h1 className="text-4xl mb-10 ml-6">My Appointments</h1>

      {appointments.length > 0 && appointments.map((appointment, index) => (
        <Card key={index} className="max-w-4xl mb-7 ml-3">
          {appointment.status === "successful" && (
            <div className="flex justify-end">
              <a
                onClick={() =>
                  generatePDF(
                    appointment.fullName,
                    appointment.companyName,
                    appointment.date,
                    appointment.time
                  )
                }
                className="font-medium text-red-600 hover:underline ml-7 cursor-pointer"
              >
                <FaFileDownload className="text-2xl" />
              </a>
            </div>
          )}
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="mr-4">{appointment.date}</span>
            <span>{appointment.time}</span>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-medium">Name:</span> {appointment.fullName}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-medium">Contact Number:</span> {appointment.phone}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-medium">Company Name:</span> {appointment.companyName}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-medium">Message:</span> {appointment.message}
          </p>
          <div className={`${appointment.status === 'pending' ? 'bg-blue-200' : 'bg-green-200'} w-max rounded pl-1 pe-2`}>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="font-medium">{appointment.status}</span>
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
