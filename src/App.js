import React, { Component } from 'react';
import './App.css';
import firebase from './config/';
class App extends Component {
  constructor() {
    super()
    this.state = {
      currentItem: '',
      username: '',
      items: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    // passing destination, where data will be stored in firebase
    const itemsRef = firebase.database().ref('items');
    // value fires when elistener is first attahched, everytime a new item is added or removed
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      // loop over each key
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user,
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  handleSubmit(e) {
    // preventing refreshing the  page after submit
    e.preventDefault();
    // passing destination, where data will be stored in firebase
    const itemsRef = firebase.database().ref('items');
    // input from user
    const item = {
        title: this.state.currentItem,
        user: this.state.username,
      }
    // sends copy of object to db
    itemsRef.push(item);
    // clears input fields
    this.setState({
      currentItem: '',
      username: '',
    })
  }

  removeItem(itemId) {
    // look for specific  item
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  render() {

    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>Fun Food Friends</h1>
          </div>
        </header>

        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="What's your name?"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <input
                type="text"
                name="currentItem"
                placeholder="What are you bringing"
                onChange={this.handleChange}
                value={this.state.currentItem}
              />
              <button>Add Item</button>
            </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.items.map(item => (
                  <li key={item.id}>
                    <h3>{item.title}</h3>
                    <p>brought by: {item.user}</p>
                    <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
