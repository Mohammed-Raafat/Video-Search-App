import React from 'react';

const ErrorMsg = ({error}) => {
    let errMessage = error.message;
    let solutionMessage = '';
    if(error.code === 403) {
        errMessage = 'you have exceeded your quota for today. [According to Youtube API]';
        solutionMessage = 'Please, Try again tomorrow.';
    }
    return ( 
        <div className="ui container" style={{paddingTop: '10px'}}>
            <div className="ui negative message">
                <div className="header">
                    We're SORRY :(
                </div>
                <p>
                    We can't apply that search because {errMessage} <br />
                    {solutionMessage}
                </p>
            </div>
        </div>
     );
}
 
export default ErrorMsg;