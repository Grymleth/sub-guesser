import React, { Component, Fragment } from 'react';

import {
    Container,
    Row,
    Col,
    Card, 
    CardText, 
    CardBody, 
    CardTitle, 
    Button
} from 'reactstrap';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        const playCard = (
            <Fragment>
                <Row>
                    <Col sm={{size: 4, offset: 4}}>
                        <Card>
                            <CardBody className="text-center">
                                <CardTitle tag="h5">Sub Guesser</CardTitle>
                                <CardText>Click to get started!</CardText>
                                <Button href="/play">Play</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );

        const loginCard = (
            <Fragment>
                <Row>
                    <Col sm={{size: 4, offset: 4}}>
                        <Card>
                            <CardBody className="text-center">
                                <CardTitle tag="h5">Sub Guesser</CardTitle>
                                <CardText>Click to Sign In!</CardText>
                                <Button href="http://localhost:5000/auth/reddit">Sign In</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )

        return (
            <div>
                <Container>
                    { isAuthenticated ? playCard : loginCard }
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Home);