import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { monthes } from '../../constants';

const ProjectsChart = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['الجارية', 'المنتهية', 'الملغية'],
        datasets: [
            {
                data: [12, 19, 5],
                backgroundColor: [
                    '#D7AD62',
                    '#1ABC9C',
                    '#EF3636',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,  // ✅ Allow width & height control
        plugins: {
            legend: {
                position: 'left',
            },
        },
        cutout: "70%",
    }

    const centerTextPlugin = {
        id: "centerText",
        beforeDraw: (chart) => {
            const { ctx } = chart;
            const xCoor = chart.getDatasetMeta(0).data[0].x
            const yCoor = chart.getDatasetMeta(0).data[0].y
            const total = chart.config.data.datasets[0].data.reduce((acc, value) => acc + value, 0); // Calculate total

            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // First line (small text)
            ctx.font = "normal 16px Cairo";  // Adjust size
            ctx.fillStyle = "#555";  // Gray color
            ctx.fillText("عدد المشاريع", xCoor, yCoor - 10); // Move up slightly

            // Second line (large number)
            ctx.font = "bold 28px Cairo";  // Bigger font
            ctx.fillStyle = "black";  // Gold color
            ctx.fillText(total, xCoor, yCoor + 20); // Move down slightly

            ctx.restore();
        }
    };
    return (
        <div className="col-span-3 bg-white p-8 rounded-lg shadow-md max-lg:col-span-6">
            <div className='flex items-center justify-between gap-4'>
                <h3 className="text-xl font-bold">المشاريع</h3>
                <select name="months">
                    {
                        monthes.map((month, index) => (
                            <option key={index} value={month.value}>{month.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="chart-wrapper flex items-start gap-3 relative">
                <Doughnut data={data} options={options} width={300} height={300} plugins={[centerTextPlugin]} />
            </div>
        </div>
    )
}

export default ProjectsChart