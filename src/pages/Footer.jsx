import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6  w-full h-16">
      <div className=" mx-auto px-4">
        <div className="flex justify-center sm:justify-between items-center ">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Taskify. All rights reserved.
          </div>
          <div className="flex space-x-4  ">
            <a href="/privacy" className="hover:underline hidden sm:block">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline hidden sm:block">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="mt-6 text-center  text-xs py-5 text-gray-400">
          Built with ❤️ by Akash Gupta
        </div>
      </div>
    </footer>
  );
};

export default Footer;
