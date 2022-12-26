import React, { Component } from 'react';
import s from './footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Footer() {
  return (
    <footer className="mt-auto py-2 footer">
      <div className="d-flex flex-column py-4">
        <div className="d-flex justify-content-center flexContainerFooter">
          <a href="!#" className="me-5">
            <span className={s.footerText}>SUPPORT</span>
          </a>
          <a href="!#" className="me-5">
            <span className={s.footerText}>CONTACT US</span>
          </a>
          <a href="!#" className="me-5">
            <span className={s.footerText}>BLOG</span>
          </a>
        </div>
      </div>
      <div className="d-flex flex-column py-4">
        <div className="d-flex justify-content-center flexContainerFooter">
          <a href="/#/toc" className="me-5">
            <span className={s.footerText}>PRIVACY POLICY</span>
          </a>
          <a href="/#/toc" className="me-5">
             <span className={s.footerText}>RETURN POLICY</span>
          </a>
          <a href="/#/toc" className="me-5">
            <span className={s.footerText}>DELIVERY POLICY</span>
          </a>
        </div>
      </div>
      <div className="d-flex flex-column py-4">
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-5">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="1x" />
          </a>
          <a href="!#" className="me-5">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="1x" />
          </a>
          <a href="!#" className="me-5">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="1x" />
          </a>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <span className="text-muted"> email us: Paanikabyamrita@gmail.com, Whatsapp: +91 99862 02185, Address: Bangalore | Copyright &copy; Paanika 2023</span>
      </div>
    </footer>
  );
}

export default Footer;
