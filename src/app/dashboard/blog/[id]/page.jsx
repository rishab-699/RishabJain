

import BlogCard from "../../components/blogcard";

const SingleBlogPage = async({params})=>{
    const { id } = await params;
    
    return(
        <div className="w-full">
            <BlogCard blogID={id}/>
        </div>
    )
}

export default SingleBlogPage;