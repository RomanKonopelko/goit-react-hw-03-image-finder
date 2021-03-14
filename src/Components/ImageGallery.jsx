import ImageGalleryItem from './ImageGalleryItem'
import { Component } from 'react'
import PropTypes from 'prop-types'
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
    };

    getModalImg = (src, alt) => {
        this.setState({
            src, alt
        })
    }

    render() {
        const { images } = this.props
        return <>
            <ul className="ImageGallery">
                {images.map(({ id, webformatURL, tags, largeImageURL }) => {
                    return <ImageGalleryItem key={`${id + tags}`} id={id} src={webformatURL} alt={tags} data={largeImageURL} onClick={this.toggleModal} getModalImg={this.getModalImg} />
                })}
            </ul>
            {this.state.showModal && <Modal src={this.state.src} alt={this.state.alt} onClose={this.toggleModal} />}
        </>
    }
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }))
}