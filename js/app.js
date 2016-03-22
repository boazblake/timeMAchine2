// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.error('registration failed')
//             // Registration failed
//     })
// } else {
//     // No ServiceWorker Support
// }

import DOM from 'react-dom'
import React, {Component} from 'react'

function app() {
    // start app
    // new Router()

    var yearData = {
    	year:1985,
    }

    var AppView = React.createClass({
    	render:function(){
    		console.log(this)
    		return(
    			<div className="tmWrapper">
    				<h1 className="heading">The Time Machine</h1>
    				<TimeMachine yearData={this.props.yearData.year}/>
    			</div>
    		)
    	}
    })



    var TimeMachine = React.createClass({


    	_goFwd:function(){
    		console.log(this)
    		if(!this.state.ticking) {
    			var incrementYear = function() {
    				this.setState({
    					year:this.state.year + 1,
    					ticking: true,
    					fwdButt: 'PAUSE'
    				})
    			}
    			var boundIncrement = incrementYear.bind(this)
    			this.intervalId = setInterval(boundIncrement, 500)
    		}
    		else {
    			clearInterval(this.intervalId)
    			this.setState({
    				ticking:false,
    				fwdButt:'... the future'
    			})
    		}
    	},

    	_goBack:function(){
    		console.log(this)
    		if(!this.state.ticking) {
    			var decrementYear = function(){
    				this.setState({
    					year:this.state.year - 1,
    					ticking:true,
    					pastButt:'PAUSE'
    				})
    			}
    			var boundRender = decrementYear.bind(this)
    			this.intervalId = setInterval(boundRender, 500)
    		}
    		else {
    			clearInterval(this.intervalId)
    			this.setState({
    				ticking:false,
    				pastButt:'Back to ...'
    			})
    		}
    	},


    	getInitialState:function() {
    		return{
    			year:parseInt(this.props.yearData),
    			fwdButt: '... the future',
    			pastButt: 'Back to ...',
    			ticking:false
    		}
    	},

    	render: function(){
    		console.log(this)
    		return (
    			<div className="yearWrapper">
    				<div className="buttonWrapper">
    					<button className="past buttons" onClick={this._goBack}>{this.state.pastButt}</button>
    					<button className="future buttons" onClick={this._goFwd}>{this.state.fwdButt}</button>
    				</div>
    					<h2 className="year" key="year">{this.state.year}</h2>
    			</div>
    		)
    	}
    })


    DOM.render(<AppView yearData={yearData}/>, document.querySelector('.container'))
}

app()
