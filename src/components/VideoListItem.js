import React from 'react'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

const VideoListItem = ({movie}) => {
  return <li>
    <img height='100px' width='auto' src={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
    <p>{movie.title}</p>
  </li>
}

export default VideoListItem;