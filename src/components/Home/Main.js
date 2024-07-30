import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaHome, FaShoppingCart, FaUser, FaPhone, FaLock} from 'react-icons/fa';

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
    fetch('http://localhost:5000/users')
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
      'Action Figures',
      'Building Toys',
      'Educational Toys',
      'Dolls and Stuffed Animals',
      'Games and Puzzles',
      'Outdoor Toys',
      'Pretend Play Toys',
      'Creative and Art Toys',
      'Electronic Toys'
    ];

    Promise.all(endpoints.map(endpoint =>
      fetch(`http://localhost:5000/${encodeURIComponent(endpoint)}`)
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

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.7vu6f42qujEd7Z35BHR_0wHaHa&pid=Api&P=0&h=180"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />{' '}
          Your Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home"><FaHome /> Home</Nav.Link>
            <Nav.Link href="#order">Order</Nav.Link>
            <Nav.Link href="#account"><FaUser /> Account</Nav.Link>
            <Nav.Link href="#contact"><FaPhone /> Contact Us</Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link href="#cart"><FaShoppingCart /> Cart</Nav.Link>
            <Nav.Link href="/"><FaLock /> Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-3">
        <Row>
          <Col md={12} className="d-flex justify-content-between">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
            <Form inline>
              <FormControl
                as="select"
                className="mr-sm-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Action Figures">Action Figures</option>
                <option value="Building Toys">Building Toys</option>
                <option value="Educational Toys">Educational Toys</option>
                <option value="Dolls and Stuffed Animals">Dolls and Stuffed Animals</option>
                <option value="Games and Puzzles">Games and Puzzles</option>
                <option value="Outdoor Toys">Outdoor Toys</option>
                <option value="Pretend Play Toys">Pretend Play Toys</option>
                <option value="Creative and Art Toys">Creative and Art Toys</option>
                <option value="Electronic Toys">Electronic Toys</option>
              </FormControl>
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
                              <Button variant="primary" style={{ marginRight: '10px' }}>Add to Cart</Button>
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
    </div>
  );
}

export default HomePage;
