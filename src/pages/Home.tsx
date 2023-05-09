/** @format */
import React, { useState, useEffect, useMemo } from "react";

import Select, { OnChangeValue } from "react-select";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { useArticleGet } from "../api";
import { PostCard } from "../components";
import { sourcesData, Option } from "../constants";

const Home = () => {
  const { data: articleData, isFetching } = useArticleGet();

  const originalArticlesData = useMemo(() => {
    return articleData;
  }, [articleData]);

  useEffect(() => {
    if (articleData) {
      setArticles(originalArticlesData);
    }
  }, [articleData, originalArticlesData]);

  const [articles, setArticles] = useState(originalArticlesData || []);

  const uniqueCategories = new Set<string>();
  originalArticlesData?.forEach((row: any) => {
    uniqueCategories.add(row.category === "" ? "None" : row.category);
  });

  const categoryData: Option[] = Array.from(uniqueCategories).map(
    (category) => {
      return { value: category, label: category };
    }
  );

  const [searched, setSearched] = useState<string>("");
  const [filterDate, setFilterDate] = useState("");

  const [sources, setSources] = useState<readonly Option[]>([]);
  const [category, setCategory] = useState<readonly Option[]>([]);

  const filterArticles = (
    searchKeyword: string,
    filterDate: string,
    sources: readonly Option[],
    category: readonly Option[]
  ) => {
    let filteredData = originalArticlesData.filter(
      (row: {
        title: string;
        date: string | number | Date;
        source: string;
        category: string;
      }) => {
        const matchSearchKeyword = row.title
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
        const matchFilterDate =
          !filterDate ||
          new Date(row.date).toDateString() ===
            new Date(filterDate).toDateString();
        const matchSources =
          sources.length === 0 || sources.some((s) => s.value === row.source);
        const matchCategory =
          category.length === 0 ||
          category.some((c) => c.value === row.category);
        return (
          matchSearchKeyword && matchFilterDate && matchSources && matchCategory
        );
      }
    );
    setArticles(filteredData);
  };

  const onSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearched(event.target.value as string);
    filterArticles(event.target.value as string, filterDate, sources, category);
  };

  const onDate = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterDate(event.target.value as string);
    filterArticles(searched, event.target.value as string, sources, category);
  };

  const onSource = (newValue: OnChangeValue<Option, true>) => {
    setSources(newValue);
    filterArticles(searched, filterDate, newValue, category);
  };

  const onCategory = (newValue: OnChangeValue<Option, true>) => {
    setCategory(newValue);
    filterArticles(searched, filterDate, sources, newValue);
  };

  const resetFilters = () => {
    setArticles(originalArticlesData);
    setSearched("");
    setFilterDate("");
    setSources([]);
    setCategory([]);
  };



  return (
    <Container>
      <Row className="py-5">
        <Col>
          <h1 className="text-center">News</h1>
          <h6 className="text-center">Read the news online</h6> 
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md="3">
          <Form.Group className="mb-3">
            <Form.Label>Search news</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searched}
              onChange={onSearch}
            />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group className="mb-3">
            <Form.Label>Filter By Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date"
              value={filterDate}
              onChange={onDate}
            />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group className="mb-3">
            <Form.Label>Filter By Source</Form.Label>
            <Select
              value={sources}
              isMulti
              name="sources"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={onSource}
              options={sourcesData}
            />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group className="mb-3">
            <Form.Label>Filter By Category</Form.Label>
            <Select
              value={category}
              isMulti
              name="category"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={onCategory}
              options={categoryData}
            />
          </Form.Group>
        </Col>

        <Col className="text-end">
          <Button onClick={resetFilters}>Reset Filters</Button>
        </Col>
      </Row>

      {
        isFetching ? <h4>Loading....</h4> : 
        <Row>
          {
          articles && articles.length > 0 ? (
            articles.map((post: any) => (
            <Col md={4} key={post.id} className="p-3">
              <PostCard post={post} />
            </Col>
          ))) : <h2 className="text-center">No articles found.</h2>
        
        }
        </Row>
      }
    </Container>
  );
};

export default Home;
