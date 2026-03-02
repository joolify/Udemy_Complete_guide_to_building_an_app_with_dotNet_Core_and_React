import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";

type Props = {
    activities: Activity[];
}

export default function ActivityDashboard({activities}: Props) {
    return (
        <div>
            <Grid>
                <ActivityList activities={activities} />
            </Grid>
        </div>
    )
}
