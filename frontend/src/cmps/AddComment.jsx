import React, { Component } from 'react';


export class AddComment extends Component {
    state = {

    }


    render() {
        console.log('loggedinUser', this.props.loggedinUser)
        const { loggedinUser } = this.props
        return (
            <div className="add-comment flex">
                <article className="member-wrapper">
                    {loggedinUser?.imgUrl ? (
                        <img
                            src={loggedinUser.imgUrl}
                            className="member-img"
                            alt={"member-img"}
                        />
                    ) :
                        (
                            <div className="member-img" style={{ background: 'rgb(223, 225, 230)', color: 'inherit' }}>
                                <p className={`member-letter preview`}>{loggedinUser?.fullname?.[0] || ''}</p>
                            </div>
                        )}
                </article>

                <div>Comment add</div>

            </div>
        )
    }

}
