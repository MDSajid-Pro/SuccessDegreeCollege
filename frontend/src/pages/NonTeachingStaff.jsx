import React from 'react';

const NonTeachingStaff = () => {

  // 3. Non-Teaching Staff Data
  const nonTeachingStaff = [
    { id: 1, name: "Shah Naser Quadri", qual: "M.Lib.", desig: "Librarian" },
    { id: 2, name: "Aqueeb Javeed", qual: "M.P.Ed., Ph.D.", desig: "Physical Instructor"},
    { id: 3, name: "Chahya", qual: "-----", desig: "Peon" },
    { id: 4, name: "Karuna", qual: "-----", desig: "Peon" },
  ];

  // Reusable Table Component
  const TableSection = ({ title, data }) => (
    <div className="mb-10 p-10">
      <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 border-l-4 border-yellow-400 pl-3">
        {title}
      </h3>
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Sl. No</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Qualification</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Designation</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((staff, index) => (
              <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staff.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staff.qual}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {staff.desig}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Faculty & Staff Directory</h1>
      
      <TableSection title="Non-Teaching & Support Staff" data={nonTeachingStaff} />
    </div>
  );
};

export default NonTeachingStaff;