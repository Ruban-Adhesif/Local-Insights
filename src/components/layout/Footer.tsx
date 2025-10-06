import { Link } from 'react-router-dom';
import { Heart, Mail, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-dark-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Brand */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <img 
                        src="/logo.svg" 
                        alt="Local Insights Logo" 
                        className="w-8 h-8"
                      />
                      <span className="font-display font-semibold text-xl">
                        Local Insights
                      </span>
                    </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover local culture and build your personalized cultural life. 
              Reliable recommendations for newcomers and travelers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/discover" className="text-gray-300 hover:text-white transition-colors">
                  Discover
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-300 hover:text-white transition-colors">
                  Map
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-300 hover:text-white transition-colors">
                  My list
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-gray-400 text-sm">
                    © 2024 Local Insights. All rights reserved.
                  </p>
        </div>
      </div>
    </footer>
  );
}
