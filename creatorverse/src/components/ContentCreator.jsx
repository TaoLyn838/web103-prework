import React from 'react'
import Icons from '../icons/index'
import { Link } from 'react-router-dom'
import './ContentCreator.css'

const ContentCreator = ({
  id,
  name,
  description,
  imageURL,
  youtubeURL,
  instagramURL,
  twitterURL,
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      <div className="relative">
        <img
          className="rounded-t-lg w-full h-96 object-cover"
          src={
            imageURL != null && imageURL !== ''
              ? imageURL
              : 'https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'
          }
          alt={name}
        />
        <div className="absolute top-2 right-2 bg-white text-gray-950 rounded-full p-1 shadow-lg">
          <Link to={`/view/${id}`}>
            <Icons.MoreInfo />
          </Link>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <Link to={`/edit/${id}`}>
              <Icons.Edit />
            </Link>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {youtubeURL && youtubeURL !== '' && (
            <a href={youtubeURL} className="media-icon left">
              <Icons.Youtube />
            </a>
          )}
          {instagramURL && instagramURL !== '' && (
            <a href={instagramURL} className="media-icon middle">
              <Icons.Instagram />
            </a>
          )}
          {twitterURL && twitterURL !== '' && (
            <a href={twitterURL} className="media-icon right">
              <Icons.X />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentCreator
