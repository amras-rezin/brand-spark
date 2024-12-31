import { axiosAdmin } from '../../../axios/axiosAdmin';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const AddService = () => {
  const [serviceData, setServiceData] = useState([]);
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axiosAdmin().get('/getService');
        setServiceData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchService();
  }, []);

  const handleDelete = async (id) => {
    try {
      const {data} = await axiosAdmin().delete(`/deleteService/${id}`);
      if(data.message === 'success') {
        setServiceData((prev) => prev.filter((service) => service._id !== id));
        toast.success('Service deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error(err.message)
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center pt-20">
      {/* Heading Section */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold text-neutral-200">
          Service Table
        </h1>
        <p className="text-lg text-neutral-400">Manage your services details</p>
        <Link to={'/admin/add-service'}>
          <button className="p-2 px-3 bg-black hover:scale-105">
            Add Service
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="text-neutral-200 flex justify-center items-center w-full px-4">
        <div className="relative overflow-x-auto rounded-lg shadow-md bg-neutral-800 border border-neutral-700 w-full lg:w-3/4 xl:w-2/3">
          <table className="w-full text-sm text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-neutral-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Icon
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((service, index) => (
                <tr
                  key={index}
                  className="bg-neutral-800 border-b dark:border-neutral-600 hover:bg-neutral-700 transition-all duration-200"
                >
                  <td className="px-6 py-4">
                    <img
                      src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${service.iconUrl}`}
                      alt="image"
                      className="w-12 h-12 p-1 object-contain"
                    />
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-200 whitespace-nowrap">
                    {service.title}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {service.description}
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center items-center space-x-4">
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddService;
