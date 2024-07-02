import React, { useState } from 'react'
import './AddCreator.css'
import { supabase } from '../client'
const AddCreator = () => {
  const [creatorData, setCreatorData] = useState({
    name: '',
    description: '',
    url: '',
    imageURL: '',
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
        url: creatorData.url,
        imageURL: imageURL,
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
        url: '',
        imageURL: '',
      })
      setIsImageValid(null)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <form className="max-w-2xl mx-auto" onSubmit={handleChange}>
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
            required
            value={creatorData.description}
            onChange={handleChange}
            className="add-input"
          ></textarea>
        </div>
        <div className="mb-5">
          <label htmlFor="url" className="add-label">
            URL
          </label>
          <input
            type="url"
            name="url"
            id="url"
            required
            value={creatorData.url}
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
            required
            value={creatorData.imageURL}
            onChange={handleChange}
            className="add-input"
          />
        </div>
        <div className="mb-5">
          <button
            type="button"
            className="add-submit-btn"
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
          <button
            type="submit"
            className="add-submit-btn"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddCreator
