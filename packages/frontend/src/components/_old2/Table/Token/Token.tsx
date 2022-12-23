import React from 'react';
import s from './Token.module.scss';
import {Image} from '../../Image';
import {useNetworkExchanges} from '../../../../store/networkExchanges';

// TODO: add default icon
export function Token({children, icons, platforms}: {
  children: string;
  icons: string[];
  platforms?: {
    id: string
    address: string
    platformId: string
  }[]
}) {
  const {data} = useNetworkExchanges();
  const platformIds = React.useMemo(() => platforms.flatMap(({platformId}) => platformId), [platforms]);
  const selectedPlatforms = React.useMemo(() => data.filter(({id}) => platformIds.includes(id)), [data, platformIds]);
  console.log('p', platformIds, selectedPlatforms);
  return (
    <div className={s.Token}>
      <Image className={s.Token__icon} sources={icons} altText={children} width={28}/>
      <span className={s.Token__text}>{children}</span>
      {selectedPlatforms
        .sort(() => Math.random() * .5)
        .filter((_, i) => i === 0)
        .map(platform => (
          <span
            className={s.Token__platform}
            style={{
              backgroundColor: platform.tableBackground,
              color: platform.tableColor
            }}
          >{platform.label}</span>
        ))}
    </div>
  );
}
