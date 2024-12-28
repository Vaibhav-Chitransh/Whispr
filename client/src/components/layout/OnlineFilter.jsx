export function OnlineFilter({ showOnline, setShowOnline }) {
  const bgColor = showOnline ? "bg-green-500" : "bg-red-500";
  const handleClick = () => {
    setShowOnline(!showOnline);
  };

  return (
    <div
      className={`h-4 w-4 rounded-full cursor-pointer ${bgColor}`}
      onClick={handleClick}
    ></div>
  );
}
