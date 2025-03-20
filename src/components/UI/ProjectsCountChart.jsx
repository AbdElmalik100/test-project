import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { chartMonthesLabels, yearlyOptions } from '../../constants';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsCount } from '../../store/slices/reportsSlice';
import { useSearchParams } from 'react-router';

const ProjectsCountChart = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const { projectsCount } = useSelector(state => state.reports)
    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );    
    
    const data = {
        labels: chartMonthesLabels,
        datasets: [
            {
                data: projectsCount.map(el => el.project_count),
                backgroundColor: [
                    '#95A4FC',
                    '#BAEDBD',
                    '#1C1C1C',
                    '#B1E3FF',
                    '#A8C5DA',
                    '#A1E3CB',
                ],
                barThickness: 40,
                borderRadius: 10,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
        }
    }
    return (
        <div className="col-span-6 bg-white p-8 rounded-lg shadow-md ">
            <div className='flex items-center justify-between gap-4'>
                <h3 className="text-xl font-bold">عدد المشاريع</h3>
                <Select
                    value={searchParams.get("year") ? searchParams.get("year") : yearlyOptions[0]}
                    size='large'
                    style={{
                        width: 120,
                    }}
                    onChange={value => {
                        setSearchParams({year: value})
                        dispatch(getProjectsCount(value))
                    }}
                    options={yearlyOptions}
                />
            </div>
            <div className="chart-wrapper mt-4 flex items-start gap-3 relative">
                <Bar data={data} options={options} width={300} height={300} />
            </div>
        </div>
    )
}

export default ProjectsCountChart