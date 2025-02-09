import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post?.userID && userData?.$id && post.userID === userData.$id;


    useEffect(() => {
        async function fetchData() {
            if (slug) {
                try {
                    const data = await appwriteService.getPost(slug);
                    if (data) setPost(data);
                    else navigate("/");
                } catch (error) {
                    console.error("Error fetching post:", error);
                }
            } else {
                navigate("/");
            }
        }

        fetchData();
    }, [slug, navigate]);


    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        });
    };

    return post ? (
        <div className="py-6">
            <Container>
                <div className="flex flex-col md:flex-row items-start bg-white border rounded-lg shadow-md overflow-hidden">
                    {/* Left Image Section */}
                    <div className="w-full md:w-2/5 h-48 md:h-auto">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Right Information Section */}
                    <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h1>
                            <div className="text-gray-700 text-base leading-relaxed mb-4">{parse(post.content)}</div>
                        </div>

                        {isAuthor && (
                            <div className="flex justify-end gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="text-sm">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="text-sm">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
