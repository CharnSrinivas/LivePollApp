import { Input } from '@mui/material';
import { Component } from 'react'
import Navbar from '../../Components/NavBar'
import { SERVER_URL } from '../../config'
import styles from './dashboard.module.css'
interface Props {

}
interface State {
    user_name: string;
    xp: number;
    total_created_polls: number;
    total_visits: number;
    total_votes: number;
    open_poll_search: boolean;
    questions_data: {
        created_by: string, created_date: string, created_time: string,
        expire_at: string | null,
        options: [], question: string,
        question_description: string,
        question_id: string,
        question_title: string
        total_votes: number,
        no_of_visits: number
    }[]
}

export default class index extends Component<Props, State> {
    state: Readonly<State> = {
        user_name: '',
        total_created_polls: -1,
        total_visits: -1,
        total_votes: -1,
        xp: -1,
        open_poll_search: false, questions_data: []
    }
    componentDidMount() {
        fetch(`${SERVER_URL}/dashboard`, { method: 'GET', credentials: 'include', mode: 'cors' }).then(res => {
            res.json().then(res_json => {
                if (res_json.error) {
                    window.location.href = '/signin'; return;
                }
                let total_visits = 0
                let total_votes = 0
                res_json.questions_data.forEach((element: any) => {
                    total_visits += element.no_of_visits;
                    element.options.forEach((opt: any) => {
                        total_votes += opt.no_of_polls
                    }
                    )
                });
                this.setState({
                    user_name: res_json.username,
                    total_visits,
                    total_created_polls: res_json.questions_data.length,
                    xp: res_json.xp,
                    total_votes,
                    questions_data: res_json.questions_data
                })
            })
        }).catch(err => {
            console.error(err)
        })
    }
    pollStatusTableData = () => {
        return (
            <>
            {this.state.questions_data.map((poll_data,index) => {
                    let expired = false;
                    let active = false;
                    if (poll_data.expire_at) {
                        let differ = new Date(poll_data.expire_at).getTime() - new Date(poll_data.created_time).getTime();
                        if (differ <= 0) { 
                            expired = true; active = false; return;
                        }expired = false;active=true;
                    }
                    return (
                        <tr key={index}>
                            <td><p>{poll_data.question_title}</p></td>
                            <td><p>{poll_data.total_votes}</p></td>
                            <td><p>{poll_data.no_of_visits}</p></td>
                            <td data-noexpire={!poll_data.expire_at ? true : false} data-expired={expired} data-active={active}>
                                {!poll_data.expire_at && <p>NO EXPIRATION</p>}
                                {expired && <p>CLOSED</p>}
                                {active && <p>ACTIVE</p>}
                            </td>
                        </tr>
                    )
                })}
            </>
        )
    }
    render() {
        return (
            <div className={styles['container']}>
                <Navbar />
                <div className={styles['wrapper']}>
                    <div className={styles['menu-container']}>
                        <div className={styles['menu']}>
                            <p>Dashboard</p>
                            <div>
                                <div className={styles['menu-item']}>
                                    <svg width="18" height="24" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 17V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 17V1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 17V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />:
                                    </svg>

                                    <p>My polls</p>
                                </div>
                                <div className={styles['menu-item']} data-selected='true'>

                                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#656284" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#656284" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                    <p>Profile</p>
                                </div>
                                <div className={styles['menu-item']}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#656284" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z" stroke="#656284" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p>Settings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['center-container']}>
                        <div className={styles['center-wrapper']} >
                            <div className={styles['center-top']}>
                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <h3>Hi,</h3><p>{this.state.user_name}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <p>{this.state.xp}
                                    </p>
                                    <sub>xp</sub></div>
                            </div>

                            <span className={styles['hr-line-100']}></span>

                            <div className={styles['overall-container']}>
                                <h3 className={styles['overall-heading']}>Overall status</h3>
                                <div className={styles['overall-wrapper']}>
                                    <div>
                                        <div>
                                            <div>
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 12.8H9.71429V38H2V12.8ZM16.4 2H23.6V38H16.4V2ZM30.8 22.5714H38V38H30.8V22.5714Z" stroke="#2E2C3F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p>{this.state.total_created_polls}</p>
                                        <p>Created polls</p>
                                    </div>

                                    <div>
                                        <div>
                                            <div>
                                                <svg width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 14.0909C1 14.0909 7.54545 1 19 1C30.4545 1 37 14.0909 37 14.0909C37 14.0909 30.4545 27.1818 19 27.1818C7.54545 27.1818 1 14.0909 1 14.0909Z" stroke="#2E2C3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M18.9999 19.0001C21.7111 19.0001 23.909 16.8022 23.909 14.091C23.909 11.3798 21.7111 9.18188 18.9999 9.18188C16.2887 9.18188 14.0908 11.3798 14.0908 14.091C14.0908 16.8022 16.2887 19.0001 18.9999 19.0001Z" stroke="#968AF4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p>{this.state.total_visits}</p>
                                        <p>Visits</p>
                                    </div>

                                    <div>
                                        <div>
                                            <div>
                                                <svg width="37" height="31" viewBox="0 0 37 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M26.4545 29.6363V26.4545C26.4545 24.7667 25.7841 23.1481 24.5907 21.9547C23.3973 20.7613 21.7787 20.0908 20.0909 20.0908H7.36364C5.6759 20.0908 4.05728 20.7613 2.86387 21.9547C1.67045 23.1481 1 24.7667 1 26.4545V29.6363" stroke="#2E2C3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M13.7269 13.7273C17.2415 13.7273 20.0906 10.8782 20.0906 7.36364C20.0906 3.8491 17.2415 1 13.7269 1C10.2124 1 7.36328 3.8491 7.36328 7.36364C7.36328 10.8782 10.2124 13.7273 13.7269 13.7273Z" stroke="#2E2C3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M36.0003 29.6362V26.4544C35.9992 25.0444 35.5299 23.6747 34.6661 22.5604C33.8022 21.446 32.5927 20.6501 31.2275 20.2976" stroke="#2E2C3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M24.8633 1.20654C26.2321 1.55702 27.4454 2.35311 28.3118 3.46931C29.1782 4.58551 29.6485 5.95832 29.6485 7.37132C29.6485 8.78431 29.1782 10.1571 28.3118 11.2733C27.4454 12.3895 26.2321 13.1856 24.8633 13.5361" stroke="#2E2C3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p>{this.state.total_votes}</p>
                                        <p>Votes</p>
                                    </div>
                                </div>
                            </div>

                            <span className={styles['hr-line-100']}></span>
                            <div className={styles['poll-status-container']}>
                                <h3>Poll status</h3>
                                <div className={styles['poll-status-wrapper']}>
                                    <div className={styles['poll-search-container']}>
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
                                </div>
                                <div className={styles['poll-status-table-container']}>
                                    <table className={styles['poll-status-table']}>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Votes</th>
                                                <th>Views</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.pollStatusTableData()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['details-container']}>
                        <div>
                            <p>Details</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

