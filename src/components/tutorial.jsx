import React, { useState, useEffect } from "react";
import {
  UserPlus,
  MessageSquareText,
  Sparkles,
  LineChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Shadcn/ui imports
// These components are assumed to be available from the shadcn library
const Card = ({ className, children }) => <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>{children}</div>;
const CardHeader = ({ className, children }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ className, children }) => <h3 className={`font-semibold leading-none tracking-tight text-xl ${className}`}>{children}</h3>;
const CardDescription = ({ className, children }) => <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
const Badge = ({ className, children }) => <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>{children}</div>;


const steps = [
  {
    title: "Sign Up",
    description:
      "Create an account and enter your medical details like age, weight, and diabetes type.",
    icon: <UserPlus className="w-10 h-10 text-red-700" />,
  },
  {
    title: "Chat with GlucoMate",
    description:
      "Ask questions and get responses based on your personal health profile.",
    icon: <MessageSquareText className="w-10 h-10 text-red-700" />,
  },
  {
    title: "Get Personalized Advice",
    description:
      "Receive AI-driven recommendations tailored to your health needs.",
    icon: <Sparkles className="w-10 h-10 text-red-700" />,
  },
  {
    title: "Track Progress",
    description:
      "Monitor your improvements and adapt your habits over time.",
    icon: <LineChart className="w-10 h-10 text-red-700" />,
  },
];

const HowItWorksSection = () => {
  const [index, setIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % steps.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <section className="py-20 bg-red-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-red-800 mb-6">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          GlucoMate is simple to use. Just follow these steps to start your
          journey toward smarter diabetes care.
        </p>

        <div className="relative flex justify-center items-center">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 p-3 bg-white border border-red-300 rounded-full shadow hover:bg-red-100 transition transform active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-red-700" />
          </button>

          {/* Current Step Card */}
          <Card className="w-full max-w-xl border-red-200 transition-all duration-700 ease-in-out">
            <CardHeader className="items-center">
              <Badge className="mb-4 bg-red-100 text-red-700 border-red-300">
                Step {index + 1}
              </Badge>
              <div className="flex justify-center mb-4">{steps[index].icon}</div>
              <CardTitle className="text-gray-800 mb-2">
                {steps[index].title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {steps[index].description}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 p-3 bg-white border border-red-300 rounded-full shadow hover:bg-red-100 transition transform active:scale-95"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-red-700" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {steps.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                i === index ? "bg-red-700 w-5" : "bg-red-300 w-3"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
