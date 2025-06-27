import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaMusic,
  FaLaptopCode,
  FaRunning,
  FaHandsHelping,
} from "react-icons/fa";

const iconMap = {
  seminar: <FaChalkboardTeacher className="text-4xl text-blue-600" />,
  cultural: <FaMusic className="text-4xl text-pink-600" />,
  workshop: <FaLaptopCode className="text-4xl text-green-600" />,
  sports: <FaRunning className="text-4xl text-orange-600" />,
  social: <FaHandsHelping className="text-4xl text-purple-600" />,
};

const activityData = [
  {
    id: 1,
    title: "Seminars & Guest Lectures",
    desc: "Sessions by industry experts to enhance learning.",
    type: "seminar",
    media: "/media/seminar.jpg",
  },
  {
    id: 2,
    title: "Cultural Events",
    desc: "Music, dance, and inter-college festivals.",
    type: "cultural",
    media: "/media/cultural.mp4",
  },
  {
    id: 3,
    title: "Workshops & Hackathons",
    desc: "Coding competitions and real-time challenges.",
    type: "workshop",
    media: "/media/hackathon.jpg",
  },
];

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulated fetch
    setTimeout(() => {
      setActivities(activityData);
    }, 500);
  }, []);

  const renderMedia = (media) => {
    const isVideo = media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".mov");
    if (isVideo) {
      return (
        <video
          src={media}
          controls
          className="w-full rounded-lg h-48 object-cover mb-4"
        />
      );
    }
    return (
      <img
        src={media}
        alt="Activity"
        className="w-full rounded-lg h-48 object-cover mb-4"
      />
    );
  };

  return (
    <section id="activities" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Student Activities</h2>

        {activities.length === 0 ? (
          <p className="text-gray-600">Loading activities...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
              >
                {renderMedia(activity.media)}
                <div className="mb-2">{iconMap[activity.type]}</div>
                <h3 className="text-xl font-semibold mb-1">{activity.title}</h3>
                <p className="text-gray-600 text-sm">{activity.desc}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <a
            href="/activities"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
          >
            View More Activities
          </a>
        </div>
      </div>
    </section>
  );
};

export default Activities;
