import React from "react";
import { useNavigate } from "react-router-dom";

function ProtectedPages(props) {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      navigate("/login");
    }
  }, []);

  // komponen yang dimasukkan kedalam properti Cmp
  let Cmp = props.Cmp;

  // Cmp adalah halaman yang kita lindungi menggunakan ProtectedPages
  return (
    <div>
      <Cmp />
    </div>
  );
}

export default ProtectedPages;
