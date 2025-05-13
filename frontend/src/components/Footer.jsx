import React from 'react'

function Footer() {
  return (
    <>
    <footer className="mt-6 opacity-50 text-white py-6 border-t border-gray-700">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer
