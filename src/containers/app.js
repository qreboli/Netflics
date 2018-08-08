import React, {Component} from 'react'
import SearchBar from '../components/SearchBar'
import VideoList from '../containers/VideoList'
import VideoDetail from '../components/VideoDetail'
import Video from '../components/Video'
import axios from 'axios'

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIE_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=image";
const API_KEY = "api_key=c67d38ce50b627d15f22af99f4e92da1";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {movieList: {}, currentMovie: {}}
  }

  componentWillMount() {
    this.initMovies();
  }

  initMovies (){
    axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&${API_KEY}`).then((response) => {
      this.setState({movieList:response.data.results.slice(1,6), currentMovie:response.data.results[0]}, () => {
        this.applyVideoToCurrentMovie();
      });
    });
  }

  applyVideoToCurrentMovie(){
    const { currentMovie } = this.state;
    axios.get(`${API_END_POINT}movie/${currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
      .then((response) => {
      const youtubeKey = response.data.videos.results[0].key;
      let newCurrentMovieState = currentMovie;
      newCurrentMovieState.videoId = youtubeKey;
      this.setState({currentMovie: newCurrentMovieState});
      console.log(newCurrentMovieState);
    });
  }

  render() {
    const { movieList, currentMovie } = this.state;
    const renderVideoList = () => {
      if(movieList.length>=5){
        return <VideoList movieList={movieList}/>
      }
    }
    console.log(currentMovie.videoId);
    return (
      <div>
        <SearchBar/>
        <Video videoId={currentMovie.videoId}/>
        {renderVideoList()}
        <VideoDetail title={currentMovie.title} description={currentMovie.overview} />
      </div>
    )
  }
}

export default App;