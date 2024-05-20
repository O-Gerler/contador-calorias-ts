import { useEffect, useReducer } from "react";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import { activityReducer, initialState } from "./reducer/activityReducer";
import ActivityList from "./components/ActivityList";
import CaloryTracker from "./components/CaloryTracker";

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem("activityList", JSON.stringify(state.activities))
  }, [state.activities])

  return (
    <>
      <Navbar 
        dispatch={dispatch}
        state={state}
      />
      <Form 
        dispatch={dispatch}
        state={state}
      />
      <CaloryTracker 
        activities={state.activities}
      />
      <ActivityList 
        activities={state.activities}
        dispatch={dispatch}
      />
    </>
  )
}

export default App
