type TypeCalorieDisplayProps = {
  calories: number;
  text: string;
};
export default function CalorieDisplay({
  calories,
  text,
}: TypeCalorieDisplayProps) {
  return (
    <p>
      {calories}{" "}
      <span className="block mt-2 text-xl font-bold">{text}</span>
    </p>
  );
}
