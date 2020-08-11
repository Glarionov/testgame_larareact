import { connect } from 'react-redux'

import QuestionSetEditor from "./QuestionSetEditor";
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
    QuestionSetEditor
)
