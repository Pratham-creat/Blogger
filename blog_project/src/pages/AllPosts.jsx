import React, {useState, useEffect} from "react"
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components"
import { appendErrors } from "react-hook-form"

function AllPosts() {
    const [post, setPost] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPost(posts.documents)
            }
        })
    }, [])
    return (
        <div className="w-full">
            <Container>
                <div className="flex flex-wrap">
                    {post.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts