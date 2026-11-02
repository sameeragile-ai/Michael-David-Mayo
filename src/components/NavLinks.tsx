import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { ExperiencesDropdown } from './ExperiencesDropdown';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavLinksProps {
  isLight: boolean;
  condensed?: boolean; // For tablet view
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  hasDropdown?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({ isLight, condensed = false }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<'cities' | 'experiences' | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const allNavItems: NavItem[] = [
    { id: 'explore', label: 'Explore', href: '#exhibition' },
    { id: 'cities', label: 'Cities', href: '#exhibition', hasMegaMenu: true },
    { id: 'experiences', label: 'Experiences', href: '#process', hasDropdown: true },
    { id: 'gift-cards', label: 'Gift Cards', href: '#artist' },
    { id: 'restaurants', label: 'For Restaurants', href: '#philosophy' },
  ];

  // In tablet mode (768px-1023px), condense to Explore, Cities, Experiences
  const items = condensed ? allNavItems.slice(0, 3) : allNavItems;

  const handleMouseEnterItem = (item: NavItem) => {
    setHoveredId(item.id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (item.hasMegaMenu) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown('cities');
      }, 120); // 120ms hover intent delay
    } else if (item.hasDropdown) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown('experiences');
      }, 120);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleMouseLeaveItem = () => {
    setHoveredId(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDropdownLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredId(null);
    }, 250);
  };

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Main" className="relative flex items-center gap-1 sm:gap-2">
      {items.map(item => {
        const isHovered = hoveredId === item.id;
        const hasSubmenu = item.hasMegaMenu || item.hasDropdown;

        return (
          <div
            key={item.id}
            onMouseEnter={() => handleMouseEnterItem(item)}
            onMouseLeave={handleMouseLeaveItem}
            className="relative"
          >
            <a
              href={item.href}
              onClick={e => handleClick(e, item.href)}
              className={`relative px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200 inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A36] select-none ${
                isLight
                  ? 'text-[#1A1714]/80 hover:text-[#1A1714]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {/* Sliding glass pill highlight behind hovered link */}
              {isHovered && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className={`absolute inset-0 rounded-full -z-10 ${
                    isLight
                      ? 'bg-black/8 shadow-sm backdrop-blur-md'
                      : 'bg-white/12 shadow-sm backdrop-blur-md border border-white/10'
                  }`}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}

              <span>{item.label}</span>

              {hasSubmenu && (
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                    (item.hasMegaMenu && activeDropdown === 'cities') ||
                    (item.hasDropdown && activeDropdown === 'experiences')
                      ? 'rotate-180 text-[#FF5A36]'
                      : ''
                  }`}
                />
              )}
            </a>
          </div>
        );
      })}

      {/* Cities Mega Menu Dropdown */}
      <MegaMenu
        isOpen={activeDropdown === 'cities'}
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleDropdownLeave}
      />

      {/* Experiences Dropdown */}
      <ExperiencesDropdown
        isOpen={activeDropdown === 'experiences'}
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleDropdownLeave}
      />
    </nav>
  );
};
