import React from "react";

export function Group(props) {
  const { group } = props;
  return (
    <article className="group">   
      <div>
        <p className="group-title flex column">{group.title}</p>
        {group.tasks.map((task,idx) =><p key={idx}>{JSON.stringify(task)}</p>)}
      </div>
    </article>
  );
}
