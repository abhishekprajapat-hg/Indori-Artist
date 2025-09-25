import React from 'react'

function About() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-light-gradient text-black dark:bg-dark-gradient dark:text-white transition-colors duration-300 px-6">
      <div className="bg-light-gradient text-black dark:bg-dark-gradient dark:text-white 
        border border-gray-300 dark:border-gray-700 
        shadow-md rounded px-8 py-10 max-w-2xl w-full text-center">
        
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Welcome to <span className="font-semibold text-[#70d6ff]">Indori Artist</span>, 
          your one-stop platform for discovering and booking talented artists from Indore.  
          Our mission is to bridge the gap between artists and audiences by providing a 
          seamless, modern, and transparent booking experience.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Whether you’re looking for singers, dancers, performers, or entertainers, 
          we ensure every booking is simple, secure, and reliable. We are passionate 
          about supporting local talent and giving them the recognition they deserve.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Thank you for trusting us to make your events more memorable with the 
          best artists in town! 🎶✨
        </p>
      </div>
    </div>
  );
}


export default About