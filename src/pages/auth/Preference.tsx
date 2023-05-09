/** @format */

import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useArticlePreference, useArticlePreferenceGet, useAuthorsGet, useCategoriesGet } from "../../api";
import { sourcesData, Option } from "../../constants";
import Cookies from "js-cookie";



const Preference = () => {
  const { data: preferencesData, isFetching: preferencesFetching } = useArticlePreferenceGet();
  
  const { data: authorData, isFetching: authorFetching } = useAuthorsGet();
  const { data: categoryData, isFetching: categoryFetching } = useCategoriesGet();

  const { mutate } = useArticlePreference();

  const [authors, setAuthor] = useState<string[]>([]);
  const [categories, setCategory] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    if(preferencesData){
      setAuthor(JSON.parse(preferencesData?.authors || '[]'));
      setCategory(JSON.parse(preferencesData?.categories || '[]'));
      setSources(JSON.parse(preferencesData?.sources || '[]'));
    }
  }, [preferencesData])
  
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.checked) {
      setAuthor([...authors, name]);
    } else {
      setAuthor(authors.filter((x) => x !== name));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.checked) {
      setCategory([...categories, name]);
    } else {
      setCategory(categories.filter((x) => x !== name));
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.checked) {
      setSources([...sources, name]);
    } else {
      setSources(sources.filter((x) => x !== name));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = Cookies.get("users");
    
    if(user !== undefined){
      const user_id = JSON.parse(user || '[]')?.id;
      mutate(
        { id: user_id, categories, sources, authors },
        {
          onSuccess: (response: any) => {
            console.log(response);
          },
  
          onError: (error: any) => {
            console.error(error);
          },
        }
      );
    }
  };


  if (preferencesFetching) {
    return (
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">Be patience....</span>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1 className="mb-4">Preferences</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
            <Col md={6}>
                <h5>Authors</h5>
                {
                  authorFetching ? <h4>Loading....</h4> : 
                    authorData?.map((author: Option) => (
                    <Form.Check
                      key={author.value}
                      type="checkbox"
                      label={author.label}
                      name={author.value}
                      onChange={handleAuthorChange}
                      checked={authors.includes(author.value)}
                    />
                  ))
                }
              </Col>


              <Col md={3}>

              <h5>Categories</h5>
                {
                  categoryFetching ? <h4>Loading....</h4> : 
                  categoryData?.map((category: Option) => (
                    <Form.Check
                      key={category.value}
                      type="checkbox"
                      label={category.label}
                      name={category.value}
                      onChange={handleCategoryChange}
                      checked={categories.includes(category.value)}
                    />
                  ))
                }
              </Col>
              

              <Col md={3}>
              <h5>Sources</h5>
                {sourcesData?.map((source) => (
                  <Form.Check
                    key={source.value}
                    type="checkbox"
                    label={source.label}
                    name={source.value}
                    onChange={handleSourceChange}
                    checked={sources.includes(source.value)}
                  />
                ))}
              </Col>
            </Row>
            <Button type="submit" className="mt-3">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Preference;
