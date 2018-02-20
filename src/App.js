import React from 'react';

class App extends React.Component {

  createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    this.props.store.dispatch({
      type:'create', 
      data: { content }
    })
    event.target.content.value = ''
  }

  vote = (id) => () => {
    this.props.store.dispatch({
      type:'vote', 
      data: { id }
    })
  }

  render() {
    let anecdotes = Array.from(this.props.store.getState())
    anecdotes.sort((a,b) => b.votes - a.votes)

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.createAnecdote}>
          <div><input name='content'/></div>
          <button type='submit'>create</button> 
        </form>
      </div>
    )
  }
}

export default App