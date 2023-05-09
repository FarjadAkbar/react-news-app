/** @format */
import { Badge, Card, Col, Row } from "react-bootstrap";
import { dateConversion } from "../utils";
import { PostDataProps } from "../constants";



const PostCard = ({ post }: { post: PostDataProps }) => {
  return (
    <Card >
      <Card.Img variant="top" src={post.urlToImage || "https://s.aolcdn.com/images/dims?client=fh7w6q744eiognjk&signature=d59d0cf6af1d779a3dca451e0ba259c33bbc6115&image_uri=https%3A%2F%2Fs.aolcdn.com%2Fos%2Fab%2F_cms%2F2019%2F08%2F30142658%2F2020-jeep-wrangler-16.jpg&thumbnail=750%2C422&quality=80"} className="blog-thumbnail" />
      <Card.Body className="blog-container">
        <Badge className="tag">{post.category}</Badge>
      
          <Card.Link href={`/posts/${post.id}`} className="dark-link">
            <Card.Title className="mt-1 mb-3 font-weight-bold text-dark">
                {post.title}
            </Card.Title>
          </Card.Link>
        {/* <Card.Text className="card-text blog-desc mb-4">
          {post?.description?.slice(0, 150)}{" "}
          {post?.description?.length > 150 && "..."}
        </Card.Text> */}
        <Row>
          <Col xs="auto" className="user-info">
            <h5>{post.author}</h5>
            <small className="text-muted"><i>{dateConversion(post.date)}</i></small>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
