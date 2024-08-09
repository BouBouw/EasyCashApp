import { Propreties } from "../Components/Propreties.js";
import { Navbar } from "../Components/Navbar";

export const Welcome = () => {
    return(
        <>
            <Navbar/>
            <section className="p-5">
                <div className="flex flex-col space-y-5">
                    Propriétée
                    <Propreties/>
                </div>
            </section>
        </>
    )
};