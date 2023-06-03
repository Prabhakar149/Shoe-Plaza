import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-text">
        <p>© 2023 Shoe Plaza</p>
      </div>
      <div className="footer-links">
        <ul>
          <li>
            <a
              href="https://github.com/Prabhakar149"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-github" title="github"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/prabhakar-singh-76a9a9144/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-linkedin" title="linkedIn"></i>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/prabhakar4510"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-twitter" title="twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
