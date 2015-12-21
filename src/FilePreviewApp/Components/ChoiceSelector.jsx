
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-material-design/dist/css/material.min.css";
import "bootstrap-material-design/dist/css/ripples.min.css";
import "bootstrap-material-design/dist/css/roboto.min.css";
import "bootstrap-material-design/dist/js/material.min.js";
import "bootstrap-material-design/dist/js/ripples.min.js"

import React from "react";

let $ = require('jquery');

export default class ChoiceSelector extends React.Component {
    static defaultProps = {choices: [], controls: {}}

    constructor(props) {
        super(props)
    }

    static propTypes = {
        choices: React.PropTypes.array,
        updateParentState: React.PropTypes.func,
        stateToUpdate: React.PropTypes.string
    }
    handleChoiceSelection = (event) => {
        if (this.props.updateParentState && this.props.stateToUpdate) {
            if (this.props.dataChoiceMapping) {
                this.props.updateParentState({[this.props.stateToUpdate]: this.props.dataChoiceMapping[event.target.dataset.index]});
            }
            else
                this.props.updateParentState({[this.props.stateToUpdate]: event.target.dataset.choice});
        }
    }

    render() {
        let choices = this.props.choices.map((choice, index)=> {
            return <li
                key={ Math.random(1).toFixed(5)+choice}
                title={choice}
                className="pf-choice-option">
                <a href="javascript:void(0)"
                   data-index={index}
                   data-choice={choice}
                   onClick={this.handleChoiceSelection}>{choice}</a>
            </li>
        });
        let prefixLabel = this.props.choicePrefix &&
            (<label
                className="btn btn-default control-label">
                {this.props.choicePrefix +":"}
            </label>);
        return (
        <div className="pf-choice-select">
                <div className="btn-group">
                    {prefixLabel}
                    <button
                        data-target="#"
                        className="btn btn-raised btn-default dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="false">
                        {(this.props.currentValue || this.props.choices[0])}
                        <span className="caret"></span>
                        <div className="ripple-container"></div>
                    </button>
                    <ul className="dropdown-menu pf-choices-list" role="menu">
                        {choices}
                    </ul>
                </div>
            </div>
        );
    }
}
