import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const profileCard = props => {
    const pathUsername = props.match.params.username;
    const loggedInUsername = props.username;
    let message = 'We Cannot Edit';
    if (pathUsername === loggedInUsername) {
        message = 'We can edit';
    }
    return <div>{message}</div>
}

const mapStateToProps = store => {
    return {
        username: store.username
    };
};

export default connect(mapStateToProps)(withRouter(profileCard));