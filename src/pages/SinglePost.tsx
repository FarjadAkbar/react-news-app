/** @format */

import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  views: number;
  loves: number;
  comments: number;
  thumbnail: string;
}

const SinglePost: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // fetch(`https://dummyjson.com/products/${id}`)
    // .then(res => res.json())
    // .then(json => setPost(json))
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={8}>
          <div className="post">
            <div className="entry-header">
              <div className="entry-thumbnail">
                <img className="img-fluid" src={post.thumbnail} alt="Image" />
              </div>
            </div>
            <div className="post-content">
              <div className="entry-meta">
                <ul className="list-inline">
                  <li className="posted-by">
                    <i className="fa fa-user"></i> by{" "}
                    <a href="#">{post.author}</a>
                  </li>
                  <li className="publish-date">
                    <a href="#">
                      <i className="fa fa-clock-o"></i> {post.publishDate}{" "}
                    </a>
                  </li>
                  <li className="views">
                    <a href="#">
                      <i className="fa fa-eye"></i> {post.views}
                    </a>
                  </li>
                  <li className="loves">
                    <a href="#">
                      <i className="fa fa-heart-o"></i> {post.loves}
                    </a>
                  </li>
                  <li className="comments">
                    <i className="fa fa-comment-o"></i>
                    <a href="#">{post.comments}</a>
                  </li>
                </ul>
              </div>
              <h2 className="entry-title">{post.title}</h2>
              <div className="entry-content">
                <p>{post.content}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <h3>Related Posts</h3>
          {/* Render related posts here */}
        </Col>
      </Row>
    </Container>
  );
};

export default SinglePost;
