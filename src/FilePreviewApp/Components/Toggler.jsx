/**
 * Created by guillaumelebedel on 23/12/15.
 */
import React from 'react'

export default class Toggler extends React.Component {
    static defaultProps = {names:["my toggler"], actions:[], start:0, styleClasses:["btn"]}
    constructor(props) {
        super(props);
        this.state = {
            toggleState:this.props.start
        }
    }
    handleToggling = ()=>{
        this.props.actions[this.state.toggleState]();
        if (this.state.toggleState == this.props.names.length - 1)
            this.setState({toggleState:0});
        else
            this.setState({toggleState: this.state.toggleState + 1});
    }
    render(){
        return(
            <div className="toggler">
                <div
                    className={this.props.styleClasses[this.state.toggleState]}
                    onClick={this.handleToggling}
                    >
                    {this.props.names[this.state.toggleState]}
                </div>
            </div>);
    }
}

export class TogglerButton extends Toggler{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="toggler-label">
                <button
                    className={"btn " + this.props.styleClasses[this.state.toggleState]}
                    onClick={this.handleToggling}
                    >
                    {this.props.names[this.state.toggleState]}
                </button>
            </div>);
    }
}
export class TogglerLabel extends Toggler{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="toggler-button">
                <label
                    className={"label " + this.props.styleClasses[this.state.toggleState]}
                    onClick={this.handleToggling}
                    >
                    {this.props.names[this.state.toggleState]}
                </label>
            </div>);
    }
}