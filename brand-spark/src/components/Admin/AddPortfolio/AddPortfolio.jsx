import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosAdmin } from "../../../axios/axiosAdmin";
import { toast } from "react-toastify";

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const AddPortfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosAdmin().get("/portfolioManagement");
        setPortfolioData(response.data);
      } catch (error) {
        setError("Failed to fetch portfolio data. Please try again later.");
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosAdmin().delete(`/portfolioManagement/${id}`);
      if (response.data.message === "success") {
        toast.success("Client deleted successfully!");
        setPortfolioData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      toast.error("Error deleting portfolio item");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center pt-20">
      {/* Heading Section */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold text-neutral-200">
          Portfolio Table
        </h1>
        <p className="text-lg text-neutral-400">
          Manage your portfolio details
        </p>
        <Link to={"/admin/add-portfolio"}>
          <button className="p-2 px-3 bg-black hover:scale-105">
            Add Portfolio
          </button>
        </Link>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-neutral-400">Loading portfolio data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table Section */}
      {!loading && !error && (
        <div className="text-neutral-200 flex justify-center items-center w-full px-4 mb-8">
          <div className="relative overflow-x-auto rounded-lg shadow-md bg-neutral-800 border border-neutral-700 w-full lg:w-3/4 xl:w-2/3">
            <table className="w-full text-sm text-gray-400">
              <thead className="text-xs text-gray-300 uppercase bg-neutral-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    Cover Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Details Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((portfolio) => (
                  <tr
                    key={portfolio._id}
                    className="bg-neutral-800 border-b dark:border-neutral-600 hover:bg-neutral-700 transition-all duration-200"
                  >
                    {/* Cover Image Column */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <img
                          src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${portfolio.coverImageUrl}`}
                          alt="Cover Image"
                          className="w-20 h-auto bg-transparent p-1 mx-auto"
                        />
                      </div>
                    </td>

                    {/* Details Image Column */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <img
                          src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${portfolio.detailsImageUrl}`}
                          alt="Details Image"
                          className="w-20 h-auto bg-transparent p-1 mx-auto"
                        />
                      </div>
                    </td>

                    {/* Action Column */}
                    <td className="px-6 py-4 text-center items-center space-x-4">
                      <button
                        className="font-medium text-red-500 hover:underline"
                        onClick={() => handleDelete(portfolio._id)}
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
      )}
    </div>
  );
};

export default AddPortfolio;
