import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#000000', marginTop: '2rem' }}>
      <p>
        Weather App by <strong>Apurv Gaikwad</strong>
      </p>
      <p>
        Learn more about <strong>PM Accelerator</strong> on our{' '}
        <a
          href="https://www.linkedin.com/school/pmaccelerator/"
          target="_open"
          rel="noopener noreferrer"
          style={{ color: '#000bff', textDecoration: 'none' }}
        >
          LinkedIn page
        </a>.
      </p>
    </footer>
  );
};

export default Footer;