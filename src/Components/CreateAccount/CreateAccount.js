import React from 'react';

const CreateAccount = ({ handleBlur, handleCreate, setHasAccount }) => {
    
    const handleClick = () => {
        setHasAccount(true);
    };

    return (
        <div className="">
            <form onSubmit={handleCreate}>
                 <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onBlur={handleBlur}/>
                </div>
                 <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" onBlur={handleBlur}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onBlur={ handleBlur}/>
                </div>
                <div className="mb-3">
                    <p>Already have an account <span className="text-info" onClick={handleClick}>SignIn</span></p>
                </div>
                <input type="submit" className="btn btn-primary" value="Create"/>
            </form>
        </div>
    );
};

export default CreateAccount;