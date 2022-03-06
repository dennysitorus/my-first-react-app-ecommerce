import React from "react";
import {
  InputGroup,
  FormControl,
  Table,
  Image,
  Button,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function ListProduct() {
  const [data, setData] = React.useState([]);
  const [key, setKey] = React.useState("");

  async function getData() {
    await fetch("http://ecom-backend.me/api/product")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }

  async function deleteData(name, id) {
    if (window.confirm("Are you sure you want to delete " + name + "?")) {
      await fetch("http://ecom-backend.me/api/product/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          alert(data.message);
          getData();
        });
    }
  }

  async function searchData() {
    if (key !== "") {
      await fetch(`http://ecom-backend.me/api/product/search/${key}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data);
        });
    }
    else {
      alert('Please fill the search key before searching!');
    }
  }

  React.useEffect(() => getData(), []);

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h1>List Product</h1>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Products to search"
            aria-label="Products to search"
            aria-describedby="basic-addon2"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required={true}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={searchData}
          >
            Search
          </Button>
          <Button
            variant="outline-info"
            id="button-addon3"
            onClick={getData}
          >
            View All
          </Button>
        </InputGroup>

        <Table responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Deskripsi Produk</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.NAME}</td>
                <td>{item.PRICE}</td>
                <td className="text-start">{item.DESCRIPTION}</td>
                <td>
                  <Image
                    src={`http://ecom-backend.me/${item.FILE_PATH}`}
                    key={`http://ecom-backend.me/${item.FILE_PATH}`}
                    rounded
                    width={300}
                  />
                </td>
                <td>
                  <Stack direction="horizontal" gap={2}>
                    <Link
                      to={`/updateproducts/${item.ID}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <div className="vr" />
                    <Button
                      variant="danger"
                      onClick={(e) => deleteData(item.NAME, item.ID)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ListProduct;
