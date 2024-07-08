import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import Icons from '../icons'

const ViewCreator = () => {
  const { id } = useParams()
  const [creatorData, setCreatorData] = useState({
    name: '',
    description: '',
    imageURL: '',
    twitterURL: '',
    instagramURL: '',
    youtubeURL: '',
  })

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

  return (
    <div className="relative">
      <div className="flex flex-col justify-center items-center m-10">
        <img
          src={creatorData.imageURL}
          className="  rounded-lg shadow-2l w-[800px] h-[700px] object-cover"
        />
        <div className="flex flex-col items-center">
          <div>
            <h1 className="text-5xl font-bold m-5">{creatorData.name}</h1>
          </div>
          <p className="flex w-8/1zx2 ">{creatorData.description}</p>
          <Link to={`/edit/${id}`} className="btn btn-wide btn-primary m-4">
            Edit
          </Link>
        </div>
      </div>
      <div className="absolute top-0 right-10">
        <div className="flex-row">
          <a className="m-4" href={creatorData.youtubeURL}>
            <Icons.Youtube />
          </a>
          <a className="m-4" href={creatorData.instagramURL}>
            <Icons.Instagram />
          </a>
          <a className="m-4" href={creatorData.twitterURL}>
            <Icons.X />
          </a>
        </div>
      </div>
    </div>
  )
}
export default ViewCreator
