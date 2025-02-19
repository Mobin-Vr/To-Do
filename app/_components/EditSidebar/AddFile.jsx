import BoxBtn from "./BoxBtn";
import BoxTemplate from "./BoxTemplate";

function AddFile() {
  return (
    <BoxTemplate>
      {/* LATER Complete add file feature */}
      <BoxBtn
        disabled={true}
        icon="PaperClipIcon"
        text="Add file / Coming soon ..."
      />
    </BoxTemplate>
  );
}

export default AddFile;
