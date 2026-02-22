import React from 'react';

const TeachingStaff = () => {

  //  Teaching Staff Data
  const teachingStaff = [
  { id: 1, name: "Dr. Afroz Jahan", qual: "M.Sc., M.Ed., M.Phil., Ph.D", desig: "Principal", dept: "Environmental Science" },
  { id: 2, name: "Mrs. Nayer Fatima", qual: "M.Sc., B.Ed., KSET", desig: "Vice - Principal, Associate professor", dept: "Department of Science" },
  { id: 3, name: "Shweta", qual: "M.Sc., B.Ed.", desig: "Lecturer", dept: "Department of Science" },
  { id: 4, name: "Shaikh Zeba", qual: "M.Sc., B.Ed.", desig: "Lecturer", dept: "Department of Science" },
  { id: 5, name: "Mehbooba Begum", qual: "M.Sc., B.Ed.", desig: "Lecturer", dept: "Department of Science" },
  { id: 6, name: "Kaveri", qual: "M.Sc., B.Ed.", desig: "Lecturer", dept: "Department of Science" },
  { id: 7, name: "Mehraj", qual: "M.Sc. Cs", desig: "Lecturer", dept: "Computer Applications" },
  { id: 8, name: "Taranum Begum", qual: "B.Tech. Cs", desig: "Lecturer", dept: "Computer Applications" },
  { id: 9, name: "Karan", qual: "MCA", desig: "Lecturer", dept: "Computer Applications" },
  { id: 10, name: "Md Rafeeq", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
  { id: 11, name: "Md Parvez", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
  { id: 12, name: "Sagar", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
  { id: 13, name: "Nand Kishore", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
  { id: 14, name: "Pallavi", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
  { id: 15, name: "Md Hafeez", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
  { id: 16, name: "Moin", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
  { id: 17, name: "Asif Khan", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
  { id: 18, name: "Md Shoeb Ahmed", qual: "MBA, B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
  { id: 19, name: "Khaja Moinuddin", qual: "MBA, B.Ed.", desig: "Lecturer", dept: "Department of Commrece" },
  { id: 20, name: "Bushra Tamkeen", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
  { id: 21, name: "Asif Ali", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
  { id: 22, name: "Khaja Bi", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
  { id: 23, name: "Mohammed Ibrahim", qual: "MA, B.Ed.", desig: "Lecturer", dept: "Department of Arts" },
  { id: 24, name: "Mohammed Altamash", qual: "MA, B.Ed.", desig: "Lecturer", dept: "Department of Arts" },
  { id: 25, name: "Narsing Datturao", qual: "MA, M.phil.", desig: "Lecturer", dept: "Department of Arts" },
  { id: 26, name: "Sarita", qual: "MA, BEd.", desig: "Lecturer", dept: "Department of Arts" },
  { id: 27, name: "Hidayatunnisa Begum", qual: "MA, B.Ed.", desig: "Lecturer", dept: "Department of Arts" },
  { id: 28, name: "Neha Khanam", qual: "MA, B.Ed.", desig: "Lecturer", dept: "Department of Arts" },
  { id: 29, name: "Dr. Md Mudassir", qual: "MA, B.Ed., Ph.D.", desig: "Lecturer", dept: "Department of Arts" },
  { id: 30, name: "Dr. Md Asad", qual: "MA, B.Ed., Ph.D., NET, SET, JRF, KSET.", desig: "Lecturer", dept: "Department of Arts" }
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
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Department</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.dept}</td>
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
      
      <TableSection title="Teaching Staff" data={teachingStaff} />
    </div>
  );
};

export default TeachingStaff;