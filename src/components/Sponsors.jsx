const sponsors = [
  {
    name: "Eyeneck Official",
    category: "Electoral Commission",
    icon: "verified",
    logo: "sponsor1.png",
  },
  {
    name: "Cyber Nig Security",
    category: "Infrastructure Oversight",
    icon: "shield",
    logo: "sponsor2.png",
  },
  {
    name: "AfriVote Systems",
    category: "Biometric Certification",
    icon: "how_to_vote",
    logo: "sponsor3.png",
  },
  {
    name: "Democracy Watch",
    category: "Civil Society Observer",
    icon: "visibility",
    logo: "sponsor4.png",
  },
];

export default function Sponsors() {
  return (
    <section className="bg-surface-container-low border-y border-outline-variant/60 py-10 px-4 sm:px-8">
      <div className="max-w-container-max mx-auto text-center space-y-6">
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
          Endorsed by Official Electoral & Civil Oversight Bodies
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-xs hover:border-outline transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {sponsor.icon}
                </span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-on-surface truncate">
                  {sponsor.name}
                </h4>
                <p className="text-[10px] text-on-surface-variant font-medium truncate mt-0.5">
                  {sponsor.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}