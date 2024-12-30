import { Link } from "react-router-dom";

const AddClient = () => {
  // Data Array
  const clientData = [
    { image: "Silver", color: "Laptop" },
    { image: "White", color: "Laptop PC" },
    { image: "Black", color: "Accessories" },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center pt-20">
      {/* Heading Section */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold text-neutral-200">Client Table</h1>
        <p className="text-lg text-neutral-400">Manage your client details</p>
        <Link to={'/admin/add-client'}>
          <button className="p-2 px-3 bg-black hover:scale-105">Add Client</button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="text-neutral-200 flex justify-center items-center w-full px-4">
        <div className="relative overflow-x-auto rounded-lg shadow-md bg-neutral-800 border border-neutral-700 w-full lg:w-3/4 xl:w-2/3">
          <table className="w-full text-sm text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-neutral-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">Image</th>
                <th scope="col" className="px-6 py-3 text-center">Color</th>
                <th scope="col" className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {clientData.map((client, index) => (
                <tr
                  key={index}
                  className="bg-neutral-800 border-b dark:border-neutral-600 hover:bg-neutral-700 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-center flex justify-center">
                    <img src={client.image} alt="image" className="w-12 h-12 bg-black p-1"/></td>
                  <td className="px-6 py-4 text-center">{client.color}</td>
                  <td className="px-6 py-4 text-center flex justify-center items-center space-x-4">
                    <button className="font-medium text-red-500 hover:underline">
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

export default AddClient;
