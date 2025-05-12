import { useState, useEffect } from "react";
import { getAllStudents } from "../services/oprations/student";

export default function StatsSlider() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getAllStudents();
        setStudents(data);

        const recentStudents = data.filter((student) => {
          const createdAt = new Date(student.createdAt);
          const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return createdAt > sevenDaysAgo;
        });

        const courseCounts = {};
        data.forEach((s) => {
          courseCounts[s.Course] = (courseCounts[s.Course] || 0) + 1;
        });
        const mostPopularCourse =
          Object.entries(courseCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
          "N/A";

        const totalStudents = data.length;
        const classGroups = {};
        data.forEach((s) => {
          classGroups[s.Class] = (classGroups[s.Class] || 0) + 1;
        });
        const avgClassSize = (
          totalStudents / Object.keys(classGroups).length
        ).toFixed(1);

        setStats([
          {
            title: "Total Students",
            value: totalStudents.toString(),
            icon: "🎓",
          },
          {
            title: "Recent Students (7d)",
            value: recentStudents.length.toString(),
            icon: "🆕",
          },
          {
            title: "Most Popular Course",
            value: mostPopularCourse,
            icon: "📚",
          },
          {
            title: "Avg Class Size",
            value: avgClassSize,
            icon: "🏫",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [stats.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 p-4 flex justify-center items-center overflow-hidden w-full">
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-hidden">
        <div className="relative overflow-hidden rounded-lg shadow-xl w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col items-center justify-center p-6"
              >
                <div className="flex flex-col items-center text-center rounded-xl w-full">
                  <div className="text-3xl sm:text-4xl">{stat.icon}</div>
                  <h2 className="text-xl sm:text-2xl font-semibold mt-2">
                    {stat.value}
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {stat.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Button */}
        <button
          onClick={() =>
            setActiveSlide((prev) => (prev - 1 + stats.length) % stats.length)
          }
          className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white/50 hover:bg-white/70 rounded-full p-2 transition-all shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Right Button */}
        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % stats.length)}
          className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white/50 hover:bg-white/70 rounded-full p-2 transition-all shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
