import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props){
        super(props)
        this.state ={
            
        }
    }
    render() {
        return (
            <div>
                <footer className='footer'>
                    <span style={{ color: 'grey' }}>All right Reserved 2023 @haiduong </span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;