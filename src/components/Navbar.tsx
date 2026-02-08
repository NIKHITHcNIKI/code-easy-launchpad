import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import codeEasyIcon from '@/assets/codeeasy-icon.jpg';
import codeEasyLogo from '@/assets/codeeasy-logo.png';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Courses', href: '#courses' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact Us', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`navbar-transparent ${isScrolled ? 'navbar-scrolled' : ''}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img src={codeEasyIcon} alt="Code Easy Icon" className="w-12 h-12 object-contain rounded-full" />
            <img src={codeEasyLogo} alt="Code Easy" className="h-10 object-contain hidden sm:block" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`nav-link ${isScrolled ? 'text-foreground' : 'text-white'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="btn-hero-primary py-2 px-6 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-foreground' : 'text-white'} size={24} />
            ) : (
              <Menu className={isScrolled ? 'text-foreground' : 'text-white'} size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background rounded-2xl mt-2 p-6 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-hero-primary py-3 text-center text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Enroll Now
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
