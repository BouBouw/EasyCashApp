export const Propreties = () => {
    let plateform;
    switch(navigator.platform) {
        case 'Win32': {
            plateform = "Windows 11"
        }
    }


    return(
        <>
            <ul className="">
                <li>
                    <span>
                        Système d'exploitation : { plateform }
                    </span>
                </li>
            </ul>
        </>
    )
}