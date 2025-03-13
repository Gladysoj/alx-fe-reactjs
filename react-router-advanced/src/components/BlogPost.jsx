import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams(); 

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Blog Post #{id}</h1>
      <p>This is the content for blog post {id}.</p>
      <p>Dynamic routing allows us to show different content based on the URL parameter.</p>
    </div>
  );
};

export default BlogPost;