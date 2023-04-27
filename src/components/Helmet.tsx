import React, {ReactNode} from 'react';
import {Helmet as HelmetBrowser} from 'react-helmet-async';

interface HelmetProps {
  title?: string;
  children?: ReactNode;
}

export const Helmet: React.FC<HelmetProps & any> = React.memo<HelmetProps & any>(({title, ...props}: HelmetProps) => {
  return (
    <HelmetBrowser defer={false}>
      {title && <title>{title}</title>}
      {props.children}
    </HelmetBrowser>
  );
});
export default Helmet;
