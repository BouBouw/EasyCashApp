const os = require('os');
const si = require('systeminformation');
const osu = require('node-os-utils');

async function getSystemInfo() {
    try {
        console.log(si)
        // Informations sur le CPU
        const cpu = await si.cpu();
        console.log('CPU:', cpu);
        document.getElementById('cpu-name').innerHTML = `${cpu.brand}`;
        document.getElementById('cpu-ghz-size').innerHTML = `${cpu.speed} GHz`;

        document.getElementById('cpu-min-max').innerHTML = `${cpu.speedMax}`;
        document.getElementById('cpu-cores').innerHTML = `${cpu.cores}`;
        document.getElementById('cpu-threads').innerHTML=`${cpu.physicalCores}`;

        document.getElementById('cpu-socket').innerHTML=`${cpu.socket}`;

        // Utilisation du CPU
        const cpuUsage = await osu.cpu.usage();
        console.log('Utilisation du CPU (%):', cpuUsage);

        // Informations sur la mémoire (RAM)
        const mem = await si.mem();
        const slots = await si.memLayout();
        console.log('Mémoire (RAM):', mem);
        console.log('Slots (RAM):', await si.memLayout())

        // document.getElementById('ram-uses').innerHTML = `${(Math.floor(mem.total - mem.free) / 1073741824).toFixed(2)}/${(Math.floor(mem.total / 1073741824)).toFixed(2)} GB`;

        const ramContainer = document.querySelector('.ram-container');
        slots.forEach((memory, index) => {
            const testDiv = document.createElement('div');

            //  testDiv.textContent = `Ram: ${memory.manufacturer} • ${(Math.floor(memory.size / 1073741824)).toFixed(0)} GB`;
            testDiv.textContent =  `${index + 1}. Modèle : ${memory.manufacturer}
            Capacité : ${(Math.floor(memory.size / 1073741824)).toFixed(0)} Go\n
            Type : ${memory.type}\n
            Tension : ${memory.voltageConfigured}V
            `

            testDiv.style.padding = '10px';
            testDiv.style.margin = '5px';

            ramContainer.appendChild(testDiv);
        })

        // Informations sur les disques (SSD, HDD)
        const diskLayout = await si.diskLayout();
        const disksContainer = document.querySelector('.disks-container');
        console.log('Disques:', diskLayout);
        diskLayout.forEach((disk) => {
            const diskContainer = document.createElement('div');
            const diskInfos = document.createElement('div');
            const testDiv = document.createElement('div')

            diskContainer.className = 'disk-container';
            diskInfos.className = 'disk-infos'

            testDiv.textContent = `Disque: ${disk.name} • Size : ${(Math.floor(disk.size / 1073741824)).toFixed(2)} GB • Type : ${disk.interfaceType} | ${disk.type}`;

            testDiv.style.border = '1px solid #ccc';
            testDiv.style.padding = '10px';
            testDiv.style.margin = '5px';
            testDiv.style.borderRadius = '5px';
            testDiv.style.backgroundColor = '#f9f9f9';

            // Ajoutez le div au conteneur existant
            disksContainer.appendChild(diskContainer);
            disksContainer.appendChild(diskInfos);
            disksContainer.appendChild(testDiv);
            console.log(disk)
        })

        const diskUsage = await si.fsSize();
        console.log('Utilisation des disques:', diskUsage);

        // Informations sur les interfaces réseau
        const networkInterfaces = await si.networkInterfaces();
        console.log('Interfaces réseau:', networkInterfaces);

        // Informations sur la carte graphique
        const graphics = await si.graphics();
        console.log('Carte graphique:', graphics);

        const gpuContainer = document.querySelector('.gpu-container');
        graphics.controllers.forEach((gpu) => {
            const testDiv = document.createElement('div');

            testDiv.textContent = `${gpu.model} • ${Math.floor(gpu.memoryTotal).toString().charAt(0)} GB • VRAM : ${Math.floor(gpu.vram).toString().charAt(0)} GB`;

            testDiv.style.border = '1px solid #ccc';
            testDiv.style.padding = '10px';
            testDiv.style.margin = '5px';
            testDiv.style.borderRadius = '5px';
            testDiv.style.backgroundColor = '#f9f9f9';

            gpuContainer.appendChild(testDiv);
        })

        // Informations sur les périphériques
        const usbDevices = await si.usb();
        console.log('Périphériques USB:', usbDevices);

        // Informations sur le système (nom de l'OS, version)
        const osInfo = await si.osInfo();
        console.log('Informations système:', osInfo);
        document.getElementById('computer-name').innerHTML = `${osInfo.hostname}`;
        document.getElementById('computer-version').innerHTML = `${osInfo.distro}`

        // Informations sur les processus en cours
        const processes = await si.processes();
        console.log('Processus en cours:', processes);

        const battery = await si.battery();
        console.log('Batterie:', battery);
        if(battery.hasBattery) {

        }

        const bios = await si.bios();
        console.log('Bios:', bios);

        const test = await si.chassis();
        console.log('[DEV]', test)

    } catch (error) {
        console.error('Erreur lors de la récupération des informations système:', error);
    }
}

// Exécution de la fonction
getSystemInfo();