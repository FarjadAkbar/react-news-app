import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Container, Col, Row, Image } from "react-bootstrap";
import { dateConversion } from "../utils";
import { useQuery, useQueryClient } from "react-query";
import { PageWrap } from "../components";



const SinglePost = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  
  const id = query.get('id');
  
  const queryClient = useQueryClient();

  const queryCache = queryClient.getQueryCache();
  const queryData = queryCache.find('articles');
  
  const data = queryData?.state.data;

  let filteredData: Array<{
    author: string;
    category: string;
    title: string;
    description: string;
    date: string;
    urlToImage: string; 
    id: String 
}> = [];

  if (Array.isArray(data)) {
    filteredData = data.filter((item: { id: any }) => item.id === id);
  }

  return (
    <Container className="my-5">
      <Row>
        {
          filteredData ? (
        <Col>
          
          <h2 className="entry-title">{filteredData[0]?.title}</h2>
          <Image src={filteredData[0]?.urlToImage || "https://s.aolcdn.com/images/dims?client=fh7w6q744eiognjk&signature=d59d0cf6af1d779a3dca451e0ba259c33bbc6115&image_uri=https%3A%2F%2Fs.aolcdn.com%2Fos%2Fab%2F_cms%2F2019%2F08%2F30142658%2F2020-jeep-wrangler-16.jpg&thumbnail=750%2C422&quality=80"} fluid />

          <div className="post-content mt-4">
            <div className="entry-meta mb-3">
              <p className="mb-0">
                <small className="text-muted">
                  {dateConversion(filteredData[0]?.date)} by <a href="#">{filteredData[0]?.author}</a>
                </small>
              </p>
              <p className="mb-0">
                <small className="text-muted">{filteredData[0]?.category}</small>
              </p>
            </div>
            <div className="entry-content">
              <p>{filteredData[0]?.description}</p>
            </div>
          </div>
        </Col>
          )
          : <PageWrap heading="Try Later" subheading="" />
        }
      </Row>
    </Container>
  );
};

export default SinglePost;
