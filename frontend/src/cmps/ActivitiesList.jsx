import { ActivityPreview } from './ActivityPreview'

export function ActivitiesList({ CommAndAct }) {

    console.log('CommAndAct', CommAndAct)
    return (
        <div className="activities-list">
              {CommAndAct.map(activity => {
                return <ActivityPreview key={activity.id} activity={activity} />
            })}

        </div>
    )
}