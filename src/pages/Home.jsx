import Statistics from "../components/homeSections/Statistics"
import ProjectsChart from "../components/HomeSections/ProjectsChart";
import MissionsChart from "../components/HomeSections/MissionsChart";
import LatestNotifications from "../components/HomeSections/LatestNotifications";
import ProjectsCountChart from "../components/HomeSections/ProjectsCountChart";
import LatestProjects from "../components/HomeSections/LatestProjects";

const Home = () => {

    return (
        <section className="mt-10">
            <Statistics />
            <div className="mt-6 grid grid-cols-6 gap-6">
                <ProjectsChart />
                <MissionsChart />
                <ProjectsCountChart />
                <LatestNotifications />
                <LatestProjects />
            </div>
        </section>
    )
}

export default Home