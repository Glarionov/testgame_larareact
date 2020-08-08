import { connect } from 'react-redux'

import TestLanguage from "./TestLanguage";

const mapStateToProps = state => ({
    language: state.language_id
})

const mapDispatchToProps = dispatch => ({
    // toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestLanguage)
