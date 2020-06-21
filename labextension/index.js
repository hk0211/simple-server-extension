const extension = {
    id: 'simple-lab-extension',
    autoStart: true,
    activate: (app) => {
        const updateData = () => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', '/simple-server-extension', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({"foo": "bar"}));
        };
        updateData();
        console.log('updateData() completed.');
    }
}

export default extension;    