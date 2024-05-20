import { Dispatch, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { TypeActivity } from "../types";
import {
  TypeActivityActions,
  TypeActivityState,
} from "../reducer/activityReducer";

type TypeFormProps = {
  dispatch: Dispatch<TypeActivityActions>;
  state: TypeActivityState;
};

const initialState: TypeActivity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: TypeFormProps) {
  const [activity, setActivity] = useState<TypeActivity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      setActivity(
        state.activities.filter(
          (activityItem) => activityItem.id === state.activeId
        )[0]
      );
    }
  }, [state.activeId, state.activities]);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(event.target.id);

    setActivity({
      ...activity,
      [event.target.id]: isNumberField
        ? +event.target.value
        : event.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidActivity) return;

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({ ...initialState, id: uuidv4() });
  };

  return (
    <section className="bg-lime-500 py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <form
          className="space-y-5 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="category">Categoría</label>
            <select
              className="border border-slate-300 w-full p-2 rounded-lg mt-2"
              name=""
              id="category"
              value={activity.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="p-2">
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name">Actividad:</label>
            <input
              type="text"
              id="name"
              className="w-full border border-slate-300 p-2 rounded-lg mt-2 "
              placeholder="Futbol..."
              value={activity.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="calories">Calorias:</label>
            <input
              type="number"
              id="calories"
              className="w-full border border-slate-300 p-2 rounded-lg mt-2 "
              placeholder="500"
              value={activity.calories}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value={
              activity.category === 1 ? "Guardar Comida" : "Guardar Actividad"
            }
            className="bg-gray-800 hover:bg-gray-900 w-full uppercase text-white p-2 font-bold cursor-pointer disabled:opacity-10"
            disabled={!isValidActivity()}
          />
        </form>
      </div>
    </section>
  );
}
