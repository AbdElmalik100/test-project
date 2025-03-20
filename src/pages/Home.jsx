import Statistics from "../components/homeSections/Statistics"
import ProjectsChart from "../components/UI/ProjectsChart";
import TasksChart from "../components/UI/TasksChart";
import LatestNotifications from "../components/HomeSections/LatestNotifications";
import ProjectsCountChart from "../components/UI/ProjectsCountChart";
import LatestProjects from "../components/HomeSections/LatestProjects";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLatestProject, getProjectsCount, getReports } from "../store/slices/reportsSlice";
import Loader from "../components/UI/Loader";
import { useSearchParams } from "react-router";

const Home = () => {
    const dispatch = useDispatch()
    const { reports, projectsCount, loading } = useSelector(state => state.reports)
    const [searchParams, setSearchParams] = useSearchParams();
    

    useEffect(() => {
        dispatch(getReports({
            month: searchParams.get("month") ? searchParams.get("month") : "",
            type: searchParams.get("type") ? searchParams.get("type") : ""
        }))
        dispatch(getProjectsCount(searchParams.get("year") ? searchParams.get("year") : new Date().getFullYear()))
        dispatch(getLatestProject())
    }, [dispatch, searchParams])

    return (
        (reports && projectsCount && !loading)
            ?
            <section className="mt-10">
                <Statistics />
                <div className="mt-6 grid grid-cols-6 gap-6">
                    <ProjectsChart />
                    <TasksChart />
                    <ProjectsCountChart />
                    {/* <LatestNotifications /> */}
                    <LatestProjects />
                </div>
            </section>
            :
            <Loader className={"h-screen"} />
    )
}

export default Home