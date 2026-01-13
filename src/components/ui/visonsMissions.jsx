import React from "react";

export default function MissionVisionSection() {
  return (
    <div className="py-12 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.9c-.43.43-.43 1.13 0 1.56l3.58 3.58c.43.43 1.13.43 1.56 0l.9-.9c.43-.43.43-1.13 0-1.56l-3.58-3.58c-.43-.43-1.13-.43-1.56 0zm-4.24-4.24l-.9.9c-.43.43-.43 1.13 0 1.56l3.58 3.58c.43.43 1.13.43 1.56 0l.9-.9c.43-.43.43-1.13 0-1.56L12.34 6.34c-.43-.43-1.13-.43-1.56 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To simplify property rentals by creating a transparent, <br /> secure platform that empowers both property owners and <br /> guests to connect directly and confidently.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-2.67 0-5.2-1.13-7.03-3.03L12 14.1l7.03 2.83C17.2 18.87 14.67 20 12 20zm0-10c-2.67 0-5.2-1.13-7.03-3.03L12 4.1l7.03 2.83C17.2 8.87 14.67 10 12 10zm0 6c-1.1 0-2.1-.4-2.85-1.15L12 14.1l2.85 1.15C13.9 15.6 12.9 16 12 16z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the most trusted property rental platform 
              <br />where quality meets simplicity, setting new standards for <br /> transparency and user experience in the industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}