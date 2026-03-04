import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from './NavBar.tsx'
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);


  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }

  console.log("App: " + handleSelectActivity)
  console.log("App 2: " + handleSelectActivity)
  console.log("App 3: " + JSON.stringify(activities))
  console.log("App 3: " + JSON.stringify(selectedActivity))

  return (
    <>
      <Box sx={{bgcolor: '#eeeeee'}}>
        <CssBaseline />
        <NavBar />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          <ActivityDashboard activities={activities}
          selectActivity = {handleSelectActivity}
          cancelSelectActivity = {handleCancelSelectActivity}
          selectedActivity = {selectedActivity}
          />
        </Container>
      </Box>
    </>
  )
}

export default App