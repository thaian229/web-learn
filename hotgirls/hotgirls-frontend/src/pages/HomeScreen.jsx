import React from 'react';

class HomeScreen extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 5,
        data: [],
        total: 1,
    };

    componentDidMount() {
        // fetch posts
        fetch(`http://localhost:3001/posts?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // console.log(res);
                return res.json();
            })
            .then((data) => {
                // console.log(data);
                this.setState({
                    data: data.data,
                    total: data.total,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handlePaginationClick = (event) => {
        console.log(event.target.innerText);
        this.setState({
            pageNumber: Number(event.target.innerText),
        });

        fetch(`http://localhost:3001/posts?pageNumber=${event.target.innerText}&pageSize=${this.state.pageSize}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    data: data.data,
                    total: data.total,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const myArray = [];
        for (let i = 0; i < Math.ceil(this.state.total / this.state.pageSize); i++) {
            myArray.push(i);
        }
        return (
            <div>
                <div className="result">
                    {this.state.data.map((item) => {
                        return (
                            <div className="card mt-5" key={item._id}>
                                <div
                                    className="card"
                                    style={{
                                        backgroundImage: `url(${item.imageUrl})`,
                                        height: `500px`,
                                        backgroundRepeat: `no-repeate`,
                                        backgroundSize: `cover`,
                                        backgroundPosition: `center`
                                    }}
                                >
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{item.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <nav className="mt-4" aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>

                        {myArray.map((item) => {
                            return (
                                <li className={this.state.pageNumber === item + 1 ? "page-item active" : "page-item"} >
                                    <a className="page-link" 
                                        onClick={this.handlePaginationClick}
                                    >{item + 1}</a>
                                </li>
                            );
                        })}

                        <li className="page-item">
                            <a className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default HomeScreen;