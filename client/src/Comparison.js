import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import ReactHighcharts from 'react-highcharts';


class Comparison extends Component {

    constructor(props) {
        super(props)
        this.stats = ['attack', 'sp_attack', 'defense', 'sp_defense', 'speed', 'hp', 'total']
        this.ids = this.props.match.params.ids.split(',')
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const requests = this.ids.map(id => 
            axios.get(`${process.env.REACT_APP_API_URL}/api/pokemon/${id}`)
        )

        axios.all(requests)
            .then((responses) => {
                const data = responses.map(response => ({
                        name: response.data.data.forme,
                        data: this.stats.map(stat => response.data.data[stat])
                    }) 
                )

                this.setState({ data })
            })
    }

    render() {
        const config = {
            chart: {
                type: 'bar',
            },
            xAxis: {
                categories: this.stats,
            },
            series: this.state.data
        }

      return this.state.data ? 
        <ReactHighcharts config={config} /> : 
        null
    }
}

export default Comparison
