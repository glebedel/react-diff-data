
import '../styles/FilePreview.css';

var hljs = require('highlight.js');
var _ = require("lodash")

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-material-design/dist/css/material.min.css";
import "bootstrap-material-design/dist/css/ripples.min.css";
import "highlight.js/styles/default.css"
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-material-design/dist/js/material.min.js";
import "bootstrap-material-design/dist/js/ripples.min.js";

import React from 'react';

export default class FilePreview extends React.Component {
    static defaultProps = {content: {}, language: []}
    static propTypes = {
        content: React.PropTypes.shape({
            source: React.PropTypes.string,
            data: React.PropTypes.string
        }),
        language: React.PropTypes.arrayOf(React.PropTypes.string)
    }

    constructor(props) {
        super(props);
        this.state = {
            content: this.formatData(this.props.content.data)
        }
    }
    formatData(value) {
        return value && hljs.fixMarkup(value)
    }

    componentDidMount() {
        if (this.props.content.source && !this.props.content.data) {
            $.get(this.props.source, (result) => this.setState({content: this.formatData(result)}));
        }
        this.initializeThirdParty();
    }

    render() {
        var title = this.props.content.title && <h2 className="pf-title">{this.props.content.title}</h2>;
        return (

            <div className="jumbotron">
                <div className="modal-header">
                    <button type="button" className="close">×</button>
                    {title}
                </div>
                    <pre className="preview">
                        <code
                        className={this.props.language.join(" ")}
                        >{this.state.content}
                        </code>
                    </pre>
            </div>
        );
    }

    componentDidUpdate() {
        this.initializeThirdParty();
    }
    initializeThirdParty(){
        hljs.initHighlightingOnLoad();
        $.material.init()
    }
}