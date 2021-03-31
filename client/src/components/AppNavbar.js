import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavbar extends Component{
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        return (
            <div>
                <Navbar color="light" light expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Guess the Sub</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://github.com/Grymleth">GitHub</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml" navbar>
                                <NavItem>
                                    <NavLink href="http://localhost:5000/auth/reddit">Login with Reddit</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AppNavbar;