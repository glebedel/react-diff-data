import React from 'react';
import {render} from 'react-dom';
import FilePreview from './Components/FilePreview.jsx';

let exampleFile = 'var hljs = require(\'highlight.js\');var _ = require("lodash")import "../styles/FilePreview.css";import "bootstrap/dist/css/bootstrap.min.css";import "bootstrap-material-design/dist/css/material.min.css";import "bootstrap-material-design/dist/css/ripples.min.css";import React from \'react\';import "bootstrap/dist/js/bootstrap.min.js";import "bootstrap-material-design/dist/js/material.min.js";import "bootstrap-material-design/dist/js/ripples.min.js";$.material.init()hljs.initHighlightingOnLoad();export class FilePreview extends React.Component{ static defaultProps = {} static propTypes ={ } constructor(props){ super(props); this.state = { } }}';
render(
    <div>
        <FilePreview
            content={{source:"./", data:exampleFile, title:"My File"}}
            />
    </div>, document.getElementById('filePreviewApp'));

