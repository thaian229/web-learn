import React from 'react';

class GameDetailScreen extends React.Component {

    componentDidMount() {
        // get game info from this.props.history.location
        // fetch game info
    }

    // componentDidUpdate
    // componentWillUnmount

    render() {
        // console.log(this.props.history);
        // console.log(this.props.history.location);
        // this.props.history.push('/games/gameid');
        return (
            <div>
                Game detail screen
            </div>
        );
    }
}

export default GameDetailScreen;