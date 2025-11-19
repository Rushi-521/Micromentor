import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api'; // Assumes you added getProfile to api.js
import { 
  User, MapPin, Award, TrendingUp, BookOpen, 
  Calendar, Clock, ChevronRight, Star, ShieldCheck 
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import Layout from '../components/layout/Layout'; // Your existing Layout

export default function Dashboard() {
  const { user } = useAuth(); // Basic info from login (token, username)
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock sessions based on your Session.java model
  // In a real app, you'd fetch this via sessionRepository.findAllUserSessions()
  const upcomingSessions = [
    {
      id: 1,
      skill: "Java Spring Boot",
      partner: "Alice Johnson",
      time: "Today, 4:00 PM",
      status: "CONFIRMED",
      type: "TEACHING"
    },
    {
      id: 2,
      skill: "React Native",
      partner: "Bob Smith",
      time: "Tomorrow, 10:00 AM",
      status: "PENDING",
      type: "LEARNING"
    }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // This endpoint should correspond to a Controller that returns UserResponse
        // If not ready, we fallback to the basic 'user' object from auth
        const { data } = await userAPI.getProfile(); 
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch full profile, using auth data", error);
        // Fallback mock data matching your User.java fields
        setProfile({
          reputationScore: user?.reputationScore || 0, 
          totalSessionsTaught: user?.totalSessionsTaught || 0,
          totalSessionsLearned: user?.totalSessionsLearned || 0,
          isVerified: user?.isVerified || false,
          locationPrecision: "APPROXIMATE"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              Welcome back, {user?.username}! 
              {profile?.isVerified && (
                <span title="Verified Mentor" className="bg-blue-100 text-blue-600 p-1 rounded-full">
                  <ShieldCheck size={20} />
                </span>
              )}
            </h1>
            <p className="text-slate-500 mt-2">
              Here is your MicroMentor activity overview.
            </p>
          </div>
          <button className="hidden md:flex bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition items-center gap-2 shadow-sm">
            <MapPin size={18} />
            Find Mentors Nearby
          </button>
        </div>

        {/* Stats Grid - Maps to User.java fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Reputation Score */}
          <Motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Reputation Score</p>
                <p className="text-2xl font-bold text-slate-900">{profile?.reputationScore}</p>
              </div>
            </div>
          </Motion.div>

          {/* Sessions Taught */}
          <Motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                <User className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Sessions Taught</p>
                <p className="text-2xl font-bold text-slate-900">{profile?.totalSessionsTaught}</p>
              </div>
            </div>
          </Motion.div>

          {/* Skills/Learned */}
          <Motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Sessions Learned</p>
                <p className="text-2xl font-bold text-slate-900">{profile?.totalSessionsLearned}</p>
              </div>
            </div>
          </Motion.div>

          {/* Location Status */}
          <Motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Location</p>
                <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {profile?.locationPrecision || "Active"}
                </p>
              </div>
            </div>
          </Motion.div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Upcoming Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Upcoming Sessions
                </h2>
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
              </div>
              
              <div className="divide-y divide-slate-100">
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map((session) => (
                    <div key={session.id} className="p-6 hover:bg-slate-50 transition flex items-center justify-between group">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold ${
                          session.type === 'TEACHING' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {session.partner.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{session.skill}</h4>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            with {session.partner} • <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">{session.type}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-sm text-slate-600 mb-1">
                          <Clock size={14} />
                          {session.time}
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          session.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    No upcoming sessions. Go find a mentor!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions / Suggestions */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">Want to earn Reputation?</h3>
              <p className="text-indigo-100 text-sm mb-4">
                Teach a skill to someone nearby to increase your score and unlock badges.
              </p>
              <button className="w-full bg-white text-indigo-600 py-2.5 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-sm">
                Share a Skill
              </button>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                My Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 cursor-pointer transition">
                  Java
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 cursor-pointer transition">
                  Spring Boot
                </span>
                <button className="px-3 py-1 border border-dashed border-slate-300 text-slate-400 rounded-full text-sm font-medium hover:text-indigo-600 hover:border-indigo-600 transition">
                  + Add Skill
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}