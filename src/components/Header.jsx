import React from 'react';

function Header() {
  return (
    <header className="py-5 headerImage">
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
        <h1 className="display-4 fw-bolder" style={{ textShadow: '0 0 3px #000, 0 0 5px #000' }}>Shark Mobiles</h1>
        <p className="lead fw-normal mb-0" style={{ textShadow: '0 0 3px #000', color: 'yellow' }}>Buy your favourite mobiles</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
