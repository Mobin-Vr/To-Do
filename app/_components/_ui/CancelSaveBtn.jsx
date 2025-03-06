import OrdinaryBtn from "./OrdinaryBtn";

export default function CancelSaveBtn({ hanldeCancel, hanldeSave }) {
  return (
    <div className="mb-2 flex w-full gap-1 px-1">
      <OrdinaryBtn
        onClick={hanldeCancel}
        text="Cancel"
        mode="reversePrimary"
        className="w-full"
      />

      <OrdinaryBtn
        onClick={hanldeSave}
        text="Save"
        mode="reverseSecondary"
        className="w-full"
      />
    </div>
  );
}
