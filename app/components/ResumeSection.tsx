import React from "react";

export default function ResumeSection() {
  return (
    <section id="resume" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Resume</h2>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-xl font-semibold mb-2">Bhuvan</h3>
          <p className="mb-4 text-gray-700">Game Developer & Designer</p>
          <div className="mb-4">
            <h4 className="font-semibold">Skills</h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Unity, Unreal Engine</li>
              <li>JavaScript, TypeScript, C#</li>
              <li>Game Design & Prototyping</li>
              <li>UI/UX for Games</li>
              <li>Procedural Generation</li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Experience</h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Indie Game Developer (2022–Present)</li>
              <li>Freelance Game Designer (2021–2022)</li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Education</h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Bachelor’s in Computer Science</li>
            </ul>
          </div>
          <div className="text-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[#6C63FF] text-white rounded hover:bg-[#5548c8] transition"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}