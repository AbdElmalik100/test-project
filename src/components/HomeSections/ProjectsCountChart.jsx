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
import { chartMonthes } from '../../constants';

const ProjectsCountChart = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const data = {
        labels: chartMonthes,
        datasets: [
            {
                data: chartMonthes.map(el => Math.ceil(Math.random() * 1000)),
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
        <div className="col-span-4 bg-white p-8 rounded-lg shadow-md max-lg:col-span-6">
            <div className='flex items-center justify-between gap-4'>
                <h3 className="text-xl font-bold">عدد المشاريع</h3>
                <select name="quarter">
                    <option value="weekly">اسبوعي</option>
                    <option value="monthly" selected>شهري</option>
                    <option value="yearly">سنوي</option>
                </select>
            </div>
            <div className="chart-wrapper mt-4 flex items-start gap-3 relative">
                <Bar data={data} options={options} width={300} height={300} />
            </div>
        </div>
    )
}

export default ProjectsCountChart