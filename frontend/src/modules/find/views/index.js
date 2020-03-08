import React , {Component} from 'react';
import './find.less';

class Find extends Component {

    submitFn(e) {
        console.log(e)
        e.preventDefault();
    }
    searchToggle(e) {
        console.log(this)
        let container = this.wrapper;
        let input = this.input;
        if (!(container.className == 'search-wrapper active')) {
            console.log('有了')
            container.classList.add('active')
            console.log(container)
            e.preventDefault();
        } else {
            container.classList.remove('active')
            input.value = ''
            console.log(e)
        }
        console.log(input.value.length)
    }
    render() {
        return (
            <div className='FindContainer'>
                <header className='htmlleaf-header'>
                    <h1>让心去聆听，拉近你我的距离<span>Create CSS3 Animated Search Box</span></h1>
                </header>
                <section className='htmleaf-container'>
                    <form onSubmit={this.submitFn}>
                        <div className='search-wrapper' ref={wrapper=>this.wrapper=wrapper}>
                            <div className='input-holder'>
                                <input type="text" placeholder="Type to search" className='search-input' ref={input=>this.input=input}/>
                                <button className='search-icon' onClick={(e)=>this.searchToggle(e)}>
                                    <span></span>
                                </button>
                            </div>
                            <span className='close'  onClick={(e)=>this.searchToggle(e)}></span>
                            <div className='result-container'>

                            </div>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}

export default Find;