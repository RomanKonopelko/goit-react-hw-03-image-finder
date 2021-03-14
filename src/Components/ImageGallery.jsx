import ImageGalleryItem from './ImageGalleryItem'
import { Component } from 'react'
import Modal from './Modal'

export default class ImageGallery extends Component {
    state = {
        showModal: false,
        src: '',
        alt: ''
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
        console.log(this.state.showModal);
    };

    getModalImg = (src, alt) => {
        this.setState({
            src, alt
        })
    }

    render() {
        const { images } = this.props
        console.log(images);
        return <>
            <ul className="ImageGallery">
                {images.map(({ id, webformatURL, tags, largeImageURL }) => {
                    return <ImageGalleryItem key={id} src={webformatURL} alt={tags} data={largeImageURL} onClick={this.toggleModal} getModalImg={this.getModalImg} />
                })}
            </ul>
            {this.state.showModal && <Modal src={this.state.src} alt={this.state.alt} onClose={this.toggleModal} />}
        </>
    }
}