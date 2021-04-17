import React, { Component, Fragment } from 'react'

// bootstrap components
import {
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

// redux
import { connect } from 'react-redux';
import { getPosts } from '../actions/postActions';
import PropTypes from 'prop-types';

class Gameplay extends Component {

    static propTypes = {
        getPosts: PropTypes.func.isRequired,
        post: PropTypes.object.isRequired
    };

    componentDidMount(){
        this.props.getPosts();
    }

    render() {
        const { posts } = this.props.post;
        return (
            <div>
                <Container>
                    {posts.map((post) => {
                        const { author, id, selftext, subreddit, title } = post;
                        return (
                            <Card key={id} className="m-4">
                                <CardBody>
                                    <CardTitle tag="h5">{title}</CardTitle>
                                    {mediaToJSX(post)}
                                    <CardSubtitle tag="h6">by u/{author}</CardSubtitle>
                                    <CardText>{selftext}</CardText>
                                </CardBody>
                            </Card>
                        )
                    })}
                </Container>
            </div>
        )
    }
}

const mediaToJSX = ({type, media, url, id}) => {
    let jsx = null;

    switch(type){
        case "image":
            jsx = (<CardImg src={media} />);
            break;
        case "video":
            jsx = (
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe title={id} src={media} frameborder="0" className="embed-responsive-item"></iframe>
                </div>
            );
            break;
        case "external":
            jsx = (
                <a href={url} target="_blank" rel="noreferrer">{url}</a>
            );
            break;
        default:
            jsx = null;
            break;
    }

    return (
        <Fragment>
            <div className="mb-2">
                {jsx}
            </div>
        </Fragment>
    );
}


const mapStateToProps = state => ({
    post: state.post
});


export default connect(mapStateToProps, { getPosts })(Gameplay);