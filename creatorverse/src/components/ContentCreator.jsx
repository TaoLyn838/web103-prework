import React from 'react'
import Icons from '../icons/index'

const ContentCreator = ({ name, url, description, imageURL }) => {
  return (
    <div className="overflow-hidden bg-white rounded bg-base-100 w-96 shadow">
      <div className="relative">
        <figure>
          <img
            src={
              imageURL != null && imageURL !== ''
                ? imageURL
                : 'https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'
            }
            alt={name}
          />
        </figure>

        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full flex items-center">
            <Icons.Edit />
          </span>
        </div>
      </div>
      <div className="p-2">
        <p className=" text-2xl font-semibold">
          <h1 className="text-black">{name}</h1>
        </p>
        <p className="mt-2 text-base text-gray-600">{description}</p>
        <a
          href={url}
          title={name}
          className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
        >
          Visit Profile
          <Icons.RightArrow />
        </a>
      </div>
    </div>
  )
}

export default ContentCreator
