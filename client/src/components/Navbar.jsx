import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/AllRooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const BookIcon = () => (
    <svg
      className="w-4 h-4 text-gray-700"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
      />
    </svg>
  );

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(window.scrollY > 10);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-5 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm py-3 md:py-4 text-black border-b border-gray-200/50"
          : "bg-transparent py-4 md:py-6 text-white"
      }`}
    >
      {/* Logo */}

      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className={`h-9 transition-all duration-500 ${
            isScrolled ? "" : "brightness-0 invert"
          }`}
        />
      </Link>

      {/* Desktop Nav */}

      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className="group flex flex-col gap-0.5 font-medium tracking-wide"
          >
            {link.name}

            <div
              className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full ${
                isScrolled ? "bg-black" : "bg-white"
              }`}
            />
          </Link>
        ))}

        <button
          onClick={() => navigate(`/owner`)}
          className={`border px-5 py-2 text-sm font-medium rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${
            isScrolled
              ? "border-gray-300 hover:bg-black hover:text-white text-black"
              : "border-white/60 hover:bg-white hover:text-black text-white"
          }`}
        >
          Dashboard
        </button>
      </div>

      {/* Desktop Right Side */}

      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt=""
          className={`h-5 md:h-6 transition-all duration-300 cursor-pointer ${
            isScrolled ? "invert opacity-80" : "opacity-100"
          }`}
        />

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Booking"
                labelIcon={<BookIcon />}
                onClick={() => navigate(`/my-bookings`)}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="px-7 py-2.5 rounded-full ml-2 bg-black text-white font-medium shadow-lg hover:scale-105 hover:bg-gray-900 transition-all duration-300"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Top Section */}

      <div className="flex items-center gap-5 md:hidden">
        <img
          src={assets.searchIcon}
          alt="search"
          className={`h-5 transition-all duration-300 ${
            isScrolled ? "invert opacity-80" : "opacity-100"
          }`}
        />

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer"
        >
          <img
            src={assets.menuIcon}
            alt="menu"
            className={`h-5 transition-all duration-300 ${
              isScrolled ? "invert opacity-80" : "opacity-100"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`fixed top-0 left-0 w-full h-dvh bg-white/95 backdrop-blur-2xl text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-900 transition-all duration-500 z-50 ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        {/* Close Button */}

        <button
          className="absolute top-6 right-6 p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close" className="h-6" />
        </button>

        {/* Mobile Links */}

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="px-10 py-3 text-xl font-semibold tracking-wide hover:scale-105 transition-all duration-300"
          >
            {link.name}
          </Link>
        ))}

        {/* User Section */}

        {user ? (
          <div className="flex flex-col items-center gap-6 mt-4">
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Booking"
                  labelIcon={<BookIcon />}
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(`/my-bookings`);
                  }}
                />
              </UserButton.MenuItems>
            </UserButton>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate(`/owner`);
              }}
              className="border border-gray-300 px-10 py-3 text-sm font-semibold rounded-full cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
            >
              Dashboard
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              openSignIn();
              setIsMenuOpen(false);
            }}
            className="bg-black text-white px-12 py-3.5 rounded-full transition-all duration-300 text-base font-semibold shadow-xl hover:scale-105"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
