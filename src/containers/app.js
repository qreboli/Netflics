import React, {Component} from 'react'
import SearchBar from '../components/SearchBar'
import VideoList from '../containers/VideoList'
import VideoDetail from '../components/VideoDetail'
import Video from '../components/Video'
import axios from 'axios'

const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIE_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=image';
const MOVIE_VIDEO_URL = 'append_to_response=videos&include_adult=false';
const SEARCH_URL = 'search/movie?language=fr&include_adult=false';
const API_KEY = 'api_key=c67d38ce50b627d15f22af99f4e92da1';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {movieList: {}, currentMovie: {}}
  }

  componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&${API_KEY}`).then((response) => {
      this.setState({movieList: response.data.results.slice(1, 6), currentMovie: response.data.results[0]}, () => {
        this.applyVideoToCurrentMovie();
      });
    });
  }

  applyVideoToCurrentMovie() {
    const {currentMovie} = this.state;
    axios.get(`${API_END_POINT}movie/${currentMovie.id}?${API_KEY}&${MOVIE_VIDEO_URL}`)
      .then((response) => {
        const youtubeKey = response.data.videos.results[0].key;
        let newCurrentMovieState = currentMovie;
        newCurrentMovieState.videoId = youtubeKey;
        this.setState({currentMovie: newCurrentMovieState});
      });
  }

  onClickListItem(movie) {
    this.setState({currentMovie: movie}, () => {
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    })
  }

  setRecommendation(){
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then((response) => {
      this.setState({movieList:response.data.results.slice(0,5)});
    })
  }

  onClickSearch(searchText) {
    if(searchText){
      axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then((response) => {
        if(response.data && response.data.results[0]){
          if(response.data.results[0].id != this.state.currentMovie.id){
            this.setState({currentMovie: response.data.results[0]}, () => {
              this.applyVideoToCurrentMovie();
              this.setRecommendation();
            });
          }
        }
      });
    }
  }


  render() {
    const {movieList, currentMovie} = this.state;
    const renderVideoList = () => {
      if (movieList.length >= 5) {
        return <VideoList movieList={movieList} callback={this.onClickListItem.bind(this)}/>
      }
    }
    return (
      <div>
        <div className="search_bar">
          <SearchBar callback={this.onClickSearch.bind(this)}/>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            <Video videoId={currentMovie.videoId}/>
            <VideoDetail title={currentMovie.title} description={currentMovie.overview}/>
          </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;