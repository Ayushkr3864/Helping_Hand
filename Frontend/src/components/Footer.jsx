import { Instagram } from "lucide-react";
import React from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedinIn, } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import hand from "../assets/hand.png"

function Footer() {
  return (
    <>
      <div className="bg-[#373a3f] w-full h-full flex justify-around flex-wrap flex-col md:flex-row mt-10 gap-y-5 p-5 text-[#d5dfed]">
        <div className="text-center cursor-pointer">
          <img src={hand} alt="hand" className="md:h-30 md:w-40 h-20 w-30 mx-25" />
          <h1 className="text-3xl">HELPING HAND FOUNDATION</h1>
          <p>Nurturing the Environment and needy</p>
        </div>
        <div className="flex flex-col text-center">
          <h1 className="text-2xl">Quick Links</h1>
          <div className="flex md:gap-x-15 gap-10 justify-center">
            <div className="">
              <Link className="cursor-pointer" to="/about">
                {" "}
                <p>About Us</p>
              </Link>
              <Link className="cursor-pointer" to="/about">
                {" "}
                <p>Our Team</p>
              </Link>
            </div>
            <div>
              <Link className="cursor-pointer">
                {" "}
                <p>Volunteer</p>
              </Link>
              <Link className="cursor-pointer" to="/Login">
                {" "}
                <p>Donate</p>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center gap-x-10">
            <Link className="cursor-pointer">
              <FaInstagram size={40} />
            </Link>
            <Link className="cursor-pointer">
              <FaFacebook size={40} />
            </Link>
            <Link className="cursor-pointer">
              <FaTwitter size={40} />
            </Link>
            <Link className="cursor-pointer">
              <FaLinkedinIn size={40} />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-2xl">Contact Us</h1>
            <div className="flex align-middle">
              <MdEmail size={25} />
              <a href="mailto:ak05078189@gmail.com">
                {" "}
                <h1>Email:ak05078189@gmail.com</h1>
              </a>
            </div>
            <div className="flex align-middle">
              <MdPhone size={25} />
              <a href="tel:9773909217">
                {" "}
                <h1>Phone:9773909217</h1>
              </a>
            </div>
            <div className="flex align-middle">
              <MdLocationOn size={25} />
              <a href="https://tinyurl.com/29duf93p" target="_blank">
                <h1>Location:Kasna,Grreater Noida UP.</h1>
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-[#d5dfed]" />
      <footer className="bg-[#373a3f] text-white md:py-6 text-center">
        <p>© 2025 Helping Hand Foundation. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Footer;
