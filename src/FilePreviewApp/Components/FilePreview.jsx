import '../Styles/FilePreview.scss';

let _ = require("lodash")
let hljs = require('highlight.js');
let ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-material-design/dist/css/material.min.css";
import "bootstrap-material-design/dist/css/ripples.min.css";
import "bootstrap-material-design/dist/css/roboto.min.css";
import "bootstrap-material-design/dist/js/material.min.js";
import "bootstrap-material-design/dist/js/ripples.min.js"
import "highlight.js/styles/default.css"
import '../Styles/highlightjs.scss';

import React from 'react';
import ConfigManager from '../ConfigManager.js';
import ContentWrapper from './ContentWrapper.jsx';
import ChoiceSelector from './ChoiceSelector.jsx';
import {TogglerButton} from './Toggler.jsx';
import {TogglerLabel} from './Toggler.jsx';

export default class FilePreview extends React.Component {
    static defaultProps = {content: [], theme: "default", controls: {}, config: {}, language: "auto",
        prettify: false}
    static propTypes = {
        content: React.PropTypes.arrayOf(React.PropTypes.shape({
            source: React.PropTypes.string,
            data: React.PropTypes.string,
            title: React.PropTypes.string
        })),
        language: React.PropTypes.string,
        theme: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = Object.assign({
            language: this.props.language,
            theme: this.props.theme,
            currentFile: this.props.content[0],
            prettify: this.props.prettify
        }, ConfigManager.getConfig(this.props.config));
    }

    componentDidMount() {
        this.initializeThirdParty();
    }

    _fixFileTitles(files) {
        files.forEach((file)=> {
            if (!file.title && file.source)
                file.title = file.source.match(/.*\/(.*)/)[1];
        });
    }
    handlePrettifying= ()=>{
        this.setState({prettify: !this.state.prettify})
    }
    render() {
        let currentFile = this.state.currentFile;
        let {controls, ...props} = this.props;
        this._fixFileTitles(this.props.content);

        ConfigManager.setConfig(this.props.config, {language: this.state.language, theme: this.state.theme});
        let title = (currentFile.title && <h2 className="pf-title">{currentFile.title}</h2>);

        let themeSelector = controls.themes &&
            <div className="pf-theme-controller">
                <ChoiceSelector
                    choices={controls.themes}
                    updateParentState={this.setState.bind(this)}
                    choicePrefix="Theme"
                    currentValue={this.state.theme}
                    stateToUpdate="theme"
                    />
            </div>

        let languagesSelector = controls.languages &&
            <div className="pf-language-controller">
                <ChoiceSelector
                    choices={controls.languages}
                    updateParentState={this.setState.bind(this)}
                    choicePrefix="Language"
                    currentValue={this.state.language}
                    stateToUpdate="language"
                    />
            </div>

        let files = this.props.content.map((file)=> file.title);

        let fileSelector = this.props.content.length > 1 &&
            (<div className="pf-file-controller">
                <ChoiceSelector
                    choices={files}
                    updateParentState={this.setState.bind(this)}
                    currentValue={currentFile.title}
                    stateToUpdate="currentFile"
                    dataChoiceMapping={this.props.content}
                    />
            </div>);

        let prettifier = controls.prettifier &&
                <TogglerButton
                    styleClasses={["btn-primary", "btn-default"]}
                    names={["Prettify", "Uglify"]}
                    actions={[this.setState.bind(this, {prettify: true}), this.setState.bind(this,{prettify:false})]}
                    />

        let bottomControllers = (languagesSelector || themeSelector) &&
            <div className="pf-controllers">
                {themeSelector}
                {languagesSelector}
            </div>

        return (
            <ReactCSSTransitionGroup
                transitionName="pf"
                transitionAppear={true}
                transitionAppearTimeout={1500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                <div className="pf-container well">
                    <div className="pf-header modal-header">
                        {fileSelector || title}
                    </div>
                    {prettifier}
                    <ContentWrapper
                        {...props}
                        {...this.state}
                        />
                    {bottomControllers}
                </div>
            </ReactCSSTransitionGroup>
        );
    }

    componentDidUpdate() {
        this.initializeThirdParty();
    }

    initializeThirdParty() {
        $.material.init();
    }
}