import React, { Component } from 'react'
import styles from './dashboard.module.css';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Chart, { ChartConfiguration, } from 'chart.js/auto'
import { Collapse } from '@mui/material';
interface Props {
    created_by: string,
    created_date: string,
    created_time: string,
    expire_at: string | null,
    options: [],
    question: string,
    question_description: string,
    question_id: string,
    question_title: string
    total_votes: number,
    no_of_visits: number
}
interface State {
    show_description: boolean;
}



class PollDetails extends Component<Props, State> {
    ctx: CanvasRenderingContext2D | null = null;
    canvas: HTMLCanvasElement | null = null;
    chart: Chart | null = null;
    constructor(props: Props) {
        super(props);
        this.state = {
            show_description: false,
        }
    }
    updateCanvas = () => {
        if (this.canvas && this.ctx) {
            this.chart?.destroy();
            var grd = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            grd.addColorStop(0, '#94DAFF');
            grd.addColorStop(1, '#B91AFF');

            const config: ChartConfiguration = {
                type: 'bar',
                data: {
                    labels: this.props.options?.map((opt: any, index) => {
                        return (opt.option as string);
                    }),
                    datasets: [{
                        label: 'Votes',
                        data: this.props.options?.map((opt: any, index) => {
                            return (opt.no_of_polls as number);
                        }),
                        backgroundColor: grd
                    }]
                }, options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        title: { display: true, align: 'center', color: '#ffff', text: 'votes graph' }
                        , legend: { display: false }
                    },

                    scales: {
                        yAxes: {
                            grid: {
                                drawBorder: true,
                                color: '#4C3C77',
                            },
                            ticks: {
                                color: 'hsla(0,0%,100%,0.8)'
                            }
                        },
                        xAxes: {
                            grid: {
                                drawBorder: true,
                                color: '#4C3C77',
                            },
                            ticks: {
                                color: 'hsla(0,0%,100%,0.8)'
                            }
                        },

                    }
                }
            }
            this.chart = new Chart(this.ctx, config);
        }
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    componentDidMount() {

        this.canvas = document.getElementById('chart-canvas') as HTMLCanvasElement;
        if (this.canvas) {
            this.canvas.height = 350
            // this.canvas.width 
            this.ctx = this.canvas.getContext('2d');
            this.updateCanvas();
        }

    }
    render(): React.ReactNode {

        return (
            <>
                <div className={styles['details-container']} >
                    <div className={styles['details-wrapper']}>
                        <h3>Details</h3>
                        <hr></hr>
                        <div className={styles['poll-details']}>
                            <div>
                                <p>Title:</p>
                                <p>{this.props.question_title}</p>
                            </div>
                            <div>
                                <p>Total votes:</p>
                                <p>{this.props.total_votes}</p>
                            </div>
                            <div>
                                <p>Expires at:</p>
                                <p></p>
                            </div>
                            {this.props.question_description &&
                                <div className={styles['details-description']}>
                                    <div onClick={() => { this.setState({ show_description: !this.state.show_description }) }}>
                                        {this.state.show_description && <p>Show description</p>}
                                        {!this.state.show_description && <p>Hide description</p>}
                                        {this.state.show_description ? <ExpandMore /> : <ExpandLess />}
                                    </div>
                                    <Collapse in={this.state.show_description}>
                                        <p>{this.props.question_description}</p>
                                    </Collapse>
                                </div>
                            }
                        </div>
                        <div className={styles['vote-chart']}>
                            <canvas id='chart-canvas'></canvas>
                        </div>
                        <div className={styles['poll-percentages']}>
                            {this.props.options.map((opt: any, index) => {

                                return (
                                    <div key={index}>
                                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="4.5" cy="4.5" r="4.5" fill="#8593ED" />
                                        </svg>
                                        <div>
                                            <span>{opt.option}</span>
                                            <span>{Math.floor((opt.no_of_polls / this.props.total_votes) * 100)}%</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PollDetails;