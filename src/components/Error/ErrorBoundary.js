import React, { Component } from 'react'
import ErrorPage from './ErrorPage';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError : false
        }
    }

    static getDerivedStateFromError(error) {
        
        return { hasError: true };
      }

    componentDidCatch(error) {
        console.log(error.message)
    }

    render() {

        if(this.state.hasError) {
            return <ErrorPage /> ;
        }

        return this.props.children ;
    }
}
