interface FileUploadProps {
    onFileChanged: (file: Blob) => void;
}

export const FileUpload = ({ onFileChanged }: FileUploadProps) => {
    return (<input
        accept=".db"
        id="contained-button-file"
        multiple
        type="file"
        onChange={e => onFileChanged(e.target.files === null ? new Blob() : e.target.files[0])}
    />);
}