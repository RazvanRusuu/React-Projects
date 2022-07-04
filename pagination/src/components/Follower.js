import React from "react";

const Follower = (props) => {
  return (
    <figure className="card">
      <img src={props.img} alt="user avatar" />
      <h4>{props.name}</h4>
      <a className="btn" href={props.url}>
        View Profile
      </a>
    </figure>
  );
};

export default Follower;
