import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        this.setState({
          books: res.data,
        });
      })
      .catch((err) => {
        console.log("Error in BookList!");
      });
  }

  render() {
    const books = this.state.books;
    let bookList;

    if (!books) {
      bookList = "No book record!";
    } else {
      bookList = books.map((book, k) => <BookCard book={book} key={k} />);
    }

    return (
      <div className="BookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">List of Books</h2>
            </div>

            <div className="col-md-11">
              <Link
                to="/create-book"
                className="btn btn-outline-warning float-right"
              >
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>

          <div className="list">{bookList}</div>
        </div>
      </div>
    );
  }
}

export default BookList;
