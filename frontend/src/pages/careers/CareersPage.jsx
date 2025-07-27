import React from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ChatWidget from "../../components/common/ChatWidget";

const CareersPage = () => {
  const jobList = [
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full Time",
      description: "Work with React.js and Tailwind to build user-friendly healthcare applications.",
    },
    {
      title: "Pharmacist",
      location: "New Delhi, India",
      type: "On-Site",
      description: "Dispense medicines and assist customers with accurate healthcare information.",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-4">Careers at MediStore</h1>
      <p className="text-lg text-center mb-8">
        Join us in revolutionizing digital healthcare.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobList.map((job, index) => (
          <Card key={index}>
            <h2 className="text-2xl font-semibold mb-1">{job.title}</h2>
            <p className="text-sm text-gray-600 mb-1">{job.location} • {job.type}</p>
            <p className="mb-3">{job.description}</p>
            <Button>Apply Now</Button>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <ChatWidget />
      </div>
    </div>
  );
};

export default CareersPage;
