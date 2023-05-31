import React from 'react';
import Logo from './_old2/LogoLink/logo';

const FooterComponentHtml = React.memo(() => {
  return (
    <footer className="footer">
      <div className="footer__cover cover">
        <div className="footer__wrapper">
          <div className="footer__info-block">
            <div className="footer__logo">
              <Logo/>
            </div>
            <div className="footer__socials">
              <ul className="socials socials_footer">
                <li className="socials__item">
                  <a href="https://twitter.com/Ray__sX" target="_blank" className="socials__link">
                    <svg className="socials__icon socials__icon_twitter">
                      <use xlinkHref="images/icons.svg#twitter-icon"></use>
                    </svg>
                  </a>
                </li>
                <li className="socials__item">
                  <a href="https://t.me/raysx_global" target="_blank" className="socials__link">
                    <svg className="socials__icon socials__icon_telegram">
                      <use xlinkHref="images/icons.svg#telegram-icon"></use>
                    </svg>
                  </a>
                </li>
                <li className="socials__item">
                  <a href=" https://medium.com/@raysx" target="_blank" className="socials__link">
                    <svg className="socials__icon socials__icon_m">
                      <use xlinkHref="images/icons.svg#m-icon"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__info">
              <p>
                Please note that by using Ray.sX services you represent and warrant that you do not reside in and are
                not a citizen of a Restricted jurisdiction (in the meaning specified in our AML Policy, including but
                not limited to US citizens and residents in certain states), and no laws and regulations of your country
                in any way prohibit or restrict using our services via investments in RAX Token.
              </p>
            </div>
            <div className="footer__copyright">© {new Date().getFullYear().toString()} RaysX Foundation</div>
          </div>
          <div className="footer__links-block">
            <ul className="footer__links">
              <li className="footer__item">
                <a href="https://medium.com/@raysx" target="_blank" className="footer__link">
                  Blog
                </a>
              </li>
              <li className="footer__item">
                <a href="mailto:hello@ray.sx" className="footer__link">
                  Contact Us
                </a>
              </li>
              <li className="footer__item">
                <a href="https://ray.sx/#tokenomics" className="footer__link">
                  Tokenomics
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="https://www.websitepolicies.com/policies/view/FhwBt6ku"
                  target="_blank"
                  className="footer__link"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="https://drive.google.com/file/d/1Cci_lBdKIS2txjhD4mWNgdp9kXsD4TIV/view?usp=sharing"
                  target="_blank"
                  className="footer__link"
                >
                  Litepaper
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="https://www.websitepolicies.com/policies/view/BqVQfFEt"
                  target="_blank"
                  className="footer__link"
                >
                  Terms of Use
                </a>
              </li>
              <li className="footer__item">
                <div className="footer__link footer__link_disabled">
                  Whitepaper <span className="footer__link-info">Soon</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
});
export default FooterComponentHtml;
