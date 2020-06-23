import { KernelAPI, KernelManager, KernelMessage } from '@jupyterlab/services';

const extension = {
    id: 'simple-lab-extension',
    autoStart: true,
    activate: async (app) => {
        const updateData = () => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', '/simple-server-extension', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({"foo": "bar"}));
        };
        await accessKernel();
        updateData();
        console.log('updateData() completed.');
    }
}

async function accessKernel() {
  let kernelManager = new KernelManager();
  let kernelModels = await KernelAPI.listRunning();
  console.log(kernelModels);
  if (kernelModels.length > 0) {
    console.log(`Connecting to ${kernelModels[0].name}`);
    const kernel = kernelManager.connectTo({ model: kernelModels[0] });

    console.log('Executing code');
    let future = kernel.requestExecute({ code: 'token = "asdf"' });
    future.onIOPub = msg => {
      if (msg.header.msg_type !== 'status') {
        console.log(msg.content);
      }
    };
    await future.done;
    console.log('Execution is done');
  }
}

export default extension;    
