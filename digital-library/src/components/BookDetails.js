import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/books" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          book: res.data,
        });
      })
      .catch((err) => {
        console.log("Error in BookDetails!");
      });
  }

  onDeleteClick(id) {
    axios
      .delete("http://localhost:5000/api/books" + id)
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("Error in delete log from BookDetails!");
      });
  }

  render() {
    const book = this.state.book;
    let BookItem = (
      <div>
        <table className="table table-hover table-dark">
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Title</td>
              <td>{book.title}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Author</td>
              <td>{book.author}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>ISBN</td>
              <td>{book.isbn}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Publisher</td>
              <td>{book.publisher}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Published Date</td>
              <td>{book.published_date}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Description</td>
              <td>{book.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="BookDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Book List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Book Records</h1>
              <p className="lead text-center">View Book Details</p>
              <hr /> <br />
            </div>
          </div>
          <div>{BookItem}</div>

          <div className="row">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-outline-danger btn-lg btn-block"
                onClick={this.onDeleteClick.bind(this, book._id)}
              >
                Delete Book
              </button>
              <br />
            </div>

            <div className="col-md-6">
              <Link
                to={`/book-edit/${book._id}`}
                className="btn btn-outline-info btn-lg btn-block"
              >
                Edit Book
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookDetails;
