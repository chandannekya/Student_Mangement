import heroImage from "../assets/Storage-Management-Dashboard-Template-1536x1075-removebg-preview (1).png";
const HeroSection = () => {
  return (
    <section className="pt-8 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Tagline */}
        <div className="border border-indigo-600 p-1 w-64 mx-auto rounded-full flex items-center justify-between mb-4">
          <span className="font-inter text-xs font-medium text-gray-900 ml-3">
            Manage students efficiently.
          </span>
          <a
            href="#"
            className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Title */}
        <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
          Empower Your Institution with
          <span className="text-indigo-600"> Student Management Tools </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
          Track academic records, streamline admissions, and enhance student
          success with our all-in-one solution.
        </p>

        {/* Buttons */}
        <div className="flex justify-center md:flex-row flex-col gap-4">
          <a
            href="/signup"
            className="w-full md:w-auto inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-white rounded-full bg-indigo-600 shadow-xs hover:bg-indigo-700 transition-all duration-500"
          >
            Create an account
            <svg
              className="ml-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="/signin"
            className="w-full md:w-auto inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-indigo-600 border border-indigo-600 rounded-full shadow-xs hover:bg-indigo-600 hover:text-white transition-all duration-500"
          >
            Login
          </a>
        </div>

        {/* Image */}
        <div className="flex justify-center  mt-10">
          <img
            src="https://rsvpify.com/wp-content/uploads/2023/05/Dashboard-Illustration1-1024x667.png"
            alt="Student Dashboard Preview"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
