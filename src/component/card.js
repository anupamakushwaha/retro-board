import React from "react";

function Card(props) {
  return (
    <div className={"BoardItem card " + props.color}>
      <br />
      <input
        type="text"
        style={formStyle}
        placeholder="Title"
        onChange={(e) => props.title(e)}
      />
      <textarea
        placeholder="Enter Text Here"
        onChange={(e) => props.description(e)}
        onBlur={props.validateInput}
      />
      <input
        type="text"
        placeholder="Author"
        style={formStyle}
        onChange={(e) => props.author(e)}
      />
      <br />
      <div className="FunctionNav">
        <button onClick={() => props.handleDislikes(props.idx)}>
          {" "}
          <i className="far fa-thumbs-down" title="Dislikes" />
          {props.dislikesCount}
        </button>
        <button onClick={() => props.Delete(props.cardId)}>
          {" "}
          <i className="far fa-trash-alt" title="Delete card" />
        </button>
        <button onClick={() => props.handleLikes(props.idx)}>
          {" "}
          <i className="far fa-far fa-thumbs-up" title="Likes" />
          {props.likesCount}
        </button>
        <button onClick={() => props.handleSave(props.value)}>
          {" "}
          <i className="fas fa-save" title="Save"></i>
        </button>
      </div>
    </div>
  );
}

const formStyle = {
  background: "rgb(223, 207, 177)",
  border: "none",
  color: "DarkBlue",
  textAlign: "left",
};

export default Card;
