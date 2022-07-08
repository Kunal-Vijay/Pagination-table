import axios from "axios";
import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      originalTableData: [],
      perPage: 10,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData() {
    const data = this.state.originalTableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios.post(`https://cashluck.xyz/api/v1/tasksfetch`).then((res) => {
      const data = Object.values(res.data.data);
      console.log(data);
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        originalTableData: data,
        tableData: slice,
      });
    });
  }
  render() {
    return (
      <div className="my-5 mx-3">
        <h1 className="text-center">Cashluck Table</h1>
        <table className="table table-hover">
          <thead className="thead-light bg-info">
            <tr>
              <th style={{ fontSize: "12px" }} scope="col">
                APP ID
              </th>
              <th style={{ fontSize: "12px" }} scope="col">
                IMAGE
              </th>
              <th style={{ fontSize: "12px" }} scope="col">
                TASK NAME
              </th>
              <th style={{ fontSize: "12px" }} scope="col">
                REWARD AMOUNT
              </th>
              <th style={{ fontSize: "12px" }} scope="col">
                PAYOUT
              </th>
              <th style={{ fontSize: "12px" }} scope="col">
                REVENUE
              </th>
              <th style={{ fontSize: "12px" }} scope="col">
                TOTAL CAPS
              </th>
              <th style={{ fontSize: "12px" }} scope="col">
                COMPLETE CAPS
              </th>
              <th style={{ fontSize: "12px" }} scope="col">
                DELETE
              </th>
              <th style={{ fontSize: "12px" }} scope="col">
                EDIT
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((item, i) => {
              console.log(item.appName);
              return (
                <tr key={item.appId}>
                  <th scope="row">{item.appId}</th>
                  <td>
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={item.appImageUrl}
                      alt=""
                    />
                  </td>
                  <td>{item.appName}</td>
                  <td>{item.appRewardAmount}</td>
                  <td>₹ {item.payout}</td>
                  <td>₹ {item.revenue}</td>
                  <td>{item.totalcap}</td>
                  <td>{item.totalevents}</td>
                  <td>
                    <DeleteIcon />
                  </td>
                  <td>
                    <EditIcon />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div class="d-flex flex-row-reverse">
          <ReactPaginate
            previousLabel={"<< prev"}
            nextLabel={"next >>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}
