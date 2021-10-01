import { ActivityPreview } from './ActivityPreview'

export function ActivitiesList({ CommAndAct, isShowActivities, currTask }) {

    return (
        <div className="activities-list">
            {CommAndAct.map(activity => {
                return <ActivityPreview key={activity.id} activity={activity} isShowActivities={isShowActivities} currTask={currTask}/>
            })}

        </div>
    )
}