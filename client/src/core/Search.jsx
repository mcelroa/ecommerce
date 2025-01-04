import React, { useEffect, useState } from "react";
import { getCategories, list } from "./requests";
import Card from "./Card";
const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setData({ ...data, categories: res });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setData({ ...data, results: res, searched: true });
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchForm = () => {
    return (
      <form onSubmit={handleSubmit} className="d-flex align-items-center">
        <div className="input-group">
          <select
            className="form-select me-2"
            onChange={handleChange("category")}
            style={{ maxWidth: "200px" }}
          >
            <option value="All">-- All Categories --</option>
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            className="form-control"
            placeholder="Search..."
            type="search"
            onChange={handleChange("search")}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    );
  };

  const searchMessage = (searched, results) => {
    console.log(searched, results);
    if (searched && results.length > 0) {
      return `Found ${results.length} books`;
    }
    if (searched && results.length < 1) {
      return `No books match your search`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2>{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((p, i) => {
            return <Card key={i} product={p} />;
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="row">
        <div className="container mb-3">{searchForm()}</div>
      </div>
      <div className="row">
        <div className="container mb-3">{searchedProducts(results)}</div>
      </div>
    </>
  );
};

export default Search;
