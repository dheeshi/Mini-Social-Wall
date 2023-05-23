import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();


    const schema = yup.object().shape({
        title: yup.string().required("you must add a title"),
        description: yup.string().required("you must add a description."),
    });

    const { register, handleSubmit, formState: { errors },
    } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })


    const postRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });


        navigate("/");

    };

    return (

        <div className="p-20 bg-transparent  items-center">

            <form className="p-10 w-full items-center rounded-[7px] overflow-hidden bg-gradient-to-l from-slate-700 to-cyan-700" onSubmit={handleSubmit(onCreatePost)}>

                <input className="p-5 bg-white rounded-md" placeholder="Title..." {...register("title")} />

                <p className="pb-7 pt-2 font-mono" style={{ color: "white" }} >{errors.title?.message}</p>

                <textarea className="p-7  bg-white rounded-md z-[1] " placeholder="Description..."  {...register("description")} />

                <p className="pb-7 pt-2  font-mono " style={{ color: "white" }} >{errors.description?.message}</p>

                <button className="bg-white font-bold rounded-full p-2" >
                    <input className="cursor-pointer font-mono text-base p-1" type="submit" />
                </button>
            </form>
        </div>

    )
};