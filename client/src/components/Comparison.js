import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import ReactHighcharts from 'react-highcharts'
import Spinner from 'react-spinkit'


class Comparison extends Component {

    constructor(props) {
        super(props)
        this.stats = ['attack', 'sp_attack', 'defense', 'sp_defense', 'speed', 'hp', 'total']
        this.ids = this.props.match.params.ids.split(',')
        this.state = {
            data: [],
            colors: {},
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const requests = [axios.get(`${process.env.REACT_APP_API_URL}/api/types`)].concat(
            this.ids.map(id => 
                axios.get(`${process.env.REACT_APP_API_URL}/api/pokemon/${id}`)
            )
        )

        axios.all(requests)
            .then((responses) => {
                let colors = {}
                const types = responses[0].data.data
                types.forEach(type =>
                    colors[type.name] = type.color
                )

                const data = responses.splice(1).map(response => ({
                        name: response.data.data.forme,
                        data: this.stats.map(stat => response.data.data[stat]),
                        color: colors[response.data.data.type1],
                    }) 
                )
                console.log(data)
                this.setState({ data })
            })
    }

    render() {
        const config = {
            chart: {
                type: 'bar',
            },
            title: {
                text: 'Stats comparison',
            },
            xAxis: {
                categories: this.stats,
            },
            series: this.state.data,
        }

      return (
        <div class="row justify-content-center">
        <div class="col-sm-12 col-md-6"> 
        {this.state.data ?
        <ReactHighcharts config={config} /> : 
        <Spinner name="pulse" style={{ width: 27 }} className="mx-auto" />
        }
        </div></div>)
    }
}

export default Comparison
