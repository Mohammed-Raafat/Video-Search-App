import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetails from './VideoDetails';
import LoadingIcon from './LoadingIcon';
import NightModeButton from './NightModeButton';
import ErrorMsg from './ErrorMsg';
import './App.css';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
        pageMode: 'light-mode',
        errors: []
    };

    // This function after user entering a thing to search on
    onSearchSubmit = async (text) => {
        try {
            const response = await youtube.get('/search', {
                params: {
                    q: text
                }
            });
            this.setState({
                videos: response.data.items.slice(1),
                selectedVideo: response.data.items[0]
            });
        } catch(err) {
            const errors = this.state.errors;
            errors.push(err.response.data.error);
            this.setState({
                errors
            });
        }
    }

    // This function for selecting video by user
    onVideoSelect = (video) => {
        const {videos, selectedVideo} = this.state,
            index = videos.indexOf(video),
            prevSelectedVideo = selectedVideo,
            newVideos = videos;
        newVideos[index] = prevSelectedVideo;
        
        this.setState({
            videos: newVideos,
            selectedVideo: video
        });
    }

    // Function to Change mode from light to night and vice versa 
    changeMode = (nightFlag) => {
        if(nightFlag) {
            this.setState({
                pageMode: 'night-mode'
            });
        } else {
            this.setState({
                pageMode: 'light-mode'
            });
        }
    }

    componentDidMount() {
        // Add a random default search result to the page
        const sampleSearchArr = ['cars', 'reactjs', 'frontend', 'html', 'css', 'javascript', 'bootstrap'],
              randomIndex = Math.floor(Math.random() * (sampleSearchArr.length));
        this.onSearchSubmit(sampleSearchArr[randomIndex]);
    }

    render() {
        // Render this to Show errors to user
        if(this.state.errors.length !== 0) {
            return (
                <ErrorMsg error={this.state.errors[0]} />
            );
        }

        // Render this at first to wait for loading
        if(!this.state.selectedVideo) {
            return (
                <LoadingIcon />
            );
        }

        // Normal Rendering
        return ( 
            <div className={this.state.pageMode}>
                <div className="ui container">
                    <div className="ui top fixed fluid vertical menu">
                        <div className="item">
                            <div className="ui grid">
                                <div className="eleven wide mobile fourteen wide tablet fourteen wide computer column">
                                    <SearchBar onSubmit={this.onSearchSubmit} />
                                </div>
                                <div className="five wide mobile two wide tablet two wide computer column middle aligned">
                                    <NightModeButton changeMode={this.changeMode} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ui grid" style={{marginTop: '50px'}}>
                        <div className="sixteen wide mobile eleven wide computer column">
                            <VideoDetails video={this.state.selectedVideo} />
                        </div>
                        <div className="sixteen wide mobile five wide computer column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default App;