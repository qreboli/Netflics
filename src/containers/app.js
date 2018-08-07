import React, {Component} from 'react'
import SearchBar from '../components/SearchBar'
import VideoList from '../containers/VideoList'
import axios from 'axios'

const API_END_POINT = "https://api.themoviedb.org/3";
const POPULAR_MOVIE_URL = "/discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=image";
const API_KEY = "api_key=c67d38ce50b627d15f22af99f4e92da1";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {movieList: {}, currentMovie: {}}
  }

  componentWillMount() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&${API_KEY}`).then((response) => {
      this.setState({movieList:response.data.results.slice(1,6)});
      this.setState({currentMovie:response.data.results[0]});
      console.log(this.state.currentMovie);
    });

  }

  render() {
    return (
      <div>
        <SearchBar/>
        <VideoList/>
      </div>
    )
  }
}

export default App;