import React, { Component } from 'react';

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

import { getPosts } from '../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authorize } from 'passport';

class Play extends Component {

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
                        const { author, id, img, selftext, subreddit, title } = post;
                        console.log(img);
                        return (
                            <Card key={id} className="m-4">
                                <CardBody>
                                    <CardTitle tag="h5">{title}</CardTitle>
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

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Play);