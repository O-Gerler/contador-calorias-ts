import { useMemo } from "react";
import { TypeActivity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type TypeCaloryTrackerProps = {
  activities: TypeActivity[];
};

export default function CaloryTracker({ activities }: TypeCaloryTrackerProps) {
  const caloriesConsumed = useMemo(() => {
    return activities.reduce(
      (totalCalories, activity) =>
        (totalCalories += activity.category === 1 ? activity.calories : 0),
      0
    );
  }, [activities]);

  const caloriesBurned = useMemo(() => {
    return activities.reduce(
      (totalCalories, activity) =>
        (totalCalories += activity.category === 2 ? activity.calories : 0),
      0
    );
  }, [activities]);

  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesBurned, caloriesConsumed]
  );

  return (
    <section className="bg-gray-800 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-white text-center">
          Resumen de Calorias
        </h2>
        <div className="flex justify-between gap-5 items-center my-6 text-white text-6xl font-black text-center">
          <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
          <CalorieDisplay calories={caloriesBurned} text="Ejercicio" />
          <CalorieDisplay calories={totalCalories} text="Diferencia" />
        </div>
      </div>
    </section>
  );
}
