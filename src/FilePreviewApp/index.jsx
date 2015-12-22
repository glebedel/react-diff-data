import React from 'react';
import {render} from 'react-dom';
import FilePreview from './Components/FilePreview.jsx';
let $ = require('jquery');
window.$ = $;

/*
* all spinners at http://kyleamathews.github.io/react-spinkit/
*/

let exampleFile = 'var hljs = require(\'highlight.js\');var _ = require("lodash")import "../styles/FilePreview.css";import "bootstrap/dist/css/bootstrap.min.css";import "bootstrap-material-design/dist/css/material.min.css";import "bootstrap-material-design/dist/css/ripples.min.css";import React from \'react\';import "bootstrap/dist/js/bootstrap.min.js";import "bootstrap-material-design/dist/js/material.min.js";import "bootstrap-material-design/dist/js/ripples.min.js";$.material.init()hljs.initHighlightingOnLoad();export class FilePreview extends React.Component{ static defaultProps = {} static propTypes ={ } constructor(props){ super(props); this.state = { } }}';

render(
    <div>
        <FilePreview
            content={[
                    {data:exampleFile, title:"FilePreview.jsx'", language:"javascript"},
                    {source:'https://dl.dropboxusercontent.com/s/rh52c4ksjlpthbo/mmcore_accor_userInteraction.js', title:"index.jsx", cache:true},
                    {source:'https://raw.githubusercontent.com/zemirco/sf-city-lots-json/master/citylots.json', title:"San Fran", cache:true}
                    ]}
            //           possible theme: ["tomorrow", "tomorrow-night", "xcode", "sunburst", "solarized-dark", "solarized-light", "rainbow", "railscast", "monokai", "monokai-sublime", "default", "androidstudio", "arta", "codepen", "darkula", "docco", "github", "google-code", "idea"]
            theme={"monokai"}
            spinner={"circle"}
            controls={{themes:["monokai", "github", "docco", "default"],
                       languages:["javascript", "css", "html"],}}
            config={"preview-file"}
            />
        <FilePreview
            content={[{data:exampleFile, title:"My File2"},
            ]}
            //           possible theme: ["tomorrow", "tomorrow-night", "xcode", "sunburst", "solarized-dark", "solarized-light", "rainbow", "railscast", "monokai", "monokai-sublime", "default", "androidstudio", "arta", "codepen", "darkula", "docco", "github", "google-code", "idea"]
            theme={"docco"}
            config={"preview-file"}
            />
    </div>, document.getElementById('filePreviewApp'));
