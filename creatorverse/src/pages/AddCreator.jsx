import React, { useState } from 'react'
import './AddCreator.css'
import { supabase } from '../client'
import Icons from '../icons'
const AddCreator = () => {
  const [creatorData, setCreatorData] = useState({
    name: '',
    description: '',
    imageURL: '',
    twitterURL: '',
    instagramURL: '',
    youtubeURL: '',
  })

  const [isImageValid, setIsImageValid] = useState(null)

  const handleImageValidation = () => {
    const img = new Image()
    img.src = creatorData.imageURL
    img.onload = () => setIsImageValid(true) // Image loaded successfully
    img.onerror = () => setIsImageValid(false) // Image failed to load
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCreatorData({ ...creatorData, [name]: value })
    if (name === 'imageURL') {
      setIsImageValid(null)
    }
  }

  const handleSubmit = async (data) => {
    data.preventDefault()

    const validateImageURL = () => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = creatorData.imageURL
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
      })
    }

    const isValid = await validateImageURL()
    setIsImageValid(isValid)

    const imageURL = isValid ? creatorData.imageURL : ''

    const { data: creator, error } = await supabase.from('creators').insert([
      {
        name: creatorData.name,
        description: creatorData.description,
        imageURL: imageURL,
        twitterURL: creatorData.twitterURL,
        instagramURL: creatorData.instagramURL,
        youtubeURL: creatorData.youtubeURL,
      },
    ])
    if (error) {
      console.error('Error inserting data: ', error)
      alert('There was an error inserting the data. Please try again.')
    } else {
      alert('Data inserted successfully')
      setCreatorData({
        name: '',
        description: '',
        imageURL: '',
        twitterURL: '',
        instagramURL: '',
        youtubeURL: '',
      })
      setIsImageValid(null)
      window.location = '/'
    }
  }

  return (
    <div className="container mx-auto px-4 m-5">
      <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="add-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="given-name"
            required
            value={creatorData.name}
            onChange={handleChange}
            className="add-input"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="add-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={creatorData.description}
            onChange={handleChange}
            className="add-input"
          ></textarea>
        </div>
        <div className="mb-5">
          <label htmlFor="url" className="add-label">
            Youtube URL
          </label>
          <input
            type="url"
            name="youtubeURL"
            id="youtubeURL"
            value={creatorData.youtubeURL}
            onChange={handleChange}
            className="add-input"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="url" className="add-label">
            Twitter URL
          </label>
          <input
            type="url"
            name="twitterURL"
            id="twitterURL"
            value={creatorData.twitterURL}
            onChange={handleChange}
            className="add-input"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="url" className="add-label">
            Instagram URL
          </label>
          <input
            type="url"
            name="instagramURL"
            id="instagramURL"
            value={creatorData.instagramURL}
            onChange={handleChange}
            className="add-input"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="imageURL" className="add-label">
            Image URL
          </label>
          <input
            type="url"
            name="imageURL"
            id="imageURL"
            value={creatorData.imageURL}
            onChange={handleChange}
            className="add-input"
          />
        </div>
        <div className="mb-5">
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleImageValidation}
          >
            Validate Image URL
          </button>
          {isImageValid === true && (
            <div className="mb-3">
              <img
                src={creatorData.imageURL}
                alt="Valid preview"
                className="mt-2 rounded-md shadow-md"
              />
              <p className="text-green-500">Image URL is valid!</p>
            </div>
          )}
          {isImageValid === false && (
            <p className="text-red-500">Image URL is invalid.</p>
          )}
        </div>
        <div className="mb-5">
          <button type="submit" className="btn btn-wide btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddCreator
