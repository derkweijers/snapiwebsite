import React, {useState, useEffect} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {NewsCard, Loading, CustomPaginate, FeaturedNews} from "../components";
import {ColStyle} from "../styles";

function LatestNews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getData = async () => {
    try {
      const results = await axios.get(
        `https://spaceflightnewsapi.net/api/v1/articles?limit=6&page=${page}`
      );
      setData(results.data);
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  };

  if (loading) {
    return (
      <>
        <Row>
          <Loading/>
        </Row>
      </>
    )
  } else {
    return (
      <Row className="justify-content-center">
        <h1 className="font-weight-bold">Latest News</h1>
        <Row>
          {data.docs.map(article => {
            return (
              <Col style={ColStyle} xl={4} lg={4} sm={6} key={article._id} >
                <NewsCard
                  title={article.title}
                  site={article.news_site_long}
                  url={article.url}
                  date={article.published_date}
                  image={article.featured_image}
                />
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col>
            <CustomPaginate
              totalPages={data.totalPages}
              setPage={setPage}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

export default LatestNews;
