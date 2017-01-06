import React, { PropTypes, Component } from 'react';

export default class YouTubeClip extends Component {
  render() {
    if (this.props.data.videos.length > 0) {
      return (
        <iframe
          className="YouTubeClip"
          src={ 'https://www.youtube.com/embed/' + this.props.data.videos[0].id.videoId }>
        </iframe>
      )
    } else {
      return <span/>;
    }
  }
}

YouTubeClip.propTypes = {
  data: PropTypes.object.isRequired
};