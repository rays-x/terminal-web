import clsx from 'clsx';
import React from 'react';
import Logo from './logo';
import {Link} from 'react-router-dom';
import s from './LogoLink.module.scss';

export function LogoLink({className}: { className?: string }) {
  return (
    <Link to={'/'} className={clsx(s.LogoLink, className)}>
      <Logo/>
    </Link>
  );
}
