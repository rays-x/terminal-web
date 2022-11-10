import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import s from './TableRowLink.module.scss';
import {TableContext} from './TableContext';

export function TableRowLink({to, children}: { to: string; children: React.ReactNode }) {
  const {columns} = useContext(TableContext);
  return (
    <Link to={to} className={s.TableRowLink} style={{
      textDecoration: 'none',
      gridTemplateColumns: columns.join(' ')
    }}>
      {children}
    </Link>
  );
}
