import { Icon } from '@iconify/react/dist/iconify.js';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import DeletePopup from './DeletePopup';
import StatusBadge from './StatusBadge';
import PermissionAddPopup from '../Permissions/PermissionAddPopup';
import EditProject from '../ProjectsSections/EditProject';
import EditTask from '../TasksSections/EditTask';
import EditSupervisor from '../SupervisorsSections/EditSupervisor';
import EditPermission from '../Permissions/EditPermission';
import EditEmployee from '../EmployeesSections/EditEmployee';
import { useSelector } from 'react-redux';
import { hasPermission } from '../../utils';

const TablGrid = ({ type, tableData, filterationData, header, title, modal = false, linkDirection, deleteItem }) => {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])
    const { user } = useSelector(state => state.users)

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    const checkAdmin = (value, ComponentName) => {
        if (user.id === 1) return ComponentName
        if (value.id !== 1 ) return ComponentName
        return null
    }

    useEffect(() => {
        switch (type) {
            case "projects":
                setData(filterationData.map(({ id, name, desc, employees, completion_percentage, status, created_at }, index) => ({
                    key: id,
                    name,
                    desc,
                    employees,
                    completion_percentage,
                    status,
                    created_at,
                    actions: filterationData[index],
                })))
                setColumns([
                    {
                        title: 'اسم المشروع',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'وصف المشروع',
                        dataIndex: 'desc',
                        key: 'desc',
                    },
                    {
                        title: 'عدد الموظفين',
                        dataIndex: 'employees',
                        key: 'employees',
                        render: (value) => value.length
                    },
                    {
                        title: 'نسبة الانجاز',
                        dataIndex: 'completion_percentage',
                        key: 'completion_percentage',
                        render: (value) => <span>{value}%</span>
                    },
                    {
                        title: 'حالة المشروع',
                        dataIndex: 'status',
                        key: 'status',
                        render: (value) => <StatusBadge statusType={value} className={"mx-auto"} />
                    },
                    {
                        title: 'تاريخ الانشاء',
                        dataIndex: 'created_at',
                        key: 'created_at',
                        render: (value) => (new Date(value).toLocaleString())
                    },
                    {
                        title: 'العمليات',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (value) => (
                            <div className='flex items-center gap-3 justify-center'>
                                <NavLink className="!text-black hover:!text-primary-400 grid place-items-center" to={`/projects-list/${value.id}`}>
                                    <Icon icon="iconamoon:eye-light" fontSize={22} />
                                </NavLink>
                                {hasPermission(user, "تعديل مشروع") && <EditProject itemObj={value} />}
                                {hasPermission(user, "حذف مشروع") && <DeletePopup handleDelete={() => deleteItem(value)} itemObj={value} />}
                            </div>
                        )
                    },
                ])
                break;
            case "tasks":
                setData(filterationData.map(({ id, name, project, contractor, employee, stage, status, created_at }, index) => ({
                    key: id,
                    name,
                    project,
                    contractor,
                    employee,
                    stage,
                    status,
                    created_at,
                    actions: filterationData[index],
                })))
                setColumns([
                    {
                        title: 'اسم المهمة',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'المشروع',
                        dataIndex: 'project',
                        key: 'project',
                        render: (value) => <NavLink className="!text-black hover:!text-primary-400" to={`/projects-list/${value?.id}`}>{value?.name}</NavLink>
                    },
                    {
                        title: 'المرحلة',
                        dataIndex: 'stage',
                        key: 'stage',
                        render: (value) => value?.name
                    },
                    {
                        title: 'الحالة',
                        dataIndex: 'status',
                        key: 'status',
                        render: (value) => <StatusBadge statusType={value} className={"mx-auto"} />
                    },
                    {
                        title: 'الموظف',
                        dataIndex: 'employee',
                        key: 'employee',
                        render: (value) => <NavLink className="!text-black hover:!text-primary-400" to={`/employees-list/${value?.id}`}>{value?.name}</NavLink>
                    },
                    {
                        title: 'المقاول',
                        dataIndex: 'contractor',
                        key: 'contractor',
                        render: (value) => <NavLink className="!text-black hover:!text-primary-400" to={`/supervisors-list/${value?.id}`}>{value?.name}</NavLink>
                    },
                    {
                        title: 'تاريخ الانشاء',
                        dataIndex: 'created_at',
                        key: 'created_at',
                        render: (value) => (new Date(value).toLocaleString())
                    },
                    {
                        title: 'العمليات',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (value) => (
                            <div className='flex items-center gap-3 justify-center'>
                                <NavLink className="!text-black hover:!text-primary-400 grid place-items-center" to={`/tasks-list/${value.id}`}>
                                    <Icon icon="iconamoon:eye-light" fontSize={22} />
                                </NavLink>
                                {hasPermission(user, "تعديل مهمة") && <EditTask itemObj={value} />}
                                {hasPermission(user, "حذف مهمة") && <DeletePopup handleDelete={() => deleteItem(value)} itemObj={value} />}
                            </div>
                        )
                    },
                ])
                break;
            case "employees":
                setData(filterationData.map(({ id, name, phone, roles, created_at }, index) => ({
                    key: id,
                    name,
                    phone,
                    roles,
                    created_at,
                    actions: filterationData[index],
                })))
                setColumns([
                    {
                        title: 'الاسم',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'رقم الهاتف',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: 'الدور',
                        dataIndex: 'roles',
                        key: 'roles',
                        render: value => value[0]?.name
                    },
                    {
                        title: 'تاريخ الانضمام',
                        dataIndex: 'created_at',
                        key: 'created_at',
                        render: (value) => (new Date(value).toLocaleString())
                    },
                    {
                        title: 'تفاصيل',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (value) => (
                            <div className='flex items-center gap-3 justify-center'>
                                {
                                    checkAdmin(value,
                                        <NavLink className="!text-black hover:!text-primary-400 grid place-items-center" to={`/employees-list/${value.id}`}>
                                            <Icon icon="iconamoon:eye-light" fontSize={22} />
                                        </NavLink>
                                    )
                                }
                                {hasPermission(user, "تعديل موظف") && checkAdmin(value, <EditEmployee itemObj={value} />)}
                                {hasPermission(user, "حذف موظف") && checkAdmin(value, <DeletePopup handleDelete={() => deleteItem(value)} itemObj={value} />)}
                            </div>
                        )
                    },
                ])
                break;
            case "supervisors":
                setData(filterationData.map(({ id, name, phone, finished_tasks_count, in_progress_tasks_count, created_at }, index) => ({
                    key: id,
                    name,
                    phone,
                    finished_tasks_count,
                    in_progress_tasks_count,
                    created_at,
                    actions: filterationData[index],
                })))
                setColumns([
                    {
                        title: 'الاسم',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'رقم الهاتف',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: 'المهام المنجزة',
                        dataIndex: 'finished_tasks_count',
                        key: 'finished_tasks_count',
                    },
                    {
                        title: 'المهام قيد التنفيذ',
                        dataIndex: 'in_progress_tasks_count',
                        key: 'in_progress_tasks_count',
                    },
                    {
                        title: 'تاريخ الانضمام',
                        dataIndex: 'created_at',
                        key: 'created_at',
                        render: (value) => (new Date(value).toLocaleString())
                    },
                    {
                        title: 'تفاصيل',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (value) => (
                            <div className='flex items-center gap-3 justify-center'>
                                <NavLink className="!text-black hover:!text-primary-400 grid place-items-center" to={`/supervisors-list/${value.id}`}>
                                    <Icon icon="iconamoon:eye-light" fontSize={22} />
                                </NavLink>
                                {hasPermission(user, "تعديل مقاول") && <EditSupervisor itemObj={value} />}
                                {hasPermission(user, "حذف مقاول") && <DeletePopup handleDelete={() => deleteItem(value)} itemObj={value} />}
                            </div>
                        )
                    },
                ])
                break;
            case "roles":
                setData(filterationData.map(({ id, name, permissions, created_at }, index) => ({
                    key: id,
                    name,
                    permissions,
                    created_at,
                    actions: filterationData[index],
                })))
                setColumns([
                    {
                        title: 'الدور',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'الصلاحيات',
                        dataIndex: 'permissions',
                        key: 'permissions',
                        render: (value) => (
                            <div className='grid grid-cols-6 gap-1'>
                                {
                                    value.map(el => (
                                        <span key={el.id} className='p-1 text-center font-semibold text-xs col-span-1 bg-primary-100 text-primary-400 rounded-md'>{el.display_name}</span>
                                    ))
                                }
                            </div>
                        )
                    },
                    {
                        title: 'تاريخ الانضمام',
                        dataIndex: 'created_at',
                        key: 'created_at',
                        render: (value) => (new Date(value).toLocaleString())
                    },
                    {
                        title: 'تفاصيل',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (value) => (
                            <div className='flex items-center gap-3 justify-center'>
                                {(hasPermission(user, "تعديل دور") && value.id !== 1) && <EditPermission itemObj={value} />}
                                {(hasPermission(user, "حذف دور") && value.id !== 1) && <DeletePopup handleDelete={() => deleteItem(value)} itemObj={value} />}
                            </div>
                        )
                    },
                ])
                break;
            default:
                break;
        }
    }, [tableData, filterationData])

    return (
        (filterationData && tableData) &&
        <div className='mt-6 bg-white rounded-lg shadow-md'>
            <div className='overflow-auto'>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    bordered
                    pagination={{
                        position: ["bottomCenter"],
                        showSizeChanger: false,
                    }}
                    columns={columns}
                    dataSource={data}
                    title={() => {
                        return (
                            <div className='flex items-center gap-4 justify-between w-full'>
                                <h2 className='font-semibold'>
                                    {header}: {data.length}
                                </h2>
                                {
                                    modal
                                        ?
                                        hasPermission(user, "إنشاء دور") ? <PermissionAddPopup title={title} /> : null
                                        :
                                        <NavLink to={linkDirection} className="main-btn font-cairo hover:!text-white">{title}</NavLink>
                                }
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default TablGrid