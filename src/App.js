import React, { Component } from "react";
import "./App.css";
import Card from "./component/card";
import Header from "./component/header";
import axios from "axios";

class App extends Component {
  state = {
    categories: {
      wentWell: [],
      didntGoWell: [],
      needToImprove: [],
      actionItems: [],
    },

    title: "",
    description: "",
    id: 0,
    Cards: [],
    likes: 0,
    dislikes: 0,
    author: "",
    category: "",
  };

  title = (event) => {
    this.setState({ title: event.target.value });
  };

  author = (event) => {
    this.setState({ author: event.target.value });
  };

  description = (event) => {
    this.setState({ description: event.target.value });
  };

  validateInput = (e) => {
    if (e.target.value === "") {
      window.alert("input required");
    }
  };

  Delete = (id) => {
    this.setState({
      Cards: this.state.Cards.filter((card) => card.id !== id),
    });
  };

  handleLikes = (idx) => {
    let newCards = [...this.state.Cards];
    newCards[idx].likes++;
    this.setState({
      Cards: newCards,
    });
  };

  handleDislikes = (idx) => {
    let newCards = [...this.state.Cards];
    newCards[idx].dislikes++;
    this.setState({
      Cards: newCards,
    });
  };

  handleSave = () => {
    const cardDetail = {
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      author: this.state.author,
    };
    axios
      .post("http://localhost:5000/app/user", cardDetail)
       .then((res) => console.log(res.data));
      
  };

  CreateCard = (type, input) => {
    this.setState({
      Cards: [
        ...this.state.Cards,
        {
          id: this.state.id,
          type: type,
          input: input,
          likes: 0,
          dislikes: 0,
        },
      ],
      id: this.state.id + 1,
    });
    this.setState({ category: type });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <br />
        <div className="container h-100">
          <div className="position-relative h-100">
            <div className="position-absolute top-left">
              <h4>Went Well</h4>
              <button
                type="button"
                className="addButton"
                onClick={() => this.CreateCard("Went Well", "")}
              >
                +
              </button>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "Went Well") {
                  return (
                    <Card
                      key={"Went Well" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      description={this.description}
                      title={this.title}
                      author={this.author}
                      validateInput={this.validateInput}
                      Delete={this.Delete}
                      likesCount={card.likes}
                      dislikesCount={card.dislikes}
                      handleLikes={this.handleLikes}
                      handleDislikes={this.handleDislikes}
                      handleSave={this.handleSave}
                      color={"wentWell"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="position-absolute top-center">
              <h4>Didn’t go well</h4>
              <button
                type="button"
                className="addButton"
                onClick={() => this.CreateCard("Didn’t go well", "")}
              >
                +
              </button>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "Didn’t go well") {
                  return (
                    <Card
                      key={"Didn’t go well" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      description={this.description}
                      title={this.title}
                      author={this.author}
                      validateInput={this.validateInput}
                      Delete={this.Delete}
                      likesCount={card.likes}
                      dislikesCount={card.dislikes}
                      handleLikes={this.handleLikes}
                      handleDislikes={this.handleDislikes}
                      handleSave={this.handleSave}
                      color={"didNotGoWell"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="position-absolute top-right">
              <h4>Need to Improve</h4>
              <button
                type="button"
                className="addButton"
                onClick={() => this.CreateCard("Need to Improve", "")}
              >
                +
              </button>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "Need to Improve") {
                  return (
                    <Card
                      key={"Need to Improve" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      description={this.description}
                      title={this.title}
                      author={this.author}
                      validateInput={this.validateInput}
                      Delete={this.Delete}
                      likesCount={card.likes}
                      dislikesCount={card.dislikes}
                      handleLikes={this.handleLikes}
                      handleDislikes={this.handleDislikes}
                      handleSave={this.handleSave}
                      color={"needToImprove"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="position-absolute top-right-extreme">
              <h4>Addition Comment</h4>
              <button
                type="button"
                className="addButton"
                onClick={() => this.CreateCard("Addition Comment", "")}
              >
                +
              </button>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "Addition Comment") {
                  return (
                    <Card
                      key={"Addition Comment" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      description={this.description}
                      title={this.title}
                      author={this.author}
                      validateInput={this.validateInput}
                      Delete={this.Delete}
                      likesCount={card.likes}
                      dislikesCount={card.dislikes}
                      handleLikes={this.handleLikes}
                      handleDislikes={this.handleDislikes}
                      handleSave={this.handleSave}
                      color={"actionItems"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
