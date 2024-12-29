
const AddPortfolio = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center pt-20">
        {/* Heading Section */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-semibold text-neutral-200">Portfolio Table</h1>
          <p className="text-lg text-neutral-400">Manage your portfolio details</p>
        </div>
  
        {/* Table Section */}
        <div className="text-neutral-200 flex justify-center items-center w-full px-4">
          <div className="relative overflow-x-auto rounded-lg shadow-md bg-neutral-800 border border-neutral-700 w-full lg:w-3/4 xl:w-2/3">
            <table className="w-full text-sm text-gray-400">
              <thead className="text-xs text-gray-300 uppercase bg-neutral-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">Cover Image</th>
                  <th scope="col" className="px-6 py-3 text-center">Details Image</th>
                  <th scope="col" className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-neutral-800 border-b dark:border-neutral-600 hover:bg-neutral-700 transition-all duration-200">
                  <td className="px-6 py-4 text-center">Silver</td>
                  <td className="px-6 py-4 text-center">Laptop</td>
                  <td className="px-6 py-4 text-center flex justify-center items-center space-x-4">
                    <button className="font-medium text-blue-500 hover:underline">Update</button>
                    <button className="font-medium text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
                <tr className="bg-neutral-800 border-b dark:border-neutral-600 hover:bg-neutral-700 transition-all duration-200">
                  <td className="px-6 py-4 text-center">White</td>
                  <td className="px-6 py-4 text-center">Laptop PC</td>
                  <td className="px-6 py-4 text-center flex justify-center items-center space-x-4">
                    <button className="font-medium text-blue-500 hover:underline">Update</button>
                    <button className="font-medium text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
                <tr className="bg-neutral-800 hover:bg-neutral-700 transition-all duration-200">
                  <td className="px-6 py-4 text-center">Black</td>
                  <td className="px-6 py-4 text-center">Accessories</td>
                  <td className="px-6 py-4 text-center flex justify-center items-center space-x-4">
                    <button className="font-medium text-blue-500 hover:underline">Update</button>
                    <button className="font-medium text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

export default AddPortfolio