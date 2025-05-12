import { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { getAllStudents } from "../services/oprations/student";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
);

export default function Charts() {
  const [students, setStudents] = useState([]);
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const fetchAndPrepare = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);

        // LINE CHART: Student Registrations in the Last 7 Days
        const last7Days = Array.from({ length: 7 }).map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date.toISOString().split("T")[0];
        });

        const registrationsPerDay = last7Days.map(
          (day) => data.filter((s) => s.createdAt.startsWith(day)).length
        );

        setLineChartData({
          labels: last7Days,
          datasets: [
            {
              label: "New Registrations",
              data: registrationsPerDay,
              borderColor: "#4F46E5",
              backgroundColor: "rgba(79,70,229,0.3)",
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#4F46E5",
            },
          ],
        });

        // PIE CHART: Student Distribution by Course
        const courseCounts = {};
        data.forEach((s) => {
          courseCounts[s.Course] = (courseCounts[s.Course] || 0) + 1;
        });

        const courseNames = Object.keys(courseCounts);
        const courseValues = Object.values(courseCounts);

        const dynamicColors = courseNames.map((_, i) => {
          const baseColors = [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#F67280",
            "#6A0572",
          ];
          return baseColors[i % baseColors.length];
        });

        setPieChartData({
          labels: courseNames,
          datasets: [
            {
              label: "Students per Course",
              data: courseValues,
              backgroundColor: dynamicColors,
              borderColor: "#ffffff",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };

    fetchAndPrepare();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-bold mb-2">
          Student Registrations (Last 7 Days)
        </h3>
        {lineChartData ? (
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { mode: "index", intersect: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Registrations" },
                },
              },
            }}
          />
        ) : (
          <p className="text-gray-500">Loading chart...</p>
        )}
      </div>

      <div className="p-4 w-[300px] bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-bold mb-2">
          Student Distribution by Course
        </h3>
        {pieChartData ? (
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "right" },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${context.label}: ${context.raw} students`;
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <p className="text-gray-500">Loading chart...</p>
        )}
      </div>
    </div>
  );
}
