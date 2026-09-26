import { useState } from "react";

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Sample FAQ Data
  const faqs = [
    {
      id: 1,
      question: "How do I reset my account password?",
      answer:
        'Go to the Security tab in your Settings or click "Forgot Password" on the login screen. We will send a secure reset link to your registered email address.',
    },
    {
      id: 2,
      question: "How can I update my profile details or email address?",
      answer:
        'You can update your name, phone number, and preferences under the "Profile Information" tab. For primary email changes, you may be prompted to verify the new address.',
    },
    {
      id: 3,
      question: "How long does customer support take to respond?",
      answer:
        "Our typical response time for support tickets is within 24 hours. Priority accounts receive expedited support within 2 to 4 hours.",
    },
  ];

  // Filter FAQs based on search input
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => setTicketSubmitted(false), 4000);
  };

  return (
    <div className="space-y-10">
      {/* 1. Header & Search Bar */}
      <div className="bg-linear-to-r from-bg-surface-container-lowest-600 to-bg-surface-container-lowest-800 rounded-xl p-8 text-on-surface shadow-md text-center md:text-left md:flex md:items-center md:justify-between">
        <div className="mb-6 md:mb-0 max-w-lg">
          <h2 className="text-2xl font-bold mb-2 text-on-surface-variant">
            How can we help you?
          </h2>
          <p className="text-on-surface-variant text-sm">
            Search our knowledge base or browse frequently asked questions
            below.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-gray-900 placeholder-gray-500 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* 2. Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer bg-white">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            Documentation
          </h3>
          <p className="text-gray-500 text-sm">
            Read comprehensive guides and API references.
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer bg-white">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            Community Forum
          </h3>
          <p className="text-gray-500 text-sm">
            Connect with other developers and share ideas.
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer bg-white">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            Direct Contact
          </h3>
          <p className="text-gray-500 text-sm">
            Get in touch directly with our dedicated support team.
          </p>
        </div>
      </div>

      {/* 3. Frequently Asked Questions Accordion */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-sm text-gray-600 border-t border-gray-100 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm italic">
              No matching questions found.
            </p>
          )}
        </div>
      </div>

      {/* 4. Submit a Support Ticket Form */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Still need help? Send us a message
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Fill out the form below and our team will get back to you within 24
          hours.
        </p>

        {ticketSubmitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-sm font-medium flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Thank you! Your ticket has been submitted. We will reply via email
            shortly.
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Account Access Issue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Priority
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                  <option value="low">Low - General Question</option>
                  <option value="medium">Medium - Functional Issue</option>
                  <option value="high">High - Urgent / Account Blocked</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Description
              </label>
              <textarea
                rows="4"
                required
                placeholder="Describe your issue or question in detail..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary/90 hover:bg-primary text-surface font-medium text-sm rounded-lg shadow-sm transition-colors"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
