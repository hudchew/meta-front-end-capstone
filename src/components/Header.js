import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/menu', label: 'Menu' },
    { to: '/booking', label: 'Reservations' },
    { to: '/order', label: 'Order Online' },
  ];

  return (
    <>
      <header className="App-header" role="banner">
        <div className="header-container">
          <button
            type="button"
            className="header-hamburger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
          <div className="header-logo">
            <Link to="/" aria-label="Little Lemon home">
              <img src="/images/725cbe0ca5da8536fc99c51e00d4d13628bd9745.jpg" alt="Little Lemon logo" height="50" />
            </Link>
          </div>
          <nav className="header-nav-desktop" aria-label="Main navigation">
            <ul>
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="nav-overlay"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="nav-drawer" aria-label="Mobile navigation">
            <ul>
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} onClick={() => setMenuOpen(false)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
}

export default Header;
