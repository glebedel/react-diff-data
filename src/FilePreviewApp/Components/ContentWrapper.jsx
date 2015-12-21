import React from 'react';
import ConfigManager from '../ConfigManager.js';

let hljs = require('highlight.js');
let $ = require('jquery');
let Spinner = require('react-spinkit');

import "highlight.js/styles/default.css"
import '../Styles/highlightjs.scss';
import '../Styles/FilePreview.scss';

import SimpleCache from '../Caching.js';

export default class ContentWrapper extends React.Component {
    static defaultProps = {currentFile: {}, theme: "default", config: {}}
    fileStorage = SimpleCache.createStore('fileCache');

    constructor(props) {
        super(props)
        this.state = {}
    }

    fetchFile(currentFile) {
        let self = this;
        if (currentFile.source && !currentFile.data) {
            if (this.fileStorage.has(currentFile.source)) {
                this.setState({data: this.fileStorage.get(currentFile.source)})
            }
            else
                $.ajax({method: "GET", url: currentFile.source, dataType: "text"}).done((result) => {
                    setTimeout(()=>this.setState({data: result}), 20000)
                    if (currentFile.cache && !this.fileStorage.has(currentFile))
                        this.fileStorage.set(currentFile.source, result);
                }).error((xhr, status, error)=> {
                    setTimeout(()=>this.setState({data: false}), 20000)
                });
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
        this.setState({data: null})
        if (nextProps.currentFile !== this.props.currentFile) {
            this.fetchFile(nextProps.currentFile);
        }
    }

    refreshHandler = () => {
        this.fetchFile(this.props.currentFile);
    }

    render() {
        console.log("RENDER");
        console.log(this.state.data);
        if (this.state.data === false) {
            return (
                <div className="pf-error panel panel-danger">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Oops!..Something went wrong...&nbsp;
                        </h3>
                    </div>
                    <div className="panel-body">
                        <strong>
                            <a href="javascript:void(0)" className="alert-link">
                                {this.props.currentFile.source}
                            </a>
                        </strong>
                        &nbsp;couldn't be retrieved.
                        <br/>
                        <a href="javascript:void(0)"
                           className="alert-link"
                           onClick={this.refreshHandler}
                            >
                            Click here
                        </a>
                        &nbsp;to try fetching it again.
                    </div>
                </div>
            );
        }
        else if (!this.state.data) {
            return (
                <div className="pf-spinner">
                    <Spinner spinnerName='cube-grid'/>
                </div>);
        }
        return (
            <div className={"pf-content-wrapper hljs-theme"}>
                    <pre
                        className={this.props.theme}>
                        <code
                            ref={"codeBlock"}
                            className={"hljs " + this.props.theme + " " + this.props.currentFile.language}
                            >{this.formatData(this.state.data)}
                        </code>
                    </pre>
            </div>);
    }

    componentDidUpdate() {
        if (this.state.data !== false)
            this.initializeThirdParty(this.refs.codeBlock)
    }

    initializeThirdParty(codeBlock) {
        if (!this.props.currentFile.language && this.state.data)
            codeBlock.classList.remove(codeBlock.classList[codeBlock.classList.length - 1])
        hljs.highlightBlock(codeBlock)
    }

}