import { useMemo } from "react";
import { TypeActivityActions, TypeActivityState } from "../reducer/activityReducer";

type TypeNavbarProps = {
  dispatch: React.Dispatch<TypeActivityActions>;
  state: TypeActivityState
};

export default function Navbar({ dispatch, state }: TypeNavbarProps) {
  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])

  const handleClick = () => {
    dispatch({ type: "restart-app" })
  };

  return (
    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl px-4 lg:px-0 flex justify-between items-center mx-auto">
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Control de calorias
        </h1>
        <button
          className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10 disabled:hover:bg-gray-800 disabled:cursor-default"
          onClick={handleClick}
          disabled={!canRestartApp}
        >
          Reiniciar App
        </button>
      </div>
    </header>
  );
}
