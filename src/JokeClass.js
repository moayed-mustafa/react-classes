import React from "react";

class JokeClass extends React.Component {

    render() {
        return (
            <div className="Joke">
                <div className="Joke-votearea">
                    <div className="Joke-text">{this.props.joke}</div>
                    <button onClick={()=>this.props.vote(this.props.id, +1) }>
                    <i className="fas fa-thumbs-up" />
                    </button>
                    <button onClick={()=>this.props.vote(this.props.id, -1)}>
                    <i className="fas fa-thumbs-down" />
                    </button>

                    {this.props.votes}

                </div>

            </div>

        )
    }

}


export default JokeClass