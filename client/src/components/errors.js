import {MDBAlert, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography} from "mdbreact";
import React from "react";

const ErrorMessage = (props) => {
    const errors = props.errors;
    return (
        <div>
            {errors.length > 0 &&
            <MDBContainer className="mt-4">
                <MDBAlert color="danger">
                    <MDBTypography tag='h6' variant="h6">Submitting failed - {errors.length} field(s) must be corrected</MDBTypography>
                    {
                        errors.map((field) =>
                            <MDBRow>
                                <MDBCol size="1" className="ml-3">
                                    <MDBIcon icon="exclamation-triangle" className="red-text"/>
                                </MDBCol>
                                <MDBCol xl="10" size="11">
                                    <p className="red-text">{field}. Please complete this field</p>
                                </MDBCol>
                            </MDBRow>
                        )
                    }
                </MDBAlert>
            </MDBContainer>
            }
        </div>
    );
}


export default ErrorMessage;