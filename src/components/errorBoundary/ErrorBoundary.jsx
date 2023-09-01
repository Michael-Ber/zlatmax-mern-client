import React from 'react';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

export class ErrorBoundary extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            isError: false
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState(state => state.isError = true);
        console.log(error, errorInfo);
    }

  render() {
    if(this.state.isError) return <ErrorMessage />
    return this.props.children
    
  }
}
