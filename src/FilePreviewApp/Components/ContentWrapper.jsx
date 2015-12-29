import React from 'react';
let ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import ConfigManager from '../ConfigManager.js';

let hljs = require('highlight.js');
let $ = require('jquery');
let Spinner = require('react-spinkit');
var beautify = require('js-beautify').js_beautify;

import "highlight.js/styles/default.css"
import '../Styles/highlightjs.scss';
import '../Styles/FilePreview.scss';
import SimpleCache from '../Caching.js';

export default class ContentWrapper extends React.Component {
    static defaultProps = {
        currentFile: {},
        theme: "default",
        spinner: "circle"
    }
    fileStorage = SimpleCache.createStore('fileCache');

    constructor(props) {
        super(props)
        this.state = {}
    }

    fetchFile(currentFile) {
        if (currentFile.source && !currentFile.data) {
            if (this.fileStorage.has(currentFile.source)) {
                this.setState({data: this.fileStorage.get(currentFile.source)})
            }
            else {
                let fileAtRequest = currentFile;
 //               setTimeout(()=> {
                    $.ajax({method: "GET", url: currentFile.source, dataType: "text"}).done((result) => {
                        //checking that we didn't switch file during request
                        if (this.props.currentFile === fileAtRequest)
                            this.setState({data: result});
                        if (currentFile.cache && !this.fileStorage.has(currentFile))
                            this.fileStorage.set(currentFile.source, result);
                    }).error((xhr, status, error)=> {
                        //checking that we didn't switch file during request
                        if (this.props.currentFile === fileAtRequest)
                            this.setState({data: false});
                    });
//                }, 3000);
            }
        }
        else if (currentFile.data) {
            this.setState({data: currentFile.data});
        }
    }

    componentDidMount() {
        this.fetchFile(this.props.currentFile);
    }

    formatData(value) {
        return value && hljs.fixMarkup(value)
    }

    componentWillReceiveProps(nextProps) {
        //console.log("willReceiveProps", nextProps);
        if (nextProps.currentFile !== this.props.currentFile) {
            if (!nextProps.currentFile.data)
                this.setState({data: null});
            this.fetchFile(nextProps.currentFile);
        }
    }

    handleRefreshOnClick = () => {
        if (this.props.currentFile.source)
            this.setState({data: null});
        this.fetchFile(this.props.currentFile);
    }

    render() {
        let file = this.props.currentFile;
        console.warn("Render Content Wrapper!");
        //console.log("Rendered data:" + this.state.data);
        //ajax request failed
        let component;
        if (this.state.data === false) {
                return (<ReactCSSTransitionGroup
                        transitionName="pf-error"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={0}>
                    <div
                        key={file.source}
                         className="pf-error panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                Oops!..Something went wrong...&nbsp;
                            </h3>
                        </div>
                        <div className="panel-body">
                            <strong>
                                <a href={file.source} className="alert-link">
                                    {file.source}
                                </a>
                            </strong>
                            &nbsp;couldn't be retrieved.
                            <br/>
                            <a href="javascript:void(0)"
                               className="alert-link"
                               onClick={this.handleRefreshOnClick}
                                >
                                Click here
                            </a>
                            &nbsp;to try fetching it again.
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            );
        }
        //ajax request in progress
        else if (!this.state.data)
            return (<Spinner className="pf-spinner" spinnerName={this.props.spinner}/>);
        //ajax request success
        return (
            <ReactCSSTransitionGroup transitionName="pf-wrapper"
                                     transitionEnterTimeout={1500}
                                     transitionLeaveTimeout={550}>
                <div key={file.title} className={"pf-content-wrapper hljs-theme"}>
                    <pre
                        className={this.props.theme}>
                        <code
                            ref={"codeBlock"}
                            className={"hljs " + this.props.theme}
                            >{this.formatData(this.props.prettify ? beautify(this.state.data) : this.state.data)}
                        </code>
                    </pre>
                </div>
            </ReactCSSTransitionGroup>
        );
    }

    componentDidUpdate() {
        if (this.state.data)
            this.initializeThirdParty(this.refs.codeBlock)
    }

    initializeThirdParty(codeBlock) {
        if (this.state.data)
            codeBlock.className = Array.prototype.slice.apply(codeBlock.classList, [0,2]).join(" ");
        if (this.props.language && this.props.language != "auto")
            codeBlock.classList.add(this.props.language);
        else if (this.props.currentFile && this.props.currentFile.language)
            codeBlock.classList.add(this.props.currentFile.language);
        hljs.highlightBlock(codeBlock)
    }

}