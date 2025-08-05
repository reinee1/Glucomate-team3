import React from "react";

const funFacts = [
  {
    fact: "Regular exercise can improve insulin sensitivity and blood sugar control.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    fact: "People with diabetes are twice as likely to develop heart disease.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    fact: "Monitoring blood sugar regularly helps prevent complications.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    fact: "A balanced diet with low glycemic index foods can help stabilize blood sugar.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    fact: "Stress management plays a key role in diabetes control.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 12.728l-.707-.707M12 21v-1m-4.663-1.663l-.707.707M5 12h1m-1-1v1H3m1-1v1h-1m1-1v1H3m1-1v1h-1m1-1v1H3m1-1v1h-1"
        />
      </svg>
    ),
  },
];

const FunFactsSection = () => {
  return (
    <section
      id="fun-facts"
      className="mt-24 max-w-4xl mx-auto px-6 py-12"
    >
      <h2 className="text-4xl font-bold mb-8 text-center text-red-800">
        Essential Facts for Your Health
      </h2>
      <div className="space-y-6">
        {funFacts.map((item, i) => (
          <div
            key={i}
            className="flex items-start p-6 bg-red-100 rounded-lg shadow-sm border border-red-200 hover:border-red-600 transition-colors duration-300"
          >
            <div className="mr-4 mt-1 flex-shrink-0">{item.icon}</div>
            <p className="text-gray-800 text-lg">{item.fact}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FunFactsSection;
