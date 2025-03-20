import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from "react-redux";

const SupervisorsChart = () => {
    const { reports } = useSelector(state => state.reports)
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        datasets: [
            {
                data: [
                    reports.employees_count,

                ],
                backgroundColor: [
                    "#3D307F"
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,  // ✅ Allow width & height control
        cutout: "70%",
    }

    const centerTextPlugin = {
        id: "centerText",
        beforeDraw: (chart) => {
            const { ctx } = chart;
            const xCoor = chart.getDatasetMeta(0).data[0].x
            const yCoor = chart.getDatasetMeta(0).data[0].y
            // const total = chart.config.data.datasets[0].data.reduce((acc, value) => acc + value, 0); // Calculate total
            const total = reports.contractors_count

            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // First line (small text)
            ctx.font = "normal 16px Cairo";  // Adjust size
            ctx.fillStyle = "#555";  // Gray color
            ctx.fillText("اجمالي المقاولين", xCoor, yCoor - 10); // Move up slightly

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
                <h3 className="text-xl font-bold">اجمالي المقاولين</h3>
            </div>
            <div className="chart-wrapper flex items-start gap-3 relative">
                <Doughnut data={data} options={options} width={300} height={300} plugins={[centerTextPlugin]} />
            </div>
        </div>)
}

export default SupervisorsChart