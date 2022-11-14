import React, {useContext} from 'react';
import s from './TableRowLink.module.scss';
import {TableContext} from './TableContext';
import {useNavigate} from 'react-router';

export function TableRowLink({to, children}: { to: string; children: React.ReactNode }) {
  const {columns} = useContext(TableContext);
  const navigate = useNavigate();
  return (
    <a href={to} onClick={(e) => {
      e.preventDefault();
      navigate(to);
    }} className={s.TableRowLink} style={{
      textDecoration: 'none',
      gridTemplateColumns: columns.join(' ')
    }}>
      {children}
    </a>
  );
}
