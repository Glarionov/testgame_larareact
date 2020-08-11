import { connect } from 'react-redux'

import EditableText from "./EditableText";
const mapStateToProps = state => ({
    language_id: state.language_id,
    userData: state.auth.userData
})

const mapDispatchToProps = dispatch => ({
    // toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    EditableText
)
