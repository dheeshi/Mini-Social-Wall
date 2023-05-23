import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";


export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}


export const Main = () => {

    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postRef)
        setPostsList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
        );

    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="py-20 bg-gradient-to-l from-indigo-900 to-violet-500 ">

            <div className="py-40">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                        Welcome!
                    </h2>
                    <h3 className="text-2xl mb-8 text-gray-200">
                        come together and share your mood.
                    </h3>

                    <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
                        <a href="/" >Let's Go</a>
                    </button>
                </div>
            </div>



            <div className="py-40" >

                {postsList?.map((post) => (
                    <Post post={post} />
                ))}

            </div>



        </div>
    );
};