import React from 'react'

import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
    return (
        <div className="four-hundred text-center text-light">
            <Container>
                <h2>Sorry</h2>
                <p>You are not authorized to access this page</p>
                <Link to="/">Back to the homepage....</Link>
            </Container>
        </div>
    )
}
