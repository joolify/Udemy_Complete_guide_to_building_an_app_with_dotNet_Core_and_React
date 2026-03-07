import Box from "@mui/material/Box";
import ActivityCard from "./ActivityCard";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}
export default function ActivityList({activities, selectActivity, deleteActivity}: Props) {

    console.log("ActivityList: " + JSON.stringify(activities));
    console.log("ActivityList2: " + selectActivity);
    console.log("ActivityList3: " + deleteActivity);
  return (
  <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
    {activities.map(activity => (
     <ActivityCard key={activity.id} activity={activity} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
     />
  ))}
  </Box>
  )
}