import React from 'react'
import VideoListItem from '../components/VideoListItem'


const VideoList = () => {
  const movies = ['toto', 'Iron-Man', 'tata', 'Banshee', 'Hello'];
  return (
    <div>
      <ul>
        {
          movies.map(movie => {
           return <VideoListItem key={movie} movie = {movie}/>
          })
        }

      </ul>
    </div>
  );
}

export default VideoList;