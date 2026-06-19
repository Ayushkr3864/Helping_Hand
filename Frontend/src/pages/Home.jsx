import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Book,
  Heart,
  Leaf,
  LayoutDashboard,
  LogIn,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

const programs = [
  {
    title: "Annapurna Sewa",
    desc: "Weekly and biweekly food distribution drives for families who need dependable support.",
    icon: Heart,
  },
  {
    title: "Pathshala 51",
    desc: "Free JNV entrance coaching that opens real academic opportunity for underserved students.",
    icon: Book,
  },
  {
    title: "Environment Care",
    desc: "Plantation and cleanliness campaigns that build healthier neighborhoods together.",
    icon: Leaf,
  },
  {
    title: "Donation Drives",
    desc: "Books, clothes, and essentials collected and delivered with dignity.",
    icon: Users,
  },
  {
    title: "Healthcare and Hygiene",
    desc: "Basic health checkups and hygiene-kit access for vulnerable communities.",
    icon: Stethoscope,
  },
];

const impactStats = [
  { value: "5+", label: "active community programs" },
  { value: "Youth-led", label: "built by volunteers and local action" },
  { value: "Year-round", label: "support across food, education, and care" },
];

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-[#081118] text-white">
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/image.png')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,17,24,0.94),rgba(8,17,24,0.82),rgba(8,17,24,0.55))]" />
          <div className="absolute left-[-10%] top-[-10%] h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute bottom-[-5%] right-[-5%] h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <motion.div
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-white/5 px-4 py-2 text-sm text-emerald-200 backdrop-blur"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4" />
              Small steps. Big change.
            </motion.div>

            <motion.h1
              className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-7xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Helping Hand Foundation builds community support with action, not just promises.
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              We are a youth-led non-profit serving underprivileged communities through food distribution, education, healthcare, and dignity-driven outreach.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button
                onClick={() => navigate(isLoggedIn ? "/dashboard/donate" : "/login")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300"
              >
                {isLoggedIn ? "Donate Now" : "Login to Donate"}
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                {isLoggedIn ? (
                  <>
                    <LayoutDashboard className="h-4 w-4" />
                    Go to Dashboard
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Login
                  </>
                )}
              </button>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-4 sm:grid-cols-3"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              {impactStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur"
                >
                  <p className="text-2xl font-bold text-emerald-300">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="flex items-end lg:justify-end"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/30 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/75">
                    Our Promise
                  </p>
                  <h2 className="text-2xl font-bold">Compassion with consistency</h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
                <p>
                  We began with simple food drives and grew into a wider mission across education, healthcare, environmental care, and community development.
                </p>
                <p>
                  Every program is designed to be practical, local, and human-first so support feels reachable, respectful, and real.
                </p>
              </div>

              <div className="mt-6 rounded-3xl bg-slate-950/55 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/75">
                  Vision
                </p>
                <p className="mt-3 text-base leading-7 text-white">
                  A society where no one sleeps hungry, every child learns with opportunity, and communities grow with hope.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
            Who We Are
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Local action that stays grounded in dignity
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Helping Hand Foundation focuses on direct, people-centered support. We meet urgent needs while creating room for longer-term growth through learning, health, and collective care.
          </p>
        </div>
      </section>

      <section className="bg-[#0d1821] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                Core Programs
              </p>
              <h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Practical support across the issues that matter most
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              Each initiative is built to serve a real need in the community and deliver help with continuity, care, and trust.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {programs.map((program, idx) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 transition hover:-translate-y-1 hover:border-emerald-300/20 hover:shadow-xl hover:shadow-emerald-900/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300 transition group-hover:bg-emerald-400/20">
                  <program.icon className="h-7 w-7" />
                </div>
                <h4 className="mt-5 text-xl font-semibold text-white">{program.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">{program.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
