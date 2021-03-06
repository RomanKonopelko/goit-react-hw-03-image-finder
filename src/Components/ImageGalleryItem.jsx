import PropTypes from 'prop-types'

export default function ImageGalleryItem({ src, alt, id, data, onClick, getModalImg }) {
    return <li className="ImageGalleryItem" key={id}>
        <img src={src} alt={alt} data-large={data} className="ImageGalleryItem-image" onClick={(e) => {
            onClick();
            getModalImg(e.target.dataset.large, e.target.alt)
        }} />
    </li>
}

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    getModalImg: PropTypes.func.isRequired
}