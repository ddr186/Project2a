class App extends React.Component {

    state = {
      name: '',
      cost: '',
      img: '',
      lentTo: '',
      books: []
    }

    handleChange = event => {
          this.setState({ [event.target.id]: event.target.value })
        }


        handleSubmit = event => {
        event.preventDefault()
        axios.post('/book', this.state).then(response => {
          this.setState({
                name: '',
                cost: '',
                img: '',
                lentTo: '',
                books: response.data
              }

          )

        })
      }



      componentDidMount = () => {
      axios.get('/book').then(response => {
      this.setState({
        books: response.data
      })
    })
  }




  deleteBook = event => {
    axios.delete('/book/' + event.target.value).then(response => {
      this.setState({
        books: response.data
      })
    })
  }


updateBook = event => {
  event.preventDefault()
  const id = event.target.id
  axios.put('/book/' + id, this.state).then(response => {
    this.setState({
      books: response.data,
      name: '',
      cost: '',
      img: '',
      lentTo: ''

    })
  })
}

render = () => {
  return (
    <div>
    <h1>Create Book</h1>
    <form onSubmit= {this.handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" onChange={this.handleChange}/>
      <label htmlFor="cost">Cost:</label>
      <input type="text" id="cost" onChange={this.handleChange}/>
      <label htmlFor="img">Image:</label>
      <input type="text" id="img" onChange={this.handleChange}/>
      <label htmlFor="lentTo">Lent To:</label>
      <input type="text" id="lentTo" onChange={this.handleChange}/>
      <input type="submit" value="Create Book"/>
    </form>
    <h2>Book Catalogue</h2>
      <ul>
      { this.state.books.map( book => { return (
            <li key={book._id}>
              {book.name} <br />
              <img src={book.img} alt={book.name} />
              Cost: ${book.cost}<br/>
              Lent To: {book.lentTo}
              <button value={book._id} onClick={this.deleteBook}>
                DELETE
              </button>
              <details>
                <summary>Edit this Book</summary>
                <form id={book._id} onSubmit={this.updateBook}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={this.handleChange} value={this.state.name}/>

                  <br />
                  <label htmlFor="cost">Cost</label>
                  <input
                    type="text"
                    id="cost"
                    onChange={this.handleChange}
                    value={this.state.cost}/>
                  <br />
                  <label htmlFor="img">Image Link</label>
                  <br />
                  <input
                    type="text"
                    id="img"
                    onChange={this.handleChange}
                    value={this.state.img}
                  />
                  <br/>
                  <label htmlFor="lentTo">Lent To:</label>
                  <input
                    type="text"
                    id="lentTo"
                    onChange={this.handleChange}
                    value={this.state.lentTo}/>
                  <input type="submit" value="Update Book" />
                </form>
              </details>
            </li>
          ) } ) }
      </ul>
  </div>
  )
}
}


ReactDOM.render(<App></App>, document.querySelector('main'))
