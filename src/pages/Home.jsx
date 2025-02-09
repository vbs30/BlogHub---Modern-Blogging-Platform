import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import banner1 from '../images/banner1.png'
import banner2 from '../images/banner2.png'
import banner3 from '../images/banner3.png'


function Home() {
    const [posts, setPosts] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)

    // Example gallery images - replace with your actual images
    const galleryImages = [
        { id: 1, url: banner1, alt: "Banner 1" },
        { id: 2, url: banner3, alt: "Banner 3" },
        { id: 3, url: banner2, alt: "Banner 2" },
    ]

    useEffect(() => {
        appwriteService.getActivePosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })

        // Auto-slide for gallery
        const timer = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === galleryImages.length - 1 ? 0 : prev + 1
            )
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === galleryImages.length - 1 ? 0 : prev + 1
        )
    }

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1
        )
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <Container>
                    <div className="transform hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Login to read posts
                            </h1>
                            <p className="mt-4 text-gray-600 text-lg">
                                Join our community to discover amazing content
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Gallery */}
            <div className="relative w-full h-130 overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {galleryImages.map((image) => (
                        <div key={image.id} className="w-full h-full flex-shrink-0">
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Gallery Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
                >
                    ←
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
                >
                    →
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {galleryImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 
                                ${currentSlide === idx ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Posts Section */}
            <section className="py-12">
                <Container>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Active Posts
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-blue-600 to-transparent mx-8" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                className="transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                <div className="bg-white rounded-xl shadow-lg shadow-blue-500/5 overflow-hidden h-full">
                                    <PostCard {...post} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Home