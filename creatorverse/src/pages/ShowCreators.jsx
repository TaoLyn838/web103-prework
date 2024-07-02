import { supabase } from '../client'
import { useEffect, useState } from 'react'
import ContentCreator from '../components/ContentCreator'

const ShowCreators = () => {
  const [creators, setCreators] = useState([])
  useEffect(() => {
    const fetchCreators = async () => {
      let { data: creators, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) console.log('error', error)
      else setCreators(creators)
    }
    fetchCreators()
  }, [])
  console.log(creators)
  return (
    <div>
      <div className="content-creators">
        {creators.length > 0 ? (
          creators.map((creator) => (
            <ContentCreator
              key={creator.id}
              name={creator.name}
              description={creator.description}
              url={creator.url}
              imageURL={creator.imageURL}
            />
          ))
        ) : (
          <h2>No content creators</h2>
        )}
      </div>
    </div>
  )
}
export default ShowCreators
