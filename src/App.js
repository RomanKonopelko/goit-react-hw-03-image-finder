import { Component } from 'react';
import imageRequest from './Servises/imageAxios';
import Loader from 'react-loader-spinner';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Button from './Components/Button';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './image.css';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  getQuery = q => {
    this.setState({
      searchQuery: q,
      images: [],
      currentPage: 1,
      error: null,
      isLoading: false,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imageRequest(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.getQuery} />
        <ImageGallery images={this.state.images} onClick={this.toggleModal} />
        {this.state.isLoading && (
          <div className="loader">
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
        {this.state.images.length > 0 && !this.state.isLoading && (
          <Button onClick={this.fetchImages} />
        )}
      </>
    );
  }
}
export default App;
