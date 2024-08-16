const os = require('os');
const si = require('systeminformation');
const osu = require('node-os-utils');

async function getSystemInfo() {
    try {
        console.log(si)
        // Informations sur le CPU
        const cpu = await si.cpu();
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

        const ramContainer = document.querySelector('.ram-container');
        slots.forEach((memory, index) => {
            const container = document.createElement('div');

            container.className = 'ram-content'

            const model = document.createElement('span');
            model.className = 'ram-model';
            model.innerHTML  = `<b>Modèle :</b> ${memory.manufacturer}`

            const capacity = document.createElement('span');
            capacity.className = 'ram-capacity';
            capacity.innerHTML = `<b>Capacité :</b> ${(Math.floor(memory.size / 1073741824)).toFixed(0)} Go`

            const type = document.createElement('span')
            type.className = 'ram-type';
            type.innerHTML = `<b>Type :</b> ${memory.type}`

            const voltage = document.createElement('span');
            voltage.className = 'ram-voltage';
            voltage.innerHTML = `<b>Tension :</b> ${memory.voltageConfigured}V`

            container.style.padding = '10px';
            container.style.margin = '5px';

            container.appendChild(model);
            container.appendChild(capacity);
            container.appendChild(type);
            container.appendChild(voltage);

            ramContainer.appendChild(container);
        })

        // Informations sur les disques (SSD, HDD)
        const diskLayout = await si.diskLayout();
        const disksContainer = document.querySelector('.disks-container');
        diskLayout.forEach((disk) => {
            const container = document.createElement('div');

            container.className = 'disk-content';

            const name = document.createElement('span');
            name.className = 'disk-name';
            name.innerHTML = `<b>Disque :</b> ${disk.name}`;

            const size = document.createElement('span');
            size.className = 'disk-size';
            size.innerHTML = `<b>Taille :</b> ${(Math.floor(disk.size / 1073741824)).toFixed(2)} GB`;

            const type = document.createElement('span');
            type.className = 'disk-type';
            type.innerHTML = `<b>Type :</b> ${disk.interfaceType} | ${disk.type === 'SSD' ? disk.type : 'HDD' }`;

            container.style.padding = '10px';
            container.style.margin = '5px';

            container.appendChild(name);
            container.appendChild(size);
            container.appendChild(type);

            // Ajoutez le div au conteneur existant
            disksContainer.appendChild(container);
        })

        const diskUsage = await si.fsSize();
        console.log('Utilisation des disques:', diskUsage);

        // Informations sur les interfaces réseau
        const networkInterfaces = await si.networkInterfaces();
        console.log('Interfaces réseau:', networkInterfaces);

        // Informations sur la carte graphique
        const graphics = await si.graphics();

        const gpuContainer = document.querySelector('.gpu-container');
        graphics.controllers.forEach((gpu) => {
            const container = document.createElement('div');

            container.className = 'gpu-content';

            const model = document.createElement('span');
            model.className = 'gpu-model';
            model.innerHTML = `<b>Modèle :</b> ${gpu.model}`;

            const capacity = document.createElement('span');
            capacity.className = 'gpu-capacity';
            capacity.innerHTML = `<b>Capacité :</b> ${Math.floor(gpu.memoryTotal).toString().charAt(0)} GB`;

            const vram = document.createElement('span');
            vram.className = 'gpu-vram';
            vram.innerHTML = `<b>Mémoire Virtuelle :</b> ${Math.floor(gpu.vram).toString().charAt(0)} GB`;

            container.style.padding = '10px';
            container.style.margin = '5px';

            container.appendChild(model);
            container.appendChild(capacity);
            container.appendChild(vram);

            gpuContainer.appendChild(container);
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
        console.log(battery.hasBattery)

        const batteryContainer = document.querySelector('.battery-container');
        const card = document.getElementById('battery-card');
        if(battery.hasBattery === true) {
            card.style.display = 'block';
        } else {
            // card.style.display = 'none';

            // const noBattery = document.createElement('span');
            // noBattery.className = 'battery-error';
            // noBattery.innerHTML = `<b>L'ordinateur ne possède pas de batterie</b>`;

            // changer le msg

            // batteryContainer.appendChild(noBattery);
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