import { TypeActivity } from "../types";

export type TypeActivityActions =
  | { type: "save-activity"; payload: { newActivity: TypeActivity } }
  | { type: "set-activeId"; payload: { id: TypeActivity["id"] } }
  | { type: "delete-activity", payload: { id: TypeActivity["id"]}}
  | { type: "restart-app" }

export type TypeActivityState = {
  activities: TypeActivity[];
  activeId: TypeActivity["id"];
};

const localStorageActivities = () : TypeActivity[] => {
  const activities = localStorage.getItem("activityList")
  return activities ? JSON.parse(activities) : []
}

export const initialState: TypeActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: TypeActivityState = initialState,
  action: TypeActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: TypeActivity[] = [];

    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: ""
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    const updatedActivities : TypeActivity[] = state.activities.filter(activity => activity.id !== action.payload.id)

    return {
      ...state,
      activities: updatedActivities
    }
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: ""
    }
  }

  return state;
};
