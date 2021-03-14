import { Component } from 'react';
import Searchbar from './Components/Searchbar';
import imageRequest from './Servises/imageAjax';
import ImageGallery from './Components/ImageGallery';
import './image.css';
import Button from './Components/Button';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      console.log('update');
      console.log(this.state.searchQuery);
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
    console.log(this.state.searchQuery);
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
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.getQuery} />
        <ImageGallery images={this.state.images} onClick={this.toggleModal} />
        {this.state.images.length > 0 && <Button onClick={this.fetchImages} />}
      </>
    );
  }
}
export default App;
