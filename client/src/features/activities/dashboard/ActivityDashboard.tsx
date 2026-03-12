import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity?: Activity;
    openForm:  (id?: string) => void
    closeForm: () => void;
    editMode: boolean;
    deleteActivity: (id: string) => void
}

export default function ActivityDashboard({
    activities,
    selectActivity,
    cancelSelectActivity,
    selectedActivity,
    openForm,
    closeForm,
    editMode,
    deleteActivity
}: Props) {

    console.log("ActivityDashboard: " + JSON.stringify(activities));
    console.log("ActivityDashboard2: " + selectActivity);
    console.log("ActivityDashboard3: " + cancelSelectActivity);
    console.log("ActivityDashboard4: " + JSON.stringify(selectedActivity));
    console.log("ActivityDashboard deleteActivity:", deleteActivity);
    return (
        <>
            <Grid container spacing={3}>
                <Grid size={7}>
                    <ActivityList
                        activities={activities}
                        selectActivity={selectActivity}
                        deleteActivity={deleteActivity}
                    />
                </Grid>
                <Grid size={5}>
                    {selectedActivity && !editMode &&
                        <ActivityDetail
                            selectedActivity={selectedActivity}
                            cancelSelectActivity={cancelSelectActivity}
                            openForm={openForm}
                        />}

                {editMode &&
                <ActivityForm closeForm={closeForm} 
                activity={selectedActivity} 
                />}
                </Grid>
            </Grid>
        </>
    )
}