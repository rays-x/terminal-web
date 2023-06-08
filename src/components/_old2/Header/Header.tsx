import React, { FC } from 'react'
import s from './Header.module.scss'
import { LogoLink } from '../LogoLink'
import HomeIcon from '../../../assets/icons/new/HomeIcon'
import DexRankIcon from '../../../assets/icons/new/DexRankIcon'
import BuyRaxIcon from '../../../assets/icons/new/BuyRaxIcon'
import clsx from 'clsx'
import { useNavigate } from 'react-router'

export const Header: FC<any> = React.memo(() => {
  const navigate = useNavigate()

  return (
    <header className={s.Header}>
      <LogoLink className={s.Header__logo} />
      <div className={s.Header__nav}>
        <div className={s.Header__navLink}>
          <HomeIcon className={s.Header__navLinkIcon} />
          <a
            className={s.Header__navLinkText}
            href="https://ray.sx/"
          >
            Home
          </a>
        </div>
        <div
          className={clsx(
            s.Header__navLink,
            s.Header__navLink_active,
          )}
        >
          <DexRankIcon className={s.Header__navLinkIcon} />
          <a
            className={s.Header__navLinkText}
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
          >
            DEX Rank
          </a>
        </div>
        <div className={s.Header__navLink}>
          <BuyRaxIcon className={s.Header__navLinkIcon} />
          <a
            className={s.Header__navLinkText}
            href="https://app.ray.sx/"
          >
            Buy RAX
          </a>
        </div>
      </div>
    </header>
  )
})
