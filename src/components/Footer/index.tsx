import React from "react";
import { FaXTwitter, FaYoutube, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo and Social Links */}
          <div className="col-span-1">
            <h1 className="text-xl font-bold">Weed Man</h1>
            <div className="flex space-x-4 mt-4">
              <FaXTwitter className="w-6 h-6 hover:text-green-400" />
              <FaYoutube className="w-6 h-6 hover:text-green-400" />
              <FaLinkedin className="w-6 h-6 hover:text-green-400" />
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <ul className="space-y-2">
              <li>Franchise Opportunities</li>
              <li>Referral Program</li>
              <li>Careers</li>
              <li>Our Story</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Services</h2>
            <ul className="space-y-2">
              <li>Weed Man Program</li>
              <li>Weed Control</li>
              <li>Lawn Fertilization</li>
              <li>Insect Control</li>
              <li>Mosquito Control</li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Learn</h2>
            <ul className="space-y-2">
              <li>Yard Smart Blog</li>
              <li>Coach Weed Man</li>
              <li>Support Center</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li>Find a Franchisee</li>
              <li>Get a Call Back</li>
              <li>Ways to Get In Touch</li>
            </ul>
          </div>

          {/* Customer Portal */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Portal</h2>
            <ul className="space-y-2">
              <li>Login</li>
              <li>Create an Account</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
