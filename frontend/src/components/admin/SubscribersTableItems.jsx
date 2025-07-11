import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const SubcribersTableItems = ({ subscriber, fetchSubscribers }) => {
  const { _id, name, email, subscribedAt } = subscriber;
  const date = new Date(subscribedAt);

  const { axios } = useAppContext();

  const approveSubscriber = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchSubscribers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm(
      "Are u sure you want yo delete this Subscriber?"
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/subscribers/delete", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchSubscribers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/image/toggle-publish", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchSubscribers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <br />
        <b className="font-medium text-gray-600">Name</b> : {name}
        <br />
        <b className="font-medium text-gray-600">Email</b> : {email}
      </td>
      <td className="px-6 py-4 max-sm:hidden">{date.toLocaleDateString()}</td>
      <td className="px-6 py-4 ">
        <div className="inline-flex items-center gap-4">
          {!subscriber.isApproved ? (
            <img
              onClick={approveSubscriber}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt=""
            />
          ) : (
            <p className="text-sm border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            src={assets.bin_icon}
            alt=""
          />
        </div>
      </td>
    </tr>
  );
};

export default SubcribersTableItems;
