import React, { useMemo } from 'react'

import s from './Token.module.scss'
import { Image } from '../../Image'
import { useNetworkExchanges } from '../../../../store/networkExchanges'

export function Token({
  children,
  icons,
  platforms,
}: {
  children: string
  icons: string[]
  platforms?: {
    address: string
    blockchain: {
      bqSlug: string
      name: string
      image: string
      url: string
    }
  }[]
}) {
  const { data } = useNetworkExchanges()

  const selectedPlatforms = useMemo(() => {
    const platformsSet = new Set(
      platforms?.map(({ blockchain }) => blockchain.bqSlug),
    )

    return data.filter((data) => platformsSet.has(data.id))
  }, [data, platforms])

  return (
    <div className={s.Token}>
      <Image
        className={s.Token__icon}
        sources={icons}
        altText={children}
        width={28}
      />
      <span className={s.Token__text}>{children}</span>
      {selectedPlatforms.map((platform) => (
        <span
          key={platform.id}
          className={s.Token__platform}
          style={{
            backgroundColor: platform.tableBackground,
            color: platform.tableColor,
          }}
        >
          {platform.label}
        </span>
      ))}
    </div>
  )
}
