import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const navigate = useNavigate();

  const [product_name, setProduct_name] = React.useState("");
  const [product_price, setProduct_price] = React.useState("");
  const [product_description, setProduct_description] = React.useState("");
  const [product_file, setProduct_file] = React.useState("");

  async function add(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", product_name);
    formData.append("description", product_description);
    formData.append("price", product_price);
    formData.append("image", product_file);

    await fetch("http://ecom-backend.me/api/product", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        navigate('/');
      });
  }

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h1>Add Product</h1>
        <Form onSubmit={add}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              type="text"
              value={product_name}
              onChange={(e) => setProduct_name(e.target.value)}
              placeholder="Nama Produk"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Harga Produk</Form.Label>
            <Form.Control
              type="number"
              value={product_price}
              onChange={(e) => setProduct_price(e.target.value)}
              placeholder="Harga Produk"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi Produk</Form.Label>
            <Form.Control
              type="text"
              value={product_description}
              onChange={(e) => setProduct_description(e.target.value)}
              placeholder="Deskripsi Produk"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gambar Produk</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setProduct_file(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Tambah
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddProducts;
