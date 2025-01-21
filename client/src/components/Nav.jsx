import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/components/nav.css';
import Burger from './Burger';
import icons from '../assets/icons';

import { navLinks, adminLinks } from '../constants';
import LogoutButton from '../admin/components/LogOutButton';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const allLinks = isAdmin ? [...navLinks, ...adminLinks] : navLinks;

  const OVERLAY_STYLES = useMemo(
    () => ({
      active: {
        overflow: 'hidden',
        opacity: '1',
        pointerEvents: 'auto',
        zIndex: '5',
      },
      inactive: {
        overflow: 'auto',
        opacity: '0',
        pointerEvents: 'none',
        zIndex: '-1',
      },
    }),
    []
  );

  const SCROLL_TRESHOLD = 100;
  const MEDIUM_SCREEN_WIDTH = 768;
  let navigating = useRef(false);
  let lastScroll = useRef(window.scrollY);

  const isMediumScreen = () => window.innerWidth >= MEDIUM_SCREEN_WIDTH;

  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
    handleOverlay(!isActive);
  };

  const handleOverlay = useCallback(
    (show) => {
      const overlay = document.getElementById('blur-overlay');
      const styles = show ? OVERLAY_STYLES.active : OVERLAY_STYLES.inactive;

      document.body.style.overflow = styles.overflow;
      overlay.style.opacity = styles.opacity;
      overlay.style.pointerEvents = styles.pointerEvents;
      overlay.style.zIndex = styles.zIndex;
    },
    [OVERLAY_STYLES]
  );

  useEffect(() => {
    const hideNav = () => {
      if (navigating.current) return;

      const header = document.querySelector('header');
      const currentScroll = window.scrollY;
      const headerHight = header.offsetHeight;
      const topDistance = 12;

      if (currentScroll <= SCROLL_TRESHOLD || !isMediumScreen()) {
        lastScroll.current = currentScroll;
        return;
      }

      header.style.transform = `translate(-50%,${
        currentScroll > lastScroll.current
          ? -(headerHight + topDistance) + 'px'
          : '0'
      })`;

      lastScroll.current = currentScroll;
    };

    window.addEventListener('scroll', hideNav);

    return () => window.removeEventListener('scroll', hideNav);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isMediumScreen() && isActive) {
        setIsActive(false);
        handleOverlay(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive, handleOverlay]);

  return (
    <header className="transition-1 fixed md:fixed-centered max-md:right-3 max-md:translate-x-0 top-3 z-[10]">
      <Burger isActive={isActive} toggle={toggleMenu} />
      <div
        id="menu"
        className={`flex-center mobile-stack transition-1 w-max gap-3 max-md:flex-col-reverse max-md:flex ${
          isActive ? 'menu-visible' : 'menu-invisible'
        }`}
      >
        <img
          src={icons.logo}
          alt="logo"
          width={36}
          height={68}
          className="max-md:self-center"
        />
        <nav className="bg-acc-3 rounded-md mobile-stack flex-center w-fit p-4">
          <ul id="links" className="flex-center mobile-stack gap-3">
            {allLinks
              .filter((link) => {
                // Remove both '*' path and login link when user is logged in
                if (link.path === '*') return false;
                if (link.path === '/login' && isLoggedIn) return false;
                return true;
              })
              .map((link) => (
                <li key={link.id} className="tp-4 font-livvic">
                  <Link
                    to={link.path}
                    onClick={() => {
                      setIsActive(false);
                      handleOverlay(false);
                    }}
                    data-active={location.pathname === link.path}
                    className={`rounded-md border-hover-1 px-4 py-2 block w-[120px] ${
                      location.pathname === link.path
                        ? 'text-acc-3 bg-acc-1'
                        : 'text-acc-1 bg-acc-3'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            {isLoggedIn && <LogoutButton />}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
