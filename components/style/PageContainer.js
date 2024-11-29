import React from 'react';
import Container from "@mui/material/Container";

function PageContainer(props) {
    
    return (
        <Container>            
            {props.children}
        </Container>
    );
}

export default PageContainer;