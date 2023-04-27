import React, {useEffect} from 'react';

// @ts-ignore
import {Fancybox as NativeFancybox} from '@fancyapps/ui/dist/fancybox.esm';
import '@fancyapps/ui/dist/fancybox.css';

function Fancybox(props: { delegate?: any; options?: any; children?: any }) {
  const delegate = props.delegate || '[data-fancybox]';

  useEffect(() => {
    const opts = props.options || {};

    NativeFancybox.bind(delegate, opts);

    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  return <>{props.children}</>;
}

export default Fancybox;
