import React from 'react';

const ButtonWithProgres = (props) => {

    const { onClick, pendingApiCall, disabled, text } = props;
    return (
        <button className="btn btn-primary" disabled={disabled} onClick={onClick}>
            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}{text}
        </button>
    );
};

export default ButtonWithProgres;