import "./Footer.css";

const Footer = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}`;

  return (
    <footer className="footer">
      <p>
        {formattedDate} &copy;  Fatek Inc. All rights reserved. | <a target='blank' href='https://github.com/KaioBorgesDev'>View the Source</a>
      </p>
    </footer>
  );
};

export default Footer;