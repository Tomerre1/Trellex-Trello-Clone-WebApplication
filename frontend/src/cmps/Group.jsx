import React from "react";

export function Group(props) {
  const { group } = props;
  return (
    <article className="group">   
      <div>
        <p className="group-title">{group.title}</p>
    
      </div>
    </article>
  );
}
