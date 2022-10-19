import clsx from "clsx";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import Modal from "./Modal";

type UpdateFilesProps = {
  isOpen: boolean;
  close: () => void;
};

export function UpdateFiles(props: UpdateFilesProps) {
  const [files, setFiles] = useState<File[]>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(
        "🚀 ~ file: UpdateFiles.tsx ~ line 12 ~ onDrop ~ acceptedFiles",
        acceptedFiles
      );
      setFiles(files);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
    onError(err) {
      toast("Failed to upload the files", {
        type: "error",
      });
    },
  });

  return (
    <Modal isOpen={props.isOpen} close={props.close}>
      <div className="w-100 h-100 border">
        <form>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p
              className={clsx(
                "flex h-40 cursor-pointer items-center justify-center",
                isDragActive
                  ? "border-primary bg-gray-50 font-semibold"
                  : "border-dotted"
              )}
            >
              {isDragActive
                ? "Drop the files here ..."
                : "Drag and drop some files here, or click to select files"}
            </p>
          </div>
          {/* <button className="btn btn-primary">Upload</button> */}
        </form>
      </div>
    </Modal>
  );
}
