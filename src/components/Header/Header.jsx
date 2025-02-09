import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'}`}>
      <Container>
        <nav className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Logo width="120px" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.slug)}
                    className="relative px-4 py-2 text-gray-700 transition-all duration-300 hover:text-blue-600 group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </button>
                )
            )}
            {authStatus && (
              <div className="ml-4">
                <LogoutBtn className="px-6 py-2 bg-red-500 text-white rounded-full transition-all duration-300 transform hover:bg-red-600 hover:scale-105 active:scale-95" />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 flex flex-col items-center space-y-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate(item.slug);
                    }}
                    className="block text-center w-full text-gray-700 px-4 py-2 hover:bg-gray-100"
                  >
                    {item.name}
                  </button>
                )
            )}
            {authStatus && (
              <LogoutBtn className="block text-center w-full px-4 py-2 bg-red-500 text-white rounded transition-all duration-300 hover:bg-red-600" />
            )}
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
