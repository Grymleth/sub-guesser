import React from 'react';

import {
    Container,
    Row
} from 'reactstrap';

export default function AppFooter() {
    return (
        <div className="main-footer">
            <Container className="text-center">
                <p className="col-sm">&copy; {new Date().getFullYear()} Sub Guesser</p>
            </Container>
        </div>
    );
};
