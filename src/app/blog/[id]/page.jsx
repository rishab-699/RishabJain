import BlogCard from "../../components/blogcard";

const SingleBlogPage = async ({ params }) => {
  const { id } = await params;

  return (
    <div className="w-full flex justify-center overflow-x-hidden px-4 py-8">
      <div className="w-full max-w-5xl">
        <BlogCard blogID={id} />
      </div>
    </div>
  );
};

export default SingleBlogPage;
