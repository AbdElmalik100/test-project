import { useEffect } from 'react'
import ProjectsCountChart from '../components/UI/ProjectsCountChart'
import { getLatestProject, getProjectsCount, getReports } from '../store/slices/reportsSlice'
import { useDispatch, useSelector } from 'react-redux'
import LatestProjectsChart from '../components/ReportsSections/LatestProjectsChart'
import ProjectsChart from '../components/UI/ProjectsChart'
import TasksChart from '../components/UI/TasksChart'
import EmployeesChart from '../components/ReportsSections/EmployeesChart'
import SupervisorsChart from '../components/ReportsSections/SupervisorsChart'
import Loader from '../components/UI/Loader'

const Reports = () => {
    const dispatch = useDispatch()
    const { reports, projectsCount, latestProjects, loading } = useSelector(state => state.reports)

    useEffect(() => {
        dispatch(getReports(3))
        dispatch(getProjectsCount())
        dispatch(getLatestProject())
    }, [dispatch])
    return (
        (reports && latestProjects && projectsCount && !loading)
            ?
            <div className="mt-10 grid grid-cols-6 gap-6">
                <LatestProjectsChart />
                <ProjectsCountChart />
                <EmployeesChart />
                <SupervisorsChart />
                <ProjectsChart />
                <TasksChart />
            </div>
            :
            <Loader className={'min-h-screen'} />
    )
}

export default Reports