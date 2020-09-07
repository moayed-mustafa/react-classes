import React from "react";
import axios from "axios"
import JokeClass from './JokeClass'
import Spinner from './Spinner'
import './JokeList.css'

class JokeListClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jokes: [], error: null }
        this.updateVotes = this.updateVotes.bind(this)
        this.sortJokes = this.sortJokes.bind(this)

    }

    // lifecycle methods
    componentDidMount() {
        this.getJokes()
    }
    componentDidUpdate() {
        if (this.state.jokes.length < this.props.numOfJokes) {
            this.getJokes()
        }
    }
    // functionality methods
    async getJokes() {
        if (this.state.jokes.length === 0) {
            try {
                let js = [...this.state.jokes]
                let seenJokes = new Set(js.map(joke => joke.id))
                let jokeVotes = JSON.parse(
                    window.localStorage.getItem("jokeVotes") || "{}"
                );
                console.log(jokeVotes)
                while (js.length < this.props.numOfJokes) {
                    let res = await axios.get("https://icanhazdadjoke.com", {
                        headers: { Accept: "application/json" }
                    });
                    if (!seenJokes.has(res.data.id)) {
                        const { id, joke } = res.data
                        jokeVotes[id] = jokeVotes[id] || 0;
                        js.push({id:id, joke:joke, votes:jokeVotes[id]})
                        seenJokes.add(res.data.id)
                    }
                }
                this.setState({ jokes: js })
                // empty the localstorage first then add to it all the new votes and ids
                window.localStorage.clear()
                    window.localStorage.setItem('jokeVotes', JSON.stringify(jokeVotes))

            } catch (e) {
                console.log(e)
            }
        }
    }


    updateVotes(id, delta) {
        let jokeVotes = JSON.parse(window.localStorage.getItem("jokeVotes"))
        jokeVotes[id] = (jokeVotes[id] || 0) + delta
        window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));

        this.setState(state => ({
            jokes: state.jokes.map(joke => (
                joke.id === id? { ...joke, votes: joke.votes + delta } : joke
            ))
        }))
     }
    sortJokes() {
        if (this.state.jokes.length) {
            return this.state.jokes.sort((a,b)=> b.votes - a.votes)
        }
    }


    render() {
        let jokes = this.state.jokes.length
        const sortedJokes = this.sortJokes()
        return (
            jokes ?
                <div className="JokeList">
                    <button className="JokeList-getmore" onClick={()=>this.setState({jokes: []})}>Get Jokes</button>
                    {sortedJokes.map(joke => (
                        <JokeClass joke={joke.joke}
                            key={joke.id}
                            id={joke.id}
                            votes={joke.votes}
                            vote={this.updateVotes}
                          />
                    ))}
                </div> :
                <Spinner/>
                // <h1> No Jokes to show you</h1>
        )

    }

}


export default JokeListClass