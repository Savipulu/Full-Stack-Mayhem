import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Link,
  Route
} from "react-router-dom";
import {
  Container,
  Table,
  Grid,
  Image,
  Form,
  Button,
  Header,
  Icon
} from "semantic-ui-react";
import img from "./martin_fowler.png";

const Menu = ({ style, activeStyle }) => (
  <div style={style}>
    <NavLink exact to="/" activeStyle={activeStyle}>
      anecdotes
    </NavLink>&nbsp;
    <NavLink exact to="/create" activeStyle={activeStyle}>
      create new
    </NavLink>&nbsp;
    <NavLink exact to="/about" activeStyle={activeStyle}>
      about
    </NavLink>&nbsp;
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

const Notification = ({ style, message }) => {
  if (message) {
    return <div style={style}>{message}</div>;
  }
  return null;
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header as="h2">
      <Icon name="quote right" size="mini" />
      <Header.Content>Anecdotes</Header.Content>
    </Header>
    <Table>
      <Table.Body>
        {anecdotes.map(anecdote => (
          <Table.Row>
            <Table.Cell key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

const About = () => (
  <div>
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column width={10}>
          <Header as="h2">
            <Icon name="info" size="mini" />
            <Header.Content>About anecdote app</Header.Content>
          </Header>
          <p>According to Wikipedia:</p>

          <em>
            An anecdote is a brief, revealing account of an individual person or
            an incident. Occasionally humorous, anecdotes differ from jokes
            because their primary purpose is not simply to provoke laughter but
            to reveal a truth more general than the brief tale itself, such as
            to characterize a person by delineating a specific quirk or trait,
            to communicate an abstract idea about a person, place, or thing
            through the concrete details of a short narrative. An anecdote is "a
            story with a point."
          </em>

          <p>
            Software engineering is full of excellent anecdotes, at this app you
            can find the best and add more.
          </p>
        </Grid.Column>
        <Grid.Column width={6}>
          <Image src={img} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>. See{" "}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{" "}
    for the source code.
  </div>
);

class CreateNew extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      author: "",
      info: ""
    };
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <Form>
        <Header as="h2">
          <Icon name="write" size="mini" />
          <Header.Content>create a new anecdote</Header.Content>
        </Header>
        <form onSubmit={this.handleSubmit}>
          <Form.Field>
            content
            <input
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            author
            <input
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            url for more info
            <input
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button color="green">create</Button>
        </form>
      </Form>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: "If it hurts, do it more often",
          author: "Jez Humble",
          info:
            "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
          votes: 0,
          id: "1"
        },
        {
          content: "Premature optimization is the root of all evil",
          author: "Donald Knuth",
          info: "http://wiki.c2.com/?PrematureOptimization",
          votes: 0,
          id: "2"
        }
      ],
      notification: ""
    };
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote '${anecdote.content}' created!`
    });
    setTimeout(() => this.setState({ notification: "" }), 10000);
  };

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  render() {
    const notificationStyle = {
      padding: 20,
      margin: 5,
      borderLeft: "solid",
      color: "green"
    };
    const navBarStyle = {
      borderRadius: 5,
      padding: 10,
      margin: 10,
      background: "lightgrey"
    };
    const activeStyle = {
      borderRadius: 10,
      padding: 5,
      color: "red",
      background: "white"
    };
    const basicPadding = {
      padding: 15
    };
    return (
      <Container>
        <Router>
          <div style={basicPadding}>
            <Header as="h1" padding={20}>
              <Icon name="quote right" />
              <Header.Content>Software anecdotes</Header.Content>
            </Header>
            <Menu style={navBarStyle} activeStyle={activeStyle} />
            <Notification
              style={notificationStyle}
              message={this.state.notification}
            />

            <Route
              exact
              path="/"
              render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}
            />
            <Route
              path="/create"
              render={({ history }) => (
                <CreateNew history={history} addNew={this.addNew} />
              )}
            />
            <Route path="/about" render={() => <About />} />
            <Route
              path="/anecdotes/:id"
              render={({ match }) => (
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />
              )}
            />
            <Footer />
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
