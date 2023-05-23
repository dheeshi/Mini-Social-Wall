import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const NavBar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    };


    return (
        <div className="items-center dark:bg-gray-900 w-full h-28">

            <div className="flex text-sm md:text-lg  font-mono text-center justify-start text-white ">

                <Link className="pl-8 md:pl-20  mt-10" to="/" >Home</Link>
                {!user ? (
                    <Link className="pl-10 mt-10" to="/login" >Login</Link>
                ) : (
                    <Link className="md:pl-10 pl-8 mt-10" to="/createpost" > Create Post </Link>
                )}

            </div>


            <div className="flex text-sm md:text-lg  font-mono  text-center  justify-end text-white">
                {user && (
                    <>
                        <img className="rounded-full -mt-6 md:-mt-8" src={user?.photoURL || ""} width="30" height="30" />

                        <p className="pr-5 md:-mt-8 -mt-5 md:pl-2 pl-1 text-sm md:text-xl" > {user?.displayName} </p>

                        <button className="pr-8 md:pr-20 -mt-7  md:-mt-9 " onClick={signUserOut} > Log Out </button>
                    </>
                )

                }

            </div>

        </div>
    )
}