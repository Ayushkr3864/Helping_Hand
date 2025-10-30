import React, { useState, useEffect } from "react";
import { delay, motion } from "framer-motion";
import { Heart, Users, Book, Leaf, Stethoscope } from "lucide-react";
import hand from "../assets/hand.png";
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const programs = [
    {
      title: "Annapurna Sewa",
      desc: "Weekly/biweekly food distribution drives.",
      icon: Heart,
    },
    {
      title: "Pathshala 51",
      desc: "Free JNV entrance coaching for 51 underprivileged students.",
      icon: Book,
    },
    {
      title: "Environment Care",
      desc: "Plantation drives & cleanliness campaigns.",
      icon: Leaf,
    },
    {
      title: "Donation Drives",
      desc: "Books, clothes, and essentials collection & distribution.",
      icon: Users,
    },
    {
      title: "Healthcare & Hygiene",
      desc: "Basic health checkups and hygiene kit distribution.",
      icon: Stethoscope,
    },
  ];

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setHidden(window.scrollY > 100);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="relative h-[90vh] sm:h-screen  bg-center flex items-center"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: "cover",
        }} // place image in /public
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 md:max-w-xl px-4 sm:px-6 text-left text-white ">
          <motion.img
            src="/heart-unscreen.gif"
            alt="hand"
            className="md:h-30 md:w-60 h-20 w-30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Helping <br /> Hand <br /> Foundation
          </motion.h1>
          <motion.p
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-medium"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            Small Steps. Big Change. 🌍
          </motion.p>
          <motion.p
            className="mt-2 text-sm sm:text-base md:text-lg"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.1 }}
          >
            Youth-led non-profit initiative serving underprivileged communities
            with food, education, healthcare, and dignity.
          </motion.p>

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.button
              onClick={() => navigate("/login")}
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg font-semibold text-sm sm:text-base"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 1.3 }}
            >
              Donate Now
            </motion.button>{" "}
            <motion.button
              whileHover={{scale:1.2,}}
              onClick={() => {token?navigate("/dashboard"):navigate("/login")}}
              className="bg-white hover:bg-gray-100 text-green-700 px-5 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg font-semibold text-sm sm:text-base"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 1.3 }}
            >
              Dashboard
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="programs" className=" sm:py-5 px-4 mt-10 mb-10 ">
        <div className="bg-[#26344a] rounded-2xl p-5 shadow-[0_0px_3px_#d0d0d1] hover:shadow-[0_6px_16px_#d0d0d1]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#64ffda] sm:mb-5">
            Who We Are
          </h1>
          <p className="text-center text-[#e6f1ff]">
            "We started with small food distribution drives and today have
            expanded into education, healthcare, environment, and community
            development."
          </p>
        </div>
      </section>

      {/* Programs Section (optional, uncomment if you want) */}
      <section id="programs" className="py-12 sm:py-16 px-4 bg-[#26344a]">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-700 mb-6 sm:mb-10">
          Our Core Programs
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {programs.map((program, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              key={idx}
              className="rounded-2xl shadow-[0_2px_2px_#d0d0d1] hover:shadow-[0_6px_16px_#d0d0d1] transition"
            >
              <div className="p-6 text-center">
                <program.icon className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto" />
                <h4 className="mt-4 font-semibold text-lg text-[#64ffda] sm:text-xl">
                  {program.title}
                </h4>
                <p className="text-[#e6f1ff] mt-2 text-sm sm:text-base">
                  {program.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* mission section */}
      <section id="programs" className=" sm:py-5 px-4 ">
        <motion.div
          className="bg-[#26344a] rounded-2xl py-5 mt-10 shadow-[0_2px_6px_#d0d0d1] hover:shadow-[0_6px_16px_#d0d0d1]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#64ffda] sm:mb-5">
            Our Mission
          </h1>
          <p className="text-center text-[#e6f1ff]">
            “To serve underprivileged communities by providing food, education,
            healthcare, and dignity—while promoting compassion and equality.”
          </p>
        </motion.div>
      </section>
      <section id="programs" className=" sm:py-5 px-4 mt-10 md:mt-0 ">
        <motion.div
          className="bg-[#26344a] rounded-2xl py-5 shadow-[0_2px_6px_#d0d0d1] hover:shadow-[0_6px_16px_#d0d0d1]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#64ffda] sm:mb-5">
            Our Vision
          </h1>
          <p className="text-center text-[#e6f1ff]">
            “We envision a society where no one sleeps hungry, every child
            learns with opportunity, and communities grow with hope.”
          </p>
        </motion.div>
      </section>
    </>
  );
}

export default Hero;
