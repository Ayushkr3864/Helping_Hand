import React from "react";
import { motion } from "framer-motion";
import founder from "../assets/founder.png"

const About = () => {
  // Variants for animations
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const teamFade = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#112240] text-[#e6f1ff] px-6 py-12">
      {/* Page Title */}
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-[#64ffda] mb-12"
      >
        About Us
      </motion.h1>

      {/* Founder Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.9 }}
        className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-8 mb-16"
      >
        <motion.img
          src={founder}
          alt="Founder - Sarvesh Tripathi"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="w-76 h-76 rounded-2xl   border-4 border-[#64ffda]  shadow-lg"
        />
        <div className="max-w-2xl">
          <h3 className="text-2xl font-semibold text-[#64ffda] mb-2">
            Sarvesh Tripathi – Founder
          </h3>
          <p className="text-lg leading-relaxed text-[#e6f1ff]/90">
            “When we started Helping Hand Foundation in 2025, it was with the
            belief that no small step is ever wasted. From distributing food on
            the streets to coaching children and planting trees, each effort is
            a building block toward a brighter, kinder tomorrow. I invite every
            young dreamer to join hands with us and create the change we wish to
            see in the world.”
          </p>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl font-bold text-center text-[#64ffda] mb-8"
      >
        Meet Our Team
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            name: "Rahul Sharma",
            role: "Program Coordinator – Annapurna Sewa",
            quote:
              "Feeding people is more than food, it’s about dignity and compassion.",
            img: "member1.jpg",
          },
          {
            name: "Pooja Verma",
            role: "Lead – Pathshala 51",
            quote:
              "Every child has the right to dream, and education is the key to unlock it.",
            img: "member2.jpg",
          },
          {
            name: "Amit Singh",
            role: "Environment Care Head",
            quote: "Planting a tree today is planting hope for tomorrow.",
            img: "member3.jpg",
          },
          {
            name: "Neha Gupta",
            role: "Healthcare & Hygiene Coordinator",
            quote:
              "Good health and hygiene are the foundation of human dignity.",
            img: "member4.jpg",
          },
        ].map((member, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg"
            variants={teamFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, y: -6 }}
          >
            <motion.img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 mx-auto rounded-full object-cover border-2 border-[#64ffda] mb-4"
              whileHover={{ rotate: 6 }}
            />
            <h3 className="text-xl font-semibold text-[#64ffda]">
              {member.name}
            </h3>
            <p className="text-sm mt-1">{member.role}</p>
            <p className="text-sm mt-3 italic text-[#e6f1ff]/80">
              “{member.quote}”
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-16 bg-[#0a192f]/90 text-[#8892b0] py-6 rounded-xl"
      >
        ✨ Together, we are Helping Hand Foundation – Young, growing, and driven
        by passion.
      </motion.div>
    </div>
  );
};

export default About;
