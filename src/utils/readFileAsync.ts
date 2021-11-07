// https://simon-schraeder.de/posts/filereader-async/

const readFileAsync = (file: Blob) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);
    })
}

export default readFileAsync;