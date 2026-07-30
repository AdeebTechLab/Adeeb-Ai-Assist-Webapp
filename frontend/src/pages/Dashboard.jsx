import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  FiSearch,
  FiRefreshCw,
  FiMic,
  FiFileText,
  FiCheckCircle,
  FiCpu,
} from "react-icons/fi";

import Layout from "../layout/Layout";
import StatsCard from "../components/StatsCard";
import UploadBox from "../components/UploadBox";
import ChatBox from "../components/ChatBox";

import { getMeetings } from "../api/api";

function Dashboard() {
  const { t } = useTranslation();

  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();

    const interval = setInterval(() => {
      loadMeetings();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  async function loadMeetings() {
    try {
      setLoading(true);

      const data = await getMeetings();

      setMeetings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredMeetings = meetings.filter((meeting) =>
    meeting.filename.toLowerCase().includes(search.toLowerCase())
  );

  const totalActionItems = meetings.reduce((count, meeting) => {
    if (!meeting.action_items) return count;

    return (
      count +
      meeting.action_items
        .split("\n")
        .filter((x) => x.trim() !== "").length
    );
  }, 0);

  return (
    <Layout>

      {/* Hero Banner */}

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-8 mb-8 text-white bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-2xl"
      >

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>

            <h1 className="text-4xl font-bold mb-3">
               Adeeb Meeting Agent
            </h1>

            <p className="text-blue-100 text-lg max-w-2xl">
              AI Powered Meeting Assistant with Live
              Transcription, AI Summary, Action Items,
              Chat Assistant and Smart Search.
            </p>

          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"/>

              <span className="font-semibold">
                AI System Online
              </span>

            </div>

            <p className="mt-3 text-sm text-blue-100">
              Ready to process meetings
            </p>

          </div>

        </div>

      </motion.div>

      {/* Statistics */}

      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
      >

        <StatsCard
          title="Meetings"
          value={meetings.length}
          icon={<FiMic size={28}/>}
        />

        <StatsCard
          title="Summaries"
          value={meetings.length}
          icon={<FiFileText size={28}/>}
        />

        <StatsCard
          title="Action Items"
          value={totalActionItems}
          icon={<FiCheckCircle size={28}/>}
        />

        <StatsCard
          title="AI Status"
          value="Online"
          icon={<FiCpu size={28}/>}
        />

      </motion.div>

      <UploadBox
        onSuccess={loadMeetings}
      />

      <ChatBox />

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 mb-8">

        <div className="relative">

          <FiSearch
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search meetings..."
            className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

      </div>
            {/* Recent Meetings */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl shadow-xl p-8 mb-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              📂 Recent Meetings
            </h2>

            <p className="text-gray-500 mt-1">
              Latest AI processed meetings
            </p>

          </div>

          <button
            onClick={loadMeetings}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition-all"
          >
            <FiRefreshCw />
            Refresh
          </button>

        </div>

        {loading ? (

          <div className="flex flex-col items-center py-16">

            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent" />

            <p className="mt-5 text-blue-600 font-semibold">
              Loading meetings...
            </p>

          </div>

        ) : filteredMeetings.length === 0 ? (

          <div className="text-center py-20">

            <div className="text-7xl mb-5">
              📭
            </div>

            <h3 className="text-2xl font-bold text-gray-700">
              No Meetings Found
            </h3>

            <p className="text-gray-500 mt-2">
              Upload your first meeting to start using AI.
            </p>

          </div>

        ) : (

          <div className="grid gap-5">

            {filteredMeetings.map((meeting) => (

              <motion.div
                key={meeting.id}
                whileHover={{
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="border rounded-2xl p-6 hover:shadow-xl transition-all bg-gray-50"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-5">

                  <div className="flex-1">

                    <Link
                      to={`/meeting/${meeting.id}`}
                      className="text-xl font-bold text-blue-700 hover:underline"
                    >
                      {meeting.filename}
                    </Link>

                    <p className="mt-4 text-gray-700 line-clamp-3">
                      {meeting.summary}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-5">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        Meeting #{meeting.id}
                      </span>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        AI Summarized
                      </span>

                    </div>

                  </div>

                  <div className="flex items-center">

                    <Link
                      to={`/meeting/${meeting.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all"
                    >
                      View Details →
                    </Link>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </motion.div>

    </Layout>
  );
}

export default Dashboard;