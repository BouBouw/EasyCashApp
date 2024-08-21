const si = require('systeminformation');

const GetCPU = () => {
    return new Promise(async (resolve, reject) => {
        const cpu = await si.cpu();
        resolve(cpu);
    })
}

const Computer = {
    GetCPU
}

module.exports = Computer;