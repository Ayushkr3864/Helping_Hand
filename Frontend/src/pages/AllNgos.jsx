import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { ngoList } from "../data/ngos";

function AllNgos() {
  const [query, setQuery] = useState("");

  const filteredNgos = useMemo(() => {
    const searchText = query.trim().toLowerCase();
    if (!searchText) return ngoList;

    return ngoList.filter((ngo) => {
      return (
        ngo.name.toLowerCase().includes(searchText) ||
        ngo.location.toLowerCase().includes(searchText) ||
        ngo.focus.some((item) => item.toLowerCase().includes(searchText))
      );
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#081118_0%,#0d1821_42%,#f7fafc_42%,#f7fafc_100%)]">
      <section className="relative overflow-hidden pb-20 pt-16 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-6%] top-0 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="absolute right-[-4%] top-24 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/6 px-4 py-2 text-sm text-emerald-200 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Explore NGOs
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Discover organizations creating meaningful local impact.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Browse NGOs by mission, location, and focus area. The layout is
              ready for future API data, but already gives you a polished public
              directory experience now.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-10 grid gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-5 backdrop-blur md:grid-cols-[1fr_auto]"
          >
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
              <Search className="h-5 w-5 text-emerald-200" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by NGO name, city, or focus"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 px-5 py-3 text-sm font-semibold text-emerald-200">
              {filteredNgos.length} NGOs found
            </div>
          </motion.div>
        </div>
      </section>

      <section className="-mt-6 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredNgos.map((ngo, idx) => (
              <motion.article
                key={ngo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
              >
                <div className={`bg-gradient-to-br ${ngo.accent} p-6`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-slate-950 p-3 text-emerald-300 shadow-lg">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                      {ngo.impact}
                    </div>
                  </div>

                  <h2 className="mt-10 text-2xl font-bold text-slate-950">
                    {ngo.name}
                  </h2>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                    <MapPin className="h-4 w-4" />
                    {ngo.location}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-7 text-slate-600">
                    {ngo.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {ngo.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between rounded-[1.5rem] bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="rounded-xl bg-white p-2 shadow-sm">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{ngo.volunteers}</span>
                    </div>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-600">
                      View NGO
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredNgos.length === 0 && (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <h3 className="text-2xl font-bold text-slate-900">
                No NGOs matched your search
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Try a different keyword like education, healthcare, or a city
                name.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AllNgos;
