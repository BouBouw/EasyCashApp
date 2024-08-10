import { useEffect, useState } from 'react';

export const Propreties = () => {
    const [ hardware, setHadrware ] = useState({
        device: {
            lang: null,
            os: null,
            ram: 0,
            cpu: 0
        },
        connexion: {
            online: false
        },
        location: {
            geo: null
        },
        battery: {
            level: 0,
            charging: null
        }
    });

    navigator.getBattery().then(batt => {
        return setHadrware({
            device: {
                lang: navigator.language,
                os: navigator.appVersion,
                ram: navigator.deviceMemory,
                cpu: navigator.hardwareConcurrency
            },
            connexion: {
                online: navigator.onLine
            },
            location: {
                geo: null
            },
            battery: {
                level: batt.level * 100,
                charging: batt.charging
            }
        })
    });

    // console.log(hardware)

    return(
        <div className='p-5'>
            <ul className='flex flex-col space-y-3'>
                <li>
                    <span>
                        Système d'exploitation : { hardware.device.os }
                    </span>
                </li>
                <li>
                    <span>
                        Langue : { hardware.device.lang }
                    </span>
                </li>
                <li>
                    <span>
                        Mémoire vive : { hardware.device.ram } GB
                    </span>
                </li>
                <li>
                    <span>
                        Coeurs CPU : { hardware.device.cpu } 
                    </span>
                </li>
                <li>
                    <span>
                        En ligne : { hardware.connexion.online === true ? 'En ligne' : 'Hors ligne' } 
                    </span>
                </li>
            </ul>
        </div>
    )
}