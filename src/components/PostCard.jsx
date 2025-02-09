import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="group">
            <div className="relative bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Image Section */}
                <div className="relative w-full h-56 bg-black">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                    />
                </div>

                {/* Text Content */}
                <div className="p-5">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h2>
                </div>

                {/* Cool Indicator Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary group-hover:scale-x-105 transition-transform duration-300 origin-left"></div>
            </div>
        </Link>
    );
}

export default PostCard;
