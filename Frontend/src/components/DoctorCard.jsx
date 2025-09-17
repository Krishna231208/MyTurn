import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  return (
    
      <Link
  // Change from '/book/...' to '/doctor/...'
  to={`/doctor/${doctor._id}`}
  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
>

      <img className="w-full h-56 object-cover object-center" src={doctor.image || 'https://i.imgur.com/2s31bC5.png'} alt={doctor.name} />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
        <p className="text-gray-600 mb-4">{doctor.specialty}</p>
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              doctor.availability === 'Available'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {doctor.availability}
          </span>
          <Link
            to={`/book/${doctor._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
</Link>
    
  );
};

export default DoctorCard;

  