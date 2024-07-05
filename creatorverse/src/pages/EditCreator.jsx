import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import './EditCreator.css'

const EditCreator = () => {
  const { id } = useParams()
  const [creatorData, setCreatorData] = useState({
    name: '',
    description: '',
    imageURL: '',
    twitterURL: '',
    instagramURL: '',
    youtubeURL: '',
  })

  const [isImageValid, setIsImageValid] = useState(null)

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error)
      } else {
        setCreatorData(data)
      }
    }

    fetchCreator()
  }, [id])

  const handleImageValidation = () => {
    const img = new Image()
    img.src = creatorData.imageURL
    img.onload = () => setIsImageValid(true) // Image loaded successfully
    img.onerror = () => setIsImageValid(false) // Image failed to load
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCreatorData({ ...creatorData, [name]: value })
  }

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('creators')
      .delete()
      .match({ id: id })

    if (error) {
      console.error('Error deleting creator:', error)
      alert('There was an error deleting the creator. Please try again.')
    } else {
      alert('Creator deleted successfully')
      window.location = '/'
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

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

    const { data, error } = await supabase
      .from('creators')
      .update({
        name: creatorData.name,
        description: creatorData.description,
        youtubeURL: creatorData.youtubeURL,
        imageURL: imageURL,
        twitterURL: creatorData.twitterURL,
        instagramURL: creatorData.instagramURL,
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating creator:', error)
      alert('There was an error updating the creator. Please try again.')
    } else {
      alert('Creator updated successfully')
      window.location = '/'
    }
  }

  return (
    <div className="container mx-auto px-4 m-10">
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
        <div className="grid grid-cols-2 gap-6">
          <button type="update" className="update-btn" onClick={handleUpdate}>
            Update
          </button>
          <button type="delete" className="del-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}
export default EditCreator
