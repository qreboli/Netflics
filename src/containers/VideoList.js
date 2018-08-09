import React from 'react'
import VideoListItem from '../components/VideoListItem'


const VideoList = (props) => {
  const { movieList } = props;
  return (
    <div>
      <ul>
        {
          movieList.map(movie => {
            return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
          })
        }

      </ul>
    </div>
  );
  function receiveCallBack(movie){
    props.callback(movie);
  }
}

export default VideoList;