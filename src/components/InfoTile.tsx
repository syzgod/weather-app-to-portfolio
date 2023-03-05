import React from 'react'

type Props = {
  icon: string | JSX.Element
  title: string
  info: string | number
  description: string
  special?: string | number
}

function InfoTile({
  icon,
  title,
  info,
  description,
  special,
}: Props): JSX.Element {
  return (
    <div className="backdrop-blur-ls relative flex h-[130px] w-[210px] flex-row items-center justify-center rounded bg-white/20 text-xs font-bold drop-shadow-lg">
      <div className="absolute top-2 flex items-center justify-center text-xl font-bold">
        <span className={`${special}`}>{icon}</span>
        <h3>{title}</h3>
      </div>
      <p className="text-3xl">{info}</p>
      <p className="absolute top-[100px]">{description}</p>
    </div>
  )
}

export default InfoTile
