import React, { useState, useEffect } from "react";
import api from "../api/axios";
import DoctorCard from "../components/DoctorCard";

const HomePage = () => {
  // const [doctors, setDoctors] = useState([]);

  // const getAllDoctors = async () => {
  //     try {
  //         const res = await axios.get('/api/doctors/get-all-doctors');
  //         if (res.data.success) {
  //             setDoctors(res.data.data);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching doctors:", error);
  //     }
  // };
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllDoctors = async (search = "") => {
    try {
      // Append the search term as a query parameter to the API call
      const res = await api.get(
        `/api/doctors/get-all-doctors?search=${search}`
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Fetch all doctors when the page first loads
  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getAllDoctors(searchTerm);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Book Appointment with trusted doctor
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Simply browse through our extensive list of trusted doctor, schedule your appointment hassle-free
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Speak to Sales
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://fertilize.feazen.com/wp-content/uploads/2024/02/banner.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>
      <br/>
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or specialty (e.g., Cardiology)"
          className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-r-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
      {/* Top Doctors Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Top Doctors
          </h2>
          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No doctors available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
