import React from "react";
import { Form, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProducts() {
  const [data, setData] = React.useState([]);
  const [product_name, setProduct_name] = React.useState("");
  const [product_price, setProduct_price] = React.useState("");
  const [product_description, setProduct_description] = React.useState("");
  const [product_file, setProduct_file] = React.useState("");

  let params = useParams();
  let navigate = useNavigate();

  let productId = params.id;

  async function getDetails() {
    await fetch("http://ecom-backend.me/api/product/" + productId)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setData(result);
        setProduct_name(result.NAME);
        setProduct_price(result.PRICE);
        setProduct_description(result.DESCRIPTION);
        setProduct_file(result.FILE_PATH);
      });
  }

  async function update(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", product_name);
    formData.append("description", product_description);
    formData.append("price", product_price);
    formData.append("image", product_file);

    await fetch(`http://ecom-backend.me/api/product/update/${productId}?_method=PUT`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if(result.status) {
          navigate("/");
        }
        else {
          alert(result.message);
        }
      });
  }

  React.useEffect(() => getDetails(), []);

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h1>Update Product</h1>
        <Form onSubmit={update}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              type="text"
              value={product_name}
              onChange={(e) => setProduct_name(e.target.value)}
              defaultValue={data.NAME}
              placeholder="Nama Produk"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Harga Produk</Form.Label>
            <Form.Control
              type="number"
              value={product_price}
              onChange={(e) => setProduct_price(e.target.value)}
              defaultValue={data.PRICE}
              placeholder="Harga Produk"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi Produk</Form.Label>
            <Form.Control
              type="text"
              value={product_description}
              onChange={(e) => setProduct_description(e.target.value)}
              defaultValue={data.DESCRIPTION}
              placeholder="Deskripsi Produk"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gambar Produk</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setProduct_file(e.target.files[0])}
            />
            <Image
              src={`http://ecom-backend.me/${data.FILE_PATH}`}
              key={`http://ecom-backend.me/${data.FILE_PATH}`}
              rounded
              width={400}
              className="mt-3"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProducts;
