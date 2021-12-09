import { Component, ReactNode, } from 'react'
import PollDetails from './PollDetails';
import styles from './dashboard.module.css';
// import './dashboard.css'
interface Props {
    user_name: string;
    xp: number;
    total_created_polls: number;
    questions_data: {
        created_by: string, created_date: string, created_time: string,
        expire_at: string | null,
        options: [], question: string,
        question_description: string,
        question_id: string,
        question_title: string
        total_votes: number,
        no_of_visits: number
    }[],
    total_visits: number;
    total_votes: number;
}
interface State {
    open_poll_search: boolean;
    poll_details_index: number;
    show_poll_details: boolean;
    width: number;
}
export default class MyPolls extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            open_poll_search: false,
            poll_details_index: 0,
            show_poll_details: true, width: window.innerWidth
        }
    }
    displayNoPollsImage = async () => {
        const res = await fetch('media/illustrations/no_data.svg');
        const svg = await res.text();
        let div = document.getElementById('no-data-container');
        if (div) {
            div.innerHTML = svg + '<p>No polls created.</p>'
        }
    }
    async componentDidMount() {
        if (window.innerWidth <= 1280) {
            this.setState({ show_poll_details: false })
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth > 780) { this.setState({ show_poll_details: true }) ;}
            this.setState({ width: window.innerWidth });
        })
        if (this.props.questions_data.length >= 0) {
            await this.displayNoPollsImage();
        }
    }
    pollStatusTableData = () => {
        return (
            <>
                {this.props.questions_data.map((poll_data, index) => {
                    let expired = false;
                    let active = false;
                    let dataAttributes: any = {}
                    if (poll_data.expire_at) {
                        let differ = new Date(poll_data.expire_at).getTime() - new Date(poll_data.created_time).getTime();
                        if (differ <= 0) {
                            expired = true; active = false;
                            dataAttributes['data-expired'] = true;
                        } else {
                            expired = false;
                            active = true;
                            dataAttributes['data-active'] = true;
                        }
                    } else {
                        dataAttributes['data-noexpire'] = true;
                    }
                    return (
                        <tr key={index} onClick={() => {
                            this.setState({ poll_details_index: index, show_poll_details: true });
                        }} >
                            <td><p>{poll_data.question_title}</p></td>
                            <td><p>{poll_data.total_votes}</p></td>
                            <td><p>{poll_data.no_of_visits}</p></td>
                            <td><p>{poll_data.question_id}</p></td>
                            <td {...dataAttributes}
                            >
                                <div>
                                    {!poll_data.expire_at && <p>NO EXPIRATION</p>}
                                    {expired && <p>CLOSED</p>}
                                    {active && <p>ACTIVE</p>}
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </>
        )
    }
    render(): ReactNode {

        return (
            <div className={styles['center-container']} >
                <div className={styles['center-wrapper']} >
                    <div className={styles['center-top']}>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <h3>Hi,</h3><p>{this.props.user_name}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <p>{this.props.xp}
                            </p>
                            <sub>xp</sub></div>
                    </div>


                    <div className={styles['overall-container']}>
                        <h3 className={styles['overall-heading']}>Overall status</h3>
                        <div className={styles['overall-wrapper']}>
                            <div>
                                <div>
                                    <div>
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 12.8H9.71429V38H2V12.8ZM16.4 2H23.6V38H16.4V2ZM30.8 22.5714H38V38H30.8V22.5714Z" stroke="#2E2C3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <span>{this.props.total_created_polls}</span>
                                <span>Created polls</span>
                            </div>

                            <div>
                                <div>
                                    <div>
                                        <svg width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 14.0909C1 14.0909 7.54545 1 19 1C30.4545 1 37 14.0909 37 14.0909C37 14.0909 30.4545 27.1818 19 27.1818C7.54545 27.1818 1 14.0909 1 14.0909Z" stroke="#2E2C3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.9999 19.0001C21.7111 19.0001 23.909 16.8022 23.909 14.091C23.909 11.3798 21.7111 9.18188 18.9999 9.18188C16.2887 9.18188 14.0908 11.3798 14.0908 14.091C14.0908 16.8022 16.2887 19.0001 18.9999 19.0001Z" stroke="#968AF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <span>{this.props.total_visits}</span>
                                <span>Visits</span>
                            </div>

                            <div>
                                <div>
                                    <div>
                                        <svg width="37" height="31" viewBox="0 0 37 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M26.4545 29.6363V26.4545C26.4545 24.7667 25.7841 23.1481 24.5907 21.9547C23.3973 20.7613 21.7787 20.0908 20.0909 20.0908H7.36364C5.6759 20.0908 4.05728 20.7613 2.86387 21.9547C1.67045 23.1481 1 24.7667 1 26.4545V29.6363" stroke="#2E2C3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13.7269 13.7273C17.2415 13.7273 20.0906 10.8782 20.0906 7.36364C20.0906 3.8491 17.2415 1 13.7269 1C10.2124 1 7.36328 3.8491 7.36328 7.36364C7.36328 10.8782 10.2124 13.7273 13.7269 13.7273Z" stroke="#2E2C3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M36.0003 29.6362V26.4544C35.9992 25.0444 35.5299 23.6747 34.6661 22.5604C33.8022 21.446 32.5927 20.6501 31.2275 20.2976" stroke="#2E2C3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M24.8633 1.20654C26.2321 1.55702 27.4454 2.35311 28.3118 3.46931C29.1782 4.58551 29.6485 5.95832 29.6485 7.37132C29.6485 8.78431 29.1782 10.1571 28.3118 11.2733C27.4454 12.3895 26.2321 13.1856 24.8633 13.5361" stroke="#2E2C3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <span>{this.props.total_votes}</span>
                                <span>Votes</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles['poll-status-container']}>
                        <h3>Poll status</h3>
                        {this.props.questions_data.length > 0 &&
                            <>
                                <div className={styles['poll-status-wrapper']}>
                                    <div className={styles['poll-search']} data-open={this.state.open_poll_search}
                                        onClick={() => {
                                            this.setState({ open_poll_search: !this.state.open_poll_search })
                                        }}
                                    >
                                        <div>
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.0086 13.2075H14.06L13.7238 12.8834C14.9005 11.5146 15.6089 9.73756 15.6089 7.80446C15.6089 3.494 12.1149 0 7.80446 0C3.494 0 0 3.494 0 7.80446C0 12.1149 3.494 15.6089 7.80446 15.6089C9.73756 15.6089 11.5146 14.9005 12.8834 13.7238L13.2075 14.06V15.0086L19.211 21L21 19.211L15.0086 13.2075ZM7.80446 13.2075C4.81475 13.2075 2.40137 10.7942 2.40137 7.80446C2.40137 4.81475 4.81475 2.40137 7.80446 2.40137C10.7942 2.40137 13.2075 4.81475 13.2075 7.80446C13.2075 10.7942 10.7942 13.2075 7.80446 13.2075Z" fill="#423F5A" />
                                            </svg>
                                        </div>

                                        <input />

                                    </div>
                                </div>
                                <div className={styles['poll-status-table-container']}>
                                    <table className={styles['poll-status-table']}>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Votes</th>
                                                <th>Views</th>
                                                <th>Poll Id</th>
                                                <th>Status</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {this.pollStatusTableData()}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        }{this.props.questions_data.length <= 0 &&
                            <div className={styles['no-data-container']} id='no-data-container'> </div>
                        }
                    </div>
                </div>
                {this.props.questions_data.length > 0 && this.state.show_poll_details &&
                    <>
                        {this.state.width <= 1280 &&
                            <div className={styles['poll-details-overlay']} onClick={() => { this.setState({ show_poll_details: false }) }} ></div>
                        }
                        <PollDetails {...this.props.questions_data[this.state.poll_details_index]} />
                    </>
                }
            </div>
        )
    }
}
