import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import Icons from '../icons'

const ViewCreator = () => {
  const { id } = useParams()
  const [creatorData, setCreatorData] = useState({
    name: '',
    description: '',
    url: '',
    imageURL: '',
  })
  const getFirst10Words = (text) => {
    return text.split(' ').slice(0, 10).join(' ') + '...'
  }

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
    <div className="flex flex-col justify-center items-center m-10">
      <img
        src={creatorData.imageURL}
        className="  rounded-lg shadow-2xl w-8/12"
      />
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-5xl font-bold m-5">{creatorData.name}</h1>
          <div className="grid grid-cols-3 gap-4 m-4">
            <a className="link link-accent" href={creatorData.url}>
              <Icons.Youtube className="w-1/3" />
            </a>
            <Icons.X />
            <Icons.Instagram />
          </div>
        </div>
        <p className="flex w-8/1zx2 ">{creatorData.description}</p>
        {/* <a className="btn btn-primary m-5 right-2" href={creatorData.url}>
          View here
        </a> */}
      </div>
    </div>
  )
}
export default ViewCreator
