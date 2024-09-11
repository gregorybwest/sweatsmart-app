import { useEffect, useState } from 'react';
import axios from 'axios';
import { WorkoutCardList } from '../Components/WorkoutCardList';


interface Run {
    pace: number;
    time: number;
    title: string;
}

const backEndURI = import.meta.env.VITE_BACKEND_URI;

async function sendCode(code: string) {
    try {
        const response = await axios.get(
            `${backEndURI}/strava_auth?code=${code}`
        );
        return response.data; // Return the data
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Handle error appropriately
    }
}

async function sendRefreshToken(refresh_token: string) {
    try {
        const response = await axios.get(
            `${backEndURI}/strava_auth?refresh_token=${refresh_token}`
        );
        return response.data; // Return the data
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Handle error appropriately
    }
}

async function getStravaStats(
    athlete_id: number | string | null,
    access_token: string,
    setEasyRun: (easy: Run) => void,
    setMediumRun: (medium: Run) => void,
    setHardRun: (hard: Run) => void
) {
    const stravaStats = await axios.get(`${backEndURI}/strava_stats`, {
        params: {
            athlete_id: athlete_id,
            access_token: access_token,
        },
    });
    console.log(stravaStats);
    setEasyRun(stravaStats.data.easy_run);
    setMediumRun(stravaStats.data.medium_run);
    setHardRun(stravaStats.data.hard_run);
}

function Workouts() {
    const params = new URLSearchParams(document.location.search);
    const code = params.get('code');
    const [data, setData] = useState({});
    const [easyRun, setEasyRun] = useState<Run>({
        pace: 0,
        time: 0,
        title: '',
    });
    const [mediumRun, setMediumRun] = useState<Run>({
        pace: 0,
        time: 0,
        title: '',
    });
    const [hardRun, setHardRun] = useState<Run>({
        pace: 0,
        time: 0,
        title: '',
    });
    console.log(data);

    useEffect(() => {
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
            sendRefreshToken(refresh_token).then((result) => {
                if (result) {
                    setData(result); // Set the data state with the fetched result
                    const athlete_id = localStorage.getItem('athlete_id');
                    const access_token = result['access_token'];
                    getStravaStats(
                        athlete_id,
                        access_token,
                        setEasyRun,
                        setMediumRun,
                        setHardRun
                    );
                }
            });
        } else if (code) {
            sendCode(code).then((result) => {
                if (result) {
                    setData(result); // Set the data state with the fetched result
                    const athlete_id = result['athlete']['id'];
                    const access_token = result['access_token'];
                    localStorage.setItem(
                        'refresh_token',
                        result['refresh_token']
                    );
                    localStorage.setItem('athlete_id', athlete_id);
                    getStravaStats(
                        athlete_id,
                        access_token,
                        setEasyRun,
                        setMediumRun,
                        setHardRun
                    );
                }
            });
        }
        // getStravaStats(data);
    }, [code]); // Only depend on `code`

    return (
        <>
            <div className='navbar bg-base-100'>
                <div className='flex-1'>
                    <a className='btn btn-ghost text-xl'>SweatSmart</a>
                </div>
                <div className='flex-none'>
                    <ul className='menu menu-horizontal px-1'>
                        <li>
                            <details>
                                <summary>
                                    Account
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='lucide lucide-user h-5 w-5'
                                        data-id='8'
                                    >
                                        <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                                        <circle cx='12' cy='7' r='4'></circle>
                                    </svg>
                                </summary>
                                <ul className='bg-base-100 rounded-t-none p-2'>
                                    <li>
                                        <a
                onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                }}>Logout</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
            <WorkoutCardList
                easyRun={easyRun}
                mediumRun={mediumRun}
                hardRun={hardRun}
            />
            <button
                className='btn btn-secondary'
                onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                }}
            >
                Logout
            </button>
        </>
    );
}

export default Workouts;
