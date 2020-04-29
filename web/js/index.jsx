class AuthorWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            booksItem: [],
            isBooksLoaded: false,
            author: null
        };
        this.loadedBooks = this.loadedBooks.bind(this);
        this.removeBook = this.removeBook.bind(this);
    }

    removeBook() {
        this.setState({
            booksItem: [],
            author: null,
            isBooksLoaded: false
        });
    }

    loadedBooks(item) {
        this.setState({
            isLoaded: false,
            booksItem: [],
            author: item.name,
            isBooksLoaded: false
        });

        fetch("/web/api/books-list?id=" + encodeURIComponent(item.id))
            .then(res => res.json())
            .then(
                (result) => {
                    //Сортировка Авторов
                    result = result.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (a.name < b.name) {
                            return 1;
                        }
                        return 0;
                    });

                    this.setState({
                        isLoaded: true,
                        booksItem: result,
                        isBooksLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    loadedAuthor() {
        this.setState({
            isLoaded: false,
            items: []
        });
        fetch("/web/api/authors-list")
            .then(res => res.json())
            .then(
                (result) => {
                    //Сортировка Авторов по Имени
                    result = result.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    });
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.loadedAuthor();
    }

    render() {
        const {error, isLoaded, items, booksItem, isBooksLoaded, author} = this.state;
        if (error) {
            return <div className="widget-author">Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="widget-author">Загрузка...</div>;
        } else if (!isBooksLoaded && isLoaded) {
            return (
                <div className="widget-author">
                    <h4>Список Авторов</h4>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                <a onClick={() => this.loadedBooks(item)}
                                   className="btn btn-link">{item.name} ({item.count_books})</a>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else if (isBooksLoaded && booksItem.length > 0 && isLoaded) {
            return (
                <div className="widget-author">
                    <a className="btn btn-link" onClick={() => this.removeBook()}>Назад к списку авторов</a>
                    <h4>Список книг {author}</h4>
                    <ul>
                        {booksItem.map(item => (
                            <li key={item.name}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else if (isBooksLoaded && booksItem.length === 0 && isLoaded) {
            return (
                <div className="widget-author">
                    <a className="btn btn-link" onClick={() => this.removeBook()}>Назад к списку авторов</a>
                    <h3>Список книг Автора {author}</h3>
                    <div className="alert alert-danger">
                        Нет данных для отображения
                    </div>
                </div>
            );
        }
    }
}

ReactDOM.render(
    <AuthorWidget/>,
    document.getElementById("author-widget")
)