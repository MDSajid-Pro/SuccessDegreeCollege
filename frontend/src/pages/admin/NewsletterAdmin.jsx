import React, { useEffect, useState } from "react";

const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/newsletter/all")
      .then((res) => res.json())
      .then((data) => setSubscribers(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Newsletter Subscribers</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-blue-200">
                  <tr>
             <th className="p-2 text-left">Sl.no</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s, index) => (
              <tr key={s._id} className="border-t border-gray-200">
                  <td className="p-2">{index + 1}</td>
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">
                {new Date(s.subscribedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsletterAdmin;
