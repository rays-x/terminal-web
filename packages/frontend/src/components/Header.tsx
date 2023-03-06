import React from 'react';

const HeaderComponentHtml = React.memo(() => {
  const [active, setActive] = React.useState(false);
  return (
    <header className={`header ${active ? 'active' : ''}`} id="header">
      <div className="header__cover cover">
        <div className="header__wrapper">
          <div className="header__logo">
            <a href="/" className="logo">
              <img src="images/content/logo.svg" alt="Logo" className="logo__img"/>
            </a>
          </div>
          <div className="header__block">
            <div className="header__links-wrapper">
              <ul className="header__links">
                <li className="header__links-item">
                  <a href="https://medium.com/@raysx" target="_blank" className="header__links-link">
                    Blog
                  </a>
                </li>
                <li className="header__links-item">
                  <a href="#tokenomics" className="header__links-link">
                    Tokenomics
                  </a>
                </li>
              </ul>
            </div>
            <div className="header__socials-wrapper">
              <ul className="header__socials">
                <li className="header__socials-item">
                  <a href="https://t.me/raysx_global" target="_blank" className="header__socials-link">
                    <svg className="header__socials-icon" width="28" height="24">
                      <use xlinkHref="images/icons.svg#telegram-icon"></use>
                    </svg>
                  </a>
                </li>
                <li className="header__socials-item">
                  <a href="https://twitter.com/Ray__sX" target="_blank" className="header__socials-link">
                    <svg className="header__socials-icon" width="30" height="25">
                      <use xlinkHref="images/icons.svg#twitter-icon"></use>
                    </svg>
                  </a>
                </li>
                <li className="header__socials-item">
                  <a
                    href="https://forms.gle/k4F2KQUFesnLHGr89"
                    target="_blank"
                    className="header__socials-link header__socials-link_whitelist"
                  >
                    WhiteList
                  </a>
                </li>
              </ul>
            </div>
            <div className="header__pull">
              <div className={`pull ${active ? 'active' : ''}`} id="pull" onClick={() => setActive(!active)}>
                <div className="pull__icon">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__menu">
        <ul className="header__menu-list">
          <li className="header__menu-item">
            <a href="https://medium.com/@raysx" target="_blank" className="header__menu-link">
              Blog
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#tokenomics" className="header__menu-link">
              Tokenomics
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#team" className="header__menu-link">
              Team
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#roadmap" className="header__menu-link">
              Roadmap
            </a>
          </li>
          <li className="header__menu-item">
            <a
              href="https://drive.google.com/file/d/1Cci_lBdKIS2txjhD4mWNgdp9kXsD4TIV/view?usp=sharing"
              target="_blank"
              className="header__menu-link"
            >
              Litepaper
            </a>
          </li>
          <li className="header__menu-item">
            <a href="mailto:hello@ray.sx" className="header__menu-link">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});
export default HeaderComponentHtml;
