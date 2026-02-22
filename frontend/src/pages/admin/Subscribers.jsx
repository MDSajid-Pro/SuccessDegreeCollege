import { useEffect } from "react";
import { useState } from "react";
import SubscribersTableItems from "../../components/admin/SubscribersTableItems";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Subscribers = () => {
  const { axios } = useAppContext();

  const [subscribers, setSubscribers] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchSubscribers = async () => {
    try {
      const { data } = await axios.get("/api/subscribers/all");
      if (data.success) {
        setSubscribers(data.subscribers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="flex-1 pt-20 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl pt-14">
        <h1>Subscribers</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-blue-500" : "text-gray-700"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved" ? "text-blue-500" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="relative h-4/5 max-w-3xl mt-4 overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                {" "}
                Subscribers details
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                {" "}
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                {" "}
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers
              .filter((subscriber) => {
                if (filter === "Approved")
                  return subscriber.isApproved === true;
                return subscriber.isApproved === false;
              })
              .map((subscriber, index) => (
                <SubscribersTableItems
                  key={subscriber._id}
                  subscriber={subscriber}
                  index={index + 1}
                  fetchSubscribers={fetchSubscribers}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscribers;
