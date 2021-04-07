import React from 'react';

const SignIn = ({ handleBlur, handleSignIn ,setHasAccount}) => {
    
    const handleClick = () => {
        setHasAccount(false);
    };
    
    return (
        <div className="">
            <form onSubmit={handleSignIn}>
                 <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" onBlur={handleBlur}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onBlur={ handleBlur}/>
                </div>
                <div className="mb-3">
                    <p>Don't have an account <span className="text-info" onClick={handleClick}>Create one</span></p>
                </div>
                <input type="submit" className="btn btn-primary" value="SignIn"/>
            </form>
        </div>
    );
};

export default SignIn;