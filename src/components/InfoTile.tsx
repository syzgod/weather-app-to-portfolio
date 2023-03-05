import React from 'react'

type Props = {
  icon: string | JSX.Element
  title: string
  info: string | number
  description: string
}

function InfoTile({ icon, title, info, description }: Props): JSX.Element {
  return (
    <div className="backdrop-blur-ls mb-5 flex w-[140px] flex-row items-center justify-center rounded bg-white/20 py-4 text-xs font-bold drop-shadow-lg">
      {icon}
      {title}
      {info}
      {description}
    </div>
  )
}

export default InfoTile
