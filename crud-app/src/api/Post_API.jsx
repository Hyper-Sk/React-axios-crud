import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})

// get all posts 
export const getPosts = () => {
    return api.get('/posts')
}

// delete post 
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`)
}

// post data 
export const addPost = (post) => {
    return api.post(`/posts/`, post)
}

// put (update) data 
export const updatePost = (id,post) => {
    return api.put(`/posts/${id}`, post)
}