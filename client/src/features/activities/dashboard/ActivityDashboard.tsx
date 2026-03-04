import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../ActivityDetail";

type Props = {
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity?: Activity;
}

export default function ActivityDashboard({ 
    activities,
    selectActivity,
    cancelSelectActivity,
    selectedActivity

}: Props) {

    console.log("ActivityDashboard: " + JSON.stringify(activities));
    console.log("ActivityDashboard2: " + selectActivity);
    console.log("ActivityDashboard3: " + cancelSelectActivity);
    console.log("ActivityDashboard4: " + JSON.stringify(selectedActivity));
    return (
        <>
            <Grid container spacing={3}>
                <Grid size={7}>
                    <ActivityList 
                    activities={activities}
                    selectActivity={selectActivity}
                    />
                </Grid>
                <Grid size={5}>
                    {selectedActivity && <ActivityDetail 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    />}
                </Grid>
            </Grid>
        </>
    )
}