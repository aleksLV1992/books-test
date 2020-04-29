"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthorWidget = function (_React$Component) {
    _inherits(AuthorWidget, _React$Component);

    function AuthorWidget(props) {
        _classCallCheck(this, AuthorWidget);

        var _this = _possibleConstructorReturn(this, (AuthorWidget.__proto__ || Object.getPrototypeOf(AuthorWidget)).call(this, props));

        _this.state = {
            error: null,
            isLoaded: false,
            items: [],
            booksItem: [],
            isBooksLoaded: false,
            author: null
        };
        _this.loadedBooks = _this.loadedBooks.bind(_this);
        _this.removeBook = _this.removeBook.bind(_this);
        return _this;
    }

    _createClass(AuthorWidget, [{
        key: "removeBook",
        value: function removeBook() {
            this.setState({
                booksItem: [],
                author: null,
                isBooksLoaded: false
            });
        }
    }, {
        key: "loadedBooks",
        value: function loadedBooks(item) {
            var _this2 = this;

            this.setState({
                isLoaded: false,
                booksItem: [],
                author: item.name,
                isBooksLoaded: false
            });

            fetch("/web/api/books-list?id=" + encodeURIComponent(item.id)).then(function (res) {
                return res.json();
            }).then(function (result) {
                //Сортировка Авторов
                result = result.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                });

                _this2.setState({
                    isLoaded: true,
                    booksItem: result,
                    isBooksLoaded: true
                });
            }, function (error) {
                _this2.setState({
                    isLoaded: true,
                    error: error
                });
            });
        }
    }, {
        key: "loadedAuthor",
        value: function loadedAuthor() {
            var _this3 = this;

            this.setState({
                isLoaded: false,
                items: []
            });
            fetch("/web/api/authors-list").then(function (res) {
                return res.json();
            }).then(function (result) {
                //Сортировка Авторов по Имени
                result = result.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                _this3.setState({
                    isLoaded: true,
                    items: result
                });
            }, function (error) {
                _this3.setState({
                    isLoaded: true,
                    error: error
                });
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadedAuthor();
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var _state = this.state,
                error = _state.error,
                isLoaded = _state.isLoaded,
                items = _state.items,
                booksItem = _state.booksItem,
                isBooksLoaded = _state.isBooksLoaded,
                author = _state.author;

            if (error) {
                return React.createElement(
                    "div",
                    { className: "widget-author" },
                    "\u041E\u0448\u0438\u0431\u043A\u0430: ",
                    error.message
                );
            } else if (!isLoaded) {
                return React.createElement(
                    "div",
                    { className: "widget-author" },
                    "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."
                );
            } else if (!isBooksLoaded && isLoaded) {
                return React.createElement(
                    "div",
                    { className: "widget-author" },
                    React.createElement(
                        "h4",
                        null,
                        "\u0421\u043F\u0438\u0441\u043E\u043A \u0410\u0432\u0442\u043E\u0440\u043E\u0432"
                    ),
                    React.createElement(
                        "ul",
                        null,
                        items.map(function (item) {
                            return React.createElement(
                                "li",
                                { key: item.id },
                                React.createElement(
                                    "a",
                                    { onClick: function onClick() {
                                            return _this4.loadedBooks(item);
                                        },
                                        className: "btn btn-link" },
                                    item.name,
                                    " (",
                                    item.count_books,
                                    ")"
                                )
                            );
                        })
                    )
                );
            } else if (isBooksLoaded && booksItem.length > 0 && isLoaded) {
                return React.createElement(
                    "div",
                    { className: "widget-author" },
                    React.createElement(
                        "a",
                        { className: "btn btn-link", onClick: function onClick() {
                                return _this4.removeBook();
                            } },
                        "\u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0438\u0441\u043A\u0443 \u0430\u0432\u0442\u043E\u0440\u043E\u0432"
                    ),
                    React.createElement(
                        "h4",
                        null,
                        "\u0421\u043F\u0438\u0441\u043E\u043A \u043A\u043D\u0438\u0433 ",
                        author
                    ),
                    React.createElement(
                        "ul",
                        null,
                        booksItem.map(function (item) {
                            return React.createElement(
                                "li",
                                { key: item.name },
                                item.name
                            );
                        })
                    )
                );
            } else if (isBooksLoaded && booksItem.length === 0 && isLoaded) {
                return React.createElement(
                    "div",
                    { className: "widget-author" },
                    React.createElement(
                        "a",
                        { className: "btn btn-link", onClick: function onClick() {
                                return _this4.removeBook();
                            } },
                        "\u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0438\u0441\u043A\u0443 \u0430\u0432\u0442\u043E\u0440\u043E\u0432"
                    ),
                    React.createElement(
                        "h3",
                        null,
                        "\u0421\u043F\u0438\u0441\u043E\u043A \u043A\u043D\u0438\u0433 \u0410\u0432\u0442\u043E\u0440\u0430 ",
                        author
                    ),
                    React.createElement(
                        "div",
                        { className: "alert alert-danger" },
                        "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"
                    )
                );
            }
        }
    }]);

    return AuthorWidget;
}(React.Component);

ReactDOM.render(React.createElement(AuthorWidget, null), document.getElementById("author-widget"));
