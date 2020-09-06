import React from "react";

class JokeClass extends React.Component {
    //  upVote(){ this.props.vote(this.props.id, +1) }
     downVote(){ this.props.vote(this.props.id, -1) }

    render() {
        return (
            <div className="Joke">
                <div className="Joke-votearea">
                    <button onClick={()=>this.props.vote(this.props.id, +1) }>
                    <i className="fas fa-thumbs-up" />
                    </button>
                    <button onClick={()=>this.props.vote(this.props.id, -1)}>
                    <i className="fas fa-thumbs-down" />
                    </button>

                    {this.props.votes}

                    <div className="Joke-text">{this.props.joke}</div>
                </div>

            </div>

        )
    }

}


export default JokeClass