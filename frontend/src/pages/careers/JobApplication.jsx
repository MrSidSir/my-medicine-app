import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Modal from "../../components/common/Modal";

const JobApplication = () => {
  const [form, setForm] = useState({ name: "", email: "", resume: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application Submitted:", form);
  };

  return (
    <Modal title="Apply for Job">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="resume"
          placeholder="Resume Link"
          className="w-full border p-2 rounded"
          value={form.resume}
          onChange={handleChange}
        />
        <Button type="submit">Submit Application</Button>
      </form>
    </Modal>
  );
};

export default JobApplication;
