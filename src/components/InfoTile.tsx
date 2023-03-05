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
    <div className="backdrop-blur-ls flex h-[130px] w-[150px] flex-row items-center justify-center rounded-xl bg-white/20 text-xs font-bold drop-shadow-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center text-xl font-bold">
          <span className={`${special}`}>{icon}</span>
          <h3 className="my-2 text-lg">{title}</h3>
        </div>
        <p className="text-3xl">{info}</p>
        <p className="top-[100px] m-3 flex flex-wrap font-normal">
          {description}
        </p>
      </div>
    </div>
  )
}

export default InfoTile
