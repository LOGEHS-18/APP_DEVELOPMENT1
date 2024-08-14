import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormControl, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';

import HNavbar from './HomeNav';
const HomePage = () => {
  const [user, setUser] = useState('user');
  const [productsByCategory, setProductsByCategory] = useState({});
  const [filteredProducts, setFilteredProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/Action-Figures/')
      .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
      .then(data => setUser(data.name))
      .catch(error => {
        console.error(error);
        setError(`Failed to fetch user data: ${error}`);
      });
  }, []);

  // Fetch products data from all endpoints
  useEffect(() => {
    const endpoints = [
      'Action-Figures',
      'Building-Toys',
      'Educational-Toys',
      'Dolls-and-Stuffed-Animals',
      'Games-and-Puzzles',
      'Outdoor-Toys',
      'Pretend-Play-Toys',
      'Creative-and-Art-Toys',
      'Electronic-Toys'
    ];

    Promise.all(endpoints.map(endpoint =>
      fetch(`http://127.0.0.1:8000/api/${(endpoint)}/`)
        .then(response => response.ok ? response.json() : Promise.reject(`Failed to fetch ${endpoint}`))
        .then(data => ({ category: endpoint, products: data }))
    ))
      .then(results => {
        const products = results.reduce((acc, { category, products }) => {
          acc[category] = products;
          return acc;
        }, {});

        setProductsByCategory(products);
        setFilteredProducts(products);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(`Failed to fetch products data: ${error}`);
        setLoading(false);
      });
  }, []);

  // Apply filters and search
  useEffect(() => {
    const filtered = Object.keys(productsByCategory).reduce((acc, category) => {
      const products = productsByCategory[category].filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || category === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      if (products.length > 0) {
        acc[category] = products;
      }
      return acc;
    }, {});

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, productsByCategory]);

  const addToCart = (product) => {
    const newUuid = uuidv4();
    fetch('http://127.0.0.1:8000/api/cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newUuid,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image // Add the image property here
      }),
    })
      .then(response => response.ok ? response.json() : Promise.reject('Failed to add to cart'))
      .then(data => {
        console.log('Product added to cart:', data);
        toast.success('Product added to cart successfully!');
      })
      .catch(error => {
        console.error(error);
        setError(`Failed to add product to cart: ${error}`);
        toast.error('Failed to add product to cart.');
      });
  };

  return (
    <div>
      <HNavbar />

      <Container className="mt-3">
        <Row>
          <Col md={12} className="d-flex justify-content-center">
            <Form inline className="position-relative">
              <FormControl
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '500px', // Adjust as needed
                  paddingRight: '40px', // Space for the icon
                }}
              />
              <FaSearch
                style={{
                  position: 'absolute',
                  right: '10px', // Adjust as needed
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none', // Makes sure the icon doesn't interfere with input focus
                }}
              />
            </Form>
          </Col>
        </Row>

        <Row className="mt-3">
          {loading ? (
            <Col md={12} className="text-center">
              <Spinner animation="border" />
            </Col>
          ) : (
            <>
              {error && <Col md={12}><div className="alert alert-danger">{error}</div></Col>}
              {!error && Object.keys(filteredProducts).map(category => (
                <Col md={12} key={category} className="mb-3">
                  <h4>{category}</h4>
                  <Row>
                    {filteredProducts[category].map((product, index) => (
                      <Col md={3} key={index} className="mb-3">
                        <Card style={{ width: '100%' }}>
                          <Card.Img
                            variant="top"
                            src={product.image}
                            style={{ height: '300px', objectFit: 'fill' }}
                            alt={product.name}
                          />
                          <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                              {product.company} <br />
                              ₹{product.price}
                            </Card.Text>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => addToCart(product)}>Add to Cart</Button>
                              <Button variant="success">Buy</Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>

      <ToastContainer />
    </div>
  );
}

export default HomePage;