import { useState } from "react";
import { Link } from "react-router-dom";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    fullName: "",
    email: "",
    issueType: "pvc",
    pvcNumber: "",
    message: "",
  });

  const categories = [
    { id: "all", label: "All Support Articles", icon: "help_center" },
    { id: "pvc", label: "PVC & Registration", icon: "badge" },
    { id: "polling", label: "Polling Unit Locator", icon: "pin_drop" },
    { id: "bvas", label: "BVAS & Accreditation", icon: "fingerprint" },
    { id: "results", label: "Live Results & IReV", icon: "analytics" },
  ];

  const helpArticles = [
    {
      id: "art-1",
      category: "pvc",
      title: "How to transfer your voting location or PVC to a new LGA",
      readTime: "3 min read",
      summary:
        "Step-by-step instructions for initiating an online or physical polling unit transfer request prior to voter register closure.",
      icon: "swap_horiz",
    },
    {
      id: "art-2",
      category: "pvc",
      title: "What to do if your PVC is lost, damaged, or uncollected",
      readTime: "4 min read",
      summary:
        "Guidelines for requesting replacement cards, checking collection center schedules, and tracking card printing status.",
      icon: "card_membership",
    },
    {
      id: "art-3",
      category: "polling",
      title: "Locating your exact Polling Unit code and ward boundary",
      readTime: "2 min read",
      summary:
        "Understanding state, LGA, and ward code sequences printed on your voter card to pinpoint your assigned voting booth.",
      icon: "map",
    },
    {
      id: "art-4",
      category: "bvas",
      title: "Biometric accreditation rules and facial verification steps",
      readTime: "5 min read",
      summary:
        "How BVAS authentication handles fingerprint sensor retries, facial recognition fallbacks, and manual registration checks.",
      icon: "fingerprint",
    },
    {
      id: "art-5",
      category: "results",
      title: "How Form EC8A is uploaded and verified on the IReV portal",
      readTime: "4 min read",
      summary:
        "An explanation of the transparent digital result chain from polling unit polling clerks directly to public viewing servers.",
      icon: "cloud_upload",
    },
  ];

  const faqs = [
    {
      id: "faq-1",
      question: "Can I vote without my physical PVC if I know my VIN?",
      answer:
        "No. By statutory regulation under the Electoral Act, physical Permanent Voter Cards (PVCs) are strictly required for accreditation through the BVAS scanner. Digital copies, VIN printouts, or temporary slips will not be accepted at polling units.",
    },
    {
      id: "faq-2",
      question: "What should I do if my Polling Unit location has changed?",
      answer:
        "Check your current assigned polling unit using our Polling Unit Locator or verify your status on the official voter portal. If a polling unit decongestion split occurred, your updated PU details will be reflected against your Voter Identification Number (VIN).",
    },
    {
      id: "faq-3",
      question:
        "Who should I report to if I witness election day irregularities?",
      answer:
        "You can report election day incidents, technical BVAS delays, or security concerns directly through our Emergency Incident Hotline or via accredited election observer channels listed on this support portal.",
    },
    {
      id: "faq-4",
      question: "Where can I view official certified election results?",
      answer:
        "Official results are uploaded live from polling units on Form EC8A to the INEC Result Viewing Portal (IReV) and aggregated on our Live Results Dashboard.",
    },
  ];

  const filteredArticles = helpArticles.filter((art) => {
    const matchesCategory =
      selectedCategory === "all" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.fullName || !ticketForm.email || !ticketForm.message)
      return;
    setTicketSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner Section */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container-high border border-outline-variant/60 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">
                support_agent
              </span>
              Voter Support & Assistance Desk
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              How can we help you vote?
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Find answers to common PVC verification questions, locate polling
              units, learn BVAS rules, or submit a support inquiry directly to
              our team.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative max-w-xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search articles (e.g., 'PVC transfer', 'BVAS issue', 'find polling unit')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/60 rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary shadow-xs"
            />
          </div>
        </div>

        {/* Emergency Assistance Hotline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-2xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-xl">call</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                Toll-Free Hotline
              </span>
              <h3 className="font-bold text-sm text-on-surface mt-0.5">
                0800-CALL-CIVIC
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Mon - Sat, 8:00 AM - 6:00 PM (24/7 on Election Days)
              </p>
            </div>
          </div>

          <div className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-2xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-xl">forum</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                Live WhatsApp Support
              </span>
              <h3 className="font-bold text-sm text-on-surface mt-0.5">
                +234 700 248 4235
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Automated PVC lookup bot & agent escalation
              </p>
            </div>
          </div>

          <div className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-2xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-xl">
                mark_email_read
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                Official Email Desk
              </span>
              <h3 className="font-bold text-sm text-on-surface mt-0.5">
                support@elections-portal.gov.ng
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Guaranteed response within 24 business hours
              </p>
            </div>
          </div>
        </div>

        {/* Knowledgebase Category Tabs & Articles */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/60 pb-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles List */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 hover:border-outline transition-colors space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1 text-primary font-bold">
                        <span className="material-symbols-outlined text-base">
                          {art.icon}
                        </span>
                        Article
                      </span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="font-bold text-sm text-on-surface leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-outline-variant/30 text-xs font-bold text-primary hover:underline cursor-pointer inline-flex items-center gap-1">
                    Read Knowledgebase Article
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-surface-container-lowest border border-outline-variant/60 rounded-2xl text-xs text-on-surface-variant">
              No support articles match your search keywords. Try adjusting your
              search query or submit a direct ticket below.
            </div>
          )}
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface">
              <span className="material-symbols-outlined text-primary text-lg">
                help_outline
              </span>
              Common Support Questions
            </div>
            <Link
              to="/voting-guidelines"
              className="text-xs font-bold text-primary hover:underline"
            >
              View Full Voting Guidelines &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-outline-variant/60 rounded-2xl overflow-hidden bg-surface-container-low"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-on-surface flex items-center justify-between gap-3"
                  >
                    <span>{faq.question}</span>
                    <span className="material-symbols-outlined text-lg shrink-0 text-on-surface-variant">
                      {isOpen ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/30 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Support Inquiry / Ticket Submission Form */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="material-symbols-outlined text-base">send</span>
              Direct Support Assistance
            </div>
            <h2 className="text-xl font-extrabold text-on-surface tracking-tight mt-1">
              Submit a Support Request
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Cannot find what you are looking for? Send us a message and an
              accredited support representative will respond shortly.
            </p>
          </div>

          {ticketSubmitted ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-emerald-700">
                task_alt
              </span>
              <h3 className="font-extrabold text-base text-emerald-900">
                Support Inquiry Received!
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Thank you, <strong>{ticketForm.fullName}</strong>. Your ticket
                reference code is{" "}
                <span className="font-mono font-bold">
                  #CIV-{Math.floor(100000 + Math.random() * 900000)}
                </span>
                . A confirmation email has been sent to{" "}
                <strong>{ticketForm.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setTicketSubmitted(false);
                  setTicketForm({
                    fullName: "",
                    email: "",
                    issueType: "pvc",
                    pvcNumber: "",
                    message: "",
                  });
                }}
                className="text-xs font-bold text-primary hover:underline pt-2 inline-block"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Jane Doe"
                    value={ticketForm.fullName}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, fullName: e.target.value })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={ticketForm.email}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, email: e.target.value })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Category
                  </label>
                  <select
                    value={ticketForm.issueType}
                    onChange={(e) =>
                      setTicketForm({
                        ...ticketForm,
                        issueType: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="pvc">PVC Verification & Cards</option>
                    <option value="polling">Polling Unit Location Issue</option>
                    <option value="bvas">BVAS & Election Day Guidance</option>
                    <option value="tech">Platform Bug / Accessibility</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    VIN or PVC Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="90F5B..."
                    value={ticketForm.pvcNumber}
                    onChange={(e) =>
                      setTicketForm({
                        ...ticketForm,
                        pvcNumber: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Describe Your Issue *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide clear details regarding your inquiry or issue..."
                  value={ticketForm.message}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, message: e.target.value })
                  }
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl p-3.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-primary text-on-primary font-bold text-xs px-6 py-3 rounded-xl hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  send
                </span>
                Submit Ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
