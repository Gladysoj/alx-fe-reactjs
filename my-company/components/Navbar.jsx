import { Link } from 'react-router-dom'

function Navbar() {

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#ffffff', // Dark blue
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
      };

  return (
    <nav style={navbarStyle}>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/services'>Services</Link>
        <Link to='/contact'>Contact</Link>
    </nav>
  )
}

export default Navbar
