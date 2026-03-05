import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from './NavBar.tsx'
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, [])

  const handleSelectActivity = (id: string, editMode: boolean) => {
    setEditMode(editMode);
    setSelectedActivity(activities.find(x => x.id === id));
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
          <ActivityDashboard activities={activities}
            selectActivity={(id) => handleSelectActivity(id, false)}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleCloseForm}
          />
        </Container>
      </Box>
    </>
  )
}

export default App