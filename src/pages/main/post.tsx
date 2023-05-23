import { Post as IPost } from "./main";

interface Props {
    post: IPost;
}

export const Post = (props: Props) => {
    const { post } = props;

    return (
        <div className="justify-center bg-transparent items-center p-10">


            <div className="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">

                <div id="header" className="flex">

                    <div id="body" className="flex flex-col ml-5">

                        <h4 className="text-xl font-serif mb-2">{post.title}</h4>
                        <p className="text-gray-800 mt-2">{post.description}</p>

                        <div className="flex mt-5">
                            <p className="ml-3">@{post.username}</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};