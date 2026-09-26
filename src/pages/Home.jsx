import Features from "../components/Features";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Sponsors from "../components/Sponsors";
import ActiveElections from "../components/ActiveElections";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import Candidates from "../components/Candidates";

import "../App.css";



export default function Home() {
  
  
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sponsors />
        <Features />
        <ActiveElections />
        <Candidates />

        <section className="py-24 bg-background">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex-1">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
                  Upcoming Electoral Milestones
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
                        <span className="material-symbols-outlined">
                          how_to_reg
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">
                          Presidential Primary Elections
                        </p>
                        <p className="text-sm text-on-surface-variant">
                          February 15, 2027
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">
                      chevron_right
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
                        <span className="material-symbols-outlined">
                          campaign
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">
                          Official Campaign Commencement
                        </p>
                        <p className="text-sm text-on-surface-variant">
                          March 01, 2027
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">
                      chevron_right
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-96 bg-primary text-on-primary p-8 rounded-4xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <p className="text-label-lg uppercase tracking-widest mb-4 opacity-80">
                  Next Major Event In:
                </p>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-black">142</div>
                    <div className="text-[10px] uppercase">Days</div>
                  </div>
                  <div className="text-2xl opacity-50">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-black">08</div>
                    <div className="text-[10px] uppercase">Hours</div>
                  </div>
                  <div className="text-2xl opacity-50">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-black">22</div>
                    <div className="text-[10px] uppercase">Mins</div>
                  </div>
                </div>
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-2/3"></div>
                </div>
                <p className="mt-4 text-sm text-on-primary/80">
                  Presidential Primaries
                </p>
              </div>
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
