export default function TimePicker({
  timeInputRef,
  handleInputClick,
  setTime,
  time,
}) {
  return (
    <div className="mx-1 mb-2 flex w-60 justify-between rounded-md bg-blue-700 px-12">
      <span className="my-auto text-xs text-white">Select Time</span>
      <input
        type="time"
        ref={timeInputRef}
        onClick={handleInputClick}
        onChange={(e) => setTime(e.target.value)}
        value={time}
        className="focus:ring-none select-none rounded-t-none border-none bg-inherit p-1.5 text-xl text-white outline-none focus:text-white focus:outline-none"
      />
    </div>
  );
}
