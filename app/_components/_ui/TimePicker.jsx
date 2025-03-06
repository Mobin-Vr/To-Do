export default function TimePicker({
  timeInputRef,
  handleInputClick,
  setTime,
  time,
}) {
  return (
    <div className="mx-1 mb-2 flex w-60 items-center justify-start rounded-md bg-blue-700">
      <span className="my-auto flex w-2/5 justify-center text-nowrap text-xs text-white">
        Select Time
      </span>

      <input
        type="time"
        ref={timeInputRef}
        onClick={handleInputClick}
        onChange={(e) => setTime(e.target.value)}
        value={time}
        className="focus:ring-none flex w-3/5 select-none justify-start rounded-md border-none bg-inherit p-1.5 pr-2 text-xl text-white outline-none focus:text-white focus:outline-none"
      />
    </div>
  );
}
