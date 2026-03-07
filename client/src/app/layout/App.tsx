import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import NavBar from './NavBar.tsx'
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  const { data: activities = [], isPending } = useQuery({
  queryKey: ['activities'],
  queryFn: async () => {
    const response = await axios.get<Activity[]>('https://localhost:5001/api/activities')
    return response.data
  }
})


  const handleSelectActivity = (id: string, editMode: boolean) => {
    setEditMode(editMode);
    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)

    console.log("handleCancelSelectActivity: " + new Date())
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id, true);
    else handleCancelSelectActivity();

    setEditMode(true);

    console.log("handleOpenForm: " + editMode + ", " + new Date())
  }

  const handleCloseForm = () => {
    setEditMode(false);

    console.log("handleCloseForm: " + editMode)
  }

  const handleSubmitForm = (activity: Activity) => {
    console.log("handleSubmitForm: " + JSON.stringify(activity));
    // if (activity.id) {
    //   setActivities(activities.map(x => x.id === activity.id ? activity : x))
    // } else {
    //   const newActivity = {...activity, id: activities.length.toString()}
    //   setSelectedActivity(newActivity);
    //   setActivities([...activities, newActivity])
    // }
    console.log("handleSubmitForm: " + JSON.stringify(activities));

    setEditMode(false);
  }

  const handleDelete = (id: string) => {
    console.log("handleDelete: " + JSON.stringify(activities));
  }

  console.log("App: " + handleSelectActivity)
  console.log("App 2: " + handleSelectActivity)
  console.log("App 3: " + JSON.stringify(activities))
  console.log("App 3: " + JSON.stringify(selectedActivity))

  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee' }}>
        <CssBaseline />
        <NavBar openForm={handleOpenForm} />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          {!activities || isPending ? (
            <Typography>Loading...</Typography>
          ) : (
            <ActivityDashboard activities={activities}
              selectActivity={(id) => handleSelectActivity(id, false)}
              cancelSelectActivity={handleCancelSelectActivity}
              selectedActivity={selectedActivity}
              editMode={editMode}
              openForm={handleOpenForm}
              closeForm={handleCloseForm}
              submitForm={handleSubmitForm}
              deleteActivity={handleDelete}
            />
          )}

        </Container>
      </Box>
    </>
  )
}

export default App